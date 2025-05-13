import { SharedFilesUtil, utilProvider } from "@cables/api";
import fs from "fs";
import path from "path";
import chokidar from "chokidar";
import helperFactory from "./helper_util.js";
import opsUtilFactory from "./ops_util.js";
import projectsUtilFactory from "./projects_util.js";

class FilesUtil extends SharedFilesUtil {
  constructor(utilProvider, app) {
    super(utilProvider);
    this._app = app;
    this._settings = app.settings;
    this._helper = helperFactory(app);
    // this._opsUtil = opsUtilFactory(app);
    // this._projectsUtil = projectsUtilFactory(app);

    const watcherOptions = {
      ignored: /(^|[\/\\])\../,
      ignorePermissionErrors: true,
      ignoreInitial: true,
      persistent: true,
      followSymlinks: true,
      disableGlobbing: true,
      awaitWriteFinish: {
        stabilityThreshold: 200,
      },
    };

    this._opChangeWatcher = chokidar.watch([], watcherOptions);
    this._opChangeWatcher.on("change", (fileName) => {
      const opName = this._opsUtil.getOpNameByAbsoluteFileName(fileName);
      if (opName) {
        const opId = this._opsUtil.getOpIdByObjName(opName);
        const code = this._opsUtil.getOpCode(opName);
        this._app.sendTalkerMessage("executeOp", {
          name: opName,
          forceReload: true,
          id: opId,
          code: code,
        });
      }
    });

    this._opChangeWatcher.on("unlink", (fileName) => {
      const opName = this._opsUtil.getOpNameByAbsoluteFileName(fileName);
      if (opName) {
        this._app.sendTalkerMessage("deleteOp", { name: opName });
      }
    });

    this._assetChangeWatcher = chokidar.watch([], watcherOptions);
    this._assetChangeWatcher.on("change", (fileName) => {
      this._app.sendTalkerMessage("fileUpdated", {
        filename: this._helper.pathToFileURL(fileName),
      });
    });

    this._assetChangeWatcher.on("unlink", (fileName) => {
      this._app.sendTalkerMessage("fileDeleted", {
        fileName: this._helper.pathToFileURL(fileName),
      });
    });
  }

  registerAssetChangeListeners(project, removeOthers = false) {
    if (!project || !project.ops) return;
    if (removeOthers) this._assetChangeWatcher.removeAllListeners();
    const fileNames = this._projectsUtil.getUsedAssetFilenames(project, true);
    this._assetChangeWatcher.add(fileNames);
  }

  registerOpChangeListeners(opNames, removeOthers = false) {
    if (!opNames) return;
    if (removeOthers) this._opChangeWatcher.removeAllListeners();
    const fileNames = [];
    opNames.forEach((opName) => {
      if (this._opsUtil.isOpNameValid(opName)) {
        const opFile = this._opsUtil.getOpAbsoluteFileName(opName);
        if (opFile) {
          fileNames.push(opFile);
        }
      }
    });
    this._opChangeWatcher.add(fileNames);
  }

  unregisterOpChangeListeners(opNames) {
    if (!opNames) return;
    const fileNames = [];
    opNames.forEach((opName) => {
      if (this._opsUtil.isOpNameValid(opName)) {
        const opFile = this._opsUtil.getOpAbsoluteFileName(opName);
        if (opFile) {
          fileNames.push(opFile);
        }
      }
    });
    this._opChangeWatcher.unwatch(fileNames);
  }

  async unregisterChangeListeners() {
    await this._assetChangeWatcher.close();
    await this._opChangeWatcher.close();
  }

  getFileDb(filePath, user, project, cachebuster = "") {
    const stats = fs.statSync(filePath);
    const fileName = path.basename(filePath);
    const suffix = path.extname(fileName);
    return {
      _id: this._helper.generateRandomId(),
      name: fileName,
      type: this.getFileType(fileName),
      suffix: suffix,
      fileName: fileName,
      projectId: project._id,
      userId: user._id,
      updated: stats.mtime,
      created: stats.ctime,
      cachebuster: cachebuster,
      isLibraryFile: filePath.includes(this._app.getAssetLibraryPath()),
      __v: 0,
      size: stats.size,
      path: filePath,
    };
  }

  getFileAssetLocation(fileDb) {
    return fileDb.path;
  }

  getFileAssetUrlPath(fileDb) {
    if (!fileDb) return "";
    let assetDir = "";
    let assetFilePath = fileDb.path;
    if (fileDb.isLibraryFile) {
      assetDir = this._app.getAssetLibraryPath();
      assetFilePath = path.join(assetDir, this.getAssetFileName(fileDb));
    } else if (!assetFilePath) {
      assetFilePath = path.join(assetDir, this.getAssetFileName(fileDb));
    }
    return this._helper.pathToFileURL(assetFilePath);
  }

  getLibraryFiles() {
    const p = this._app.getAssetLibraryPath();
    return this.readAssetDir(0, p, p);
  }

  getFileIconName(fileDb) {
    let icon = "file";

    if (fileDb.type === "SVG") icon = "pen-tool";
    else if (fileDb.type === "image") icon = "image";
    else if (fileDb.type === "gltf" || fileDb.type === "3d json") icon = "cube";
    else if (fileDb.type === "video") icon = "film";
    else if (fileDb.type === "font") icon = "type";
    else if (fileDb.type === "JSON") icon = "code";
    else if (fileDb.type === "audio") icon = "headphones";

    return icon;
  }

  readAssetDir(lvl, filePath, origPath, urlPrefix = "") {
    const arr = [];
    if (!fs.existsSync(filePath)) {
      this._log.error(
        "could not find library assets at",
        filePath,
        "check your cables_env_local.json",
      );
      return arr;
    }
    const files = fs.readdirSync(filePath);
    for (const i in files) {
      const fullPath = path.join(filePath, "/", files[i]);
      const urlPath = this._helper.pathToFileURL(fullPath);

      if (files[i] && !files[i].startsWith(".")) {
        const s = fs.statSync(fullPath);
        if (s.isDirectory() && fs.readdirSync(fullPath).length > 0) {
          arr.push({
            d: true,
            n: files[i],
            t: "dir",
            l: lvl,
            c: this.readAssetDir(
              lvl + 1,
              path.join(fullPath, "/"),
              origPath,
              urlPrefix,
            ),
            p: urlPath,
            isLibraryFile: true,
          });
        } else if (files[i].toLowerCase().endsWith(".fileinfo.json")) continue;
        else {
          let type = "unknown";
          if (
            files[i].endsWith("jpg") ||
            files[i].endsWith("png") ||
            files[i].endsWith("jpeg")
          )
            type = "image";
          else if (
            files[i].endsWith("mp3") ||
            files[i].endsWith("ogg") ||
            files[i].endsWith("wav")
          )
            type = "audio";
          else if (files[i].endsWith("3d.json")) type = "3d json";
          else if (files[i].endsWith("json")) type = "json";
          else if (files[i].endsWith("mp4")) type = "video";

          const fileData = {
            d: false,
            n: files[i],
            t: type,
            l: lvl,
            p: urlPath,
            type: type,
            updated: "bla",
            isLibraryFile: true,
          };
          fileData.icon = this.getFileIconName(fileData);
          let stats = fs.statSync(fullPath);
          if (stats && stats.mtime) {
            fileData.updated = new Date(stats.mtime).getTime();
          }

          arr.push(fileData);
        }
      }
    }
    return arr;
  }

  getPatchFiles() {
    const arr = [];
    const fileHierarchy = {};

    const project = this._settings.getCurrentProject();
    if (!project) return arr;

    const fileNames = this._projectsUtil.getUsedAssetFilenames(project);
    fileNames.forEach((fileName) => {
      let type = "unknown";
      if (
        fileName.endsWith("jpg") ||
        fileName.endsWith("png") ||
        fileName.endsWith("jpeg")
      )
        type = "image";
      else if (
        fileName.endsWith("mp3") ||
        fileName.endsWith("ogg") ||
        fileName.endsWith("wav")
      )
        type = "audio";
      else if (fileName.endsWith("3d.json")) type = "3d json";
      else if (fileName.endsWith("json")) type = "json";
      else if (fileName.endsWith("mp4")) type = "video";

      let dirName = path.join(path.dirname(fileName), "/");
      dirName = dirName.replaceAll("\\", "/");

      if (!fileHierarchy.hasOwnProperty(dirName)) fileHierarchy[dirName] = [];
      const fileUrl = this._helper.pathToFileURL(fileName);

      const fileData = {
        d: false,
        n: path.basename(fileUrl),
        t: type,
        l: 0,
        p: fileUrl,
        type: type,
        updated: "bla",
        isReference: true,
      };
      fileData.icon = this.getFileIconName(fileData);

      let stats = fs.statSync(fileName);
      if (stats && stats.mtime) {
        fileData.updated = new Date(stats.mtime).getTime();
      }
      fileHierarchy[dirName].push(fileData);
    });
    const dirNames = Object.keys(fileHierarchy);
    for (let dirName of dirNames) {
      let displayName = path.join(dirName, "/");

      arr.push({
        d: true,
        n: displayName,
        t: "dir",
        l: 1,
        c: fileHierarchy[dirName],
        p: dirName,
      });
    }
    return arr;
  }

  isAssetLibraryLocation(filePath) {
    if (!filePath) return false;
    return filePath.toLowerCase().includes(this._app.getAssetLibraryPath());
  }
}

export default (app) => new FilesUtil(utilProvider, app);
