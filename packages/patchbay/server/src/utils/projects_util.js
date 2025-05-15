import { SharedProjectsUtil } from "@cables/api";
import path from "path";
import sanitizeFileName from "sanitize-filename";
import pako from "pako";
import crypto from "crypto";
import jsonfile from "jsonfile";
import fs from "fs";

export default class ProjectsUtil extends SharedProjectsUtil {
  constructor(utilProvider) {
    super(utilProvider);
    this._settings = this._cables.settings;
    this.CABLES_PROJECT_FILE_EXTENSION = "cables";

    this._dirInfos = null;
    this._projectOpDocs = null;
  }

  getAssetPath(projectId) {
    return this._cables.getAssetPath();
  }

  getAssetPathUrl(projectId) {
    return "./assets/";
  }

  getScreenShotPath(pId) {
    return path.join(this._cables._writableDirName, "screenshots/");
  }

  getScreenShotFileName(proj, ext) {
    // const screenShotPath = this.getScreenShotPath(proj.id);
    // return path.join(
    //   screenShotPath,
    //   "/",
    //   this._filesUtil.realSanitizeFilename(proj.name) + "." + ext,
    // );
  }

  generateNewProject(owner) {
    if (!owner) owner = this._settings.getCurrentUser();
    const now = Date.now();
    const projectId = this._helperUtil.generateRandomId();
    const shortId = this._helperUtil.generateShortId(projectId, now);
    const randomize = this._settings.getUserSetting(
      "randomizePatchName",
      false,
    );
    const newProjectName = this.getNewProjectName(randomize);

    return {
      _id: projectId,
      shortId: shortId,
      name: newProjectName,
      description: "",
      userId: owner._id,
      cachedUsername: owner.username,
      created: now,
      updated: now,
      visibility: "private",
      ops: [],
      settings: {
        licence: "none",
      },
      userList: [owner],
      teams: [],
      log: [],
    };
  }

  getNewProjectName(randomize = false) {
    return "untitled";
  }

  getProjectOpDirs(
    project,
    includeOsDir = true,
    reverse = false,
    addLocalCoreIfPackaged = true,
  ) {
    let opsDirs = [];

    const projectDir = this._settings.getCurrentProjectDir();
    if (projectDir) {
      const currentDir = path.join(projectDir, "ops");
      opsDirs.push(currentDir);
    }

    if (project && project.dirs && project.dirs.ops) {
      project.dirs.ops.forEach((dir) => {
        if (projectDir && !path.isAbsolute(dir))
          dir = path.join(projectDir, dir);
        opsDirs.push(dir);
      });
    }
    if (includeOsDir) {
      const osOpsDir = this._cables.getOsOpsDir();
      if (osOpsDir) opsDirs.push(osOpsDir);
    }
    if (addLocalCoreIfPackaged && !this._cables.isPackaged()) {
      opsDirs.push(this._cables.getExtensionOpsPath());
      opsDirs.push(this._cables.getCoreOpsPath());
    }
    opsDirs = this._helperUtil.uniqueArray(opsDirs);
    if (reverse) return opsDirs.reverse();
    return opsDirs;
  }

  isFixedPositionOpDir(dir) {
    const projectDir = this._settings.getCurrentProjectDir();
    if (projectDir) if (dir === path.join(projectDir, "ops/")) return false;
    if (dir === "./ops") return true;
    if (dir === this._cables.getOsOpsDir()) return true;
    if (this._cables.isPackaged()) return false;
    if (dir === this._cables.getExtensionOpsPath()) return true;
    return dir === this._cables.getCoreOpsPath();
  }

  getProjectFileName(project) {
    return (
      sanitizeFileName(project.name).replace(/ /g, "_") +
      "." +
      this.CABLES_PROJECT_FILE_EXTENSION
    );
  }

  writeProjectToFile(projectFile, project = null, patch = null) {
    if (!project) project = this.generateNewProject();
    if (!project.ops) project.ops = [];
    if (patch && (patch.data || patch.dataB64)) {
      try {
        let buf = patch.data;
        if (patch.dataB64) buf = Buffer.from(patch.dataB64, "base64");

        const qData = JSON.parse(pako.inflate(buf, { to: "string" }));
        if (qData.ops) project.ops = qData.ops;
        if (qData.ui) project.ui = qData.ui;
      } catch (e) {
        this._log.error("patch save error/invalid data", e);
        return;
      }
    }

    // filter imported ops, so we do not save these to the database
    project.ops = project.ops.filter((op) => {
      return !(op.storage && op.storage.blueprint);
    });

    project.name = path.basename(
      projectFile,
      "." + this.CABLES_PROJECT_FILE_EXTENSION,
    );
    project.summary = project.summary || {};
    project.summary.title = project.name;

    project.opsHash = crypto
      .createHash("sha1")
      .update(JSON.stringify(project.ops))
      .digest("hex");
    project.buildInfo = this._settings.getBuildInfo();
    jsonfile.writeFileSync(projectFile, project, this._opsUtil.OPJSON_FORMAT);
    this._settings.addToRecentProjects(projectFile, project);
  }

  getUsedAssetFilenames(project, includeLibraryAssets = false) {
    const fileNames = [];
    if (!project || !project.ops) return [];
    const assetPorts = this.getProjectAssetPorts(project, includeLibraryAssets);
    let urls = assetPorts.map((assetPort) => {
      return this._helperUtil.pathToFileURL(assetPort.value, true);
    });
    urls.forEach((url) => {
      let fullPath = this._helperUtil.fileURLToPath(url, true);
      if (fullPath && fs.existsSync(fullPath)) {
        fileNames.push(fullPath);
      }
    });
    return this._helperUtil.uniqueArray(fileNames);
  }

  addOpDir(project, opDir, atTop = false) {
    if (!project.dirs) project.dirs = {};
    if (!project.dirs.ops) project.dirs.ops = [];
    if (atTop) {
      project.dirs.ops.unshift(opDir);
    } else {
      project.dirs.ops.push(opDir);
    }
    project.dirs.ops = this._helperUtil.uniqueArray(project.dirs.ops);
    this.invalidateProjectCaches(opDir, atTop);
    return project;
  }

  removeOpDir(project, opDir) {
    if (!project.dirs) project.dirs = {};
    if (!project.dirs.ops) project.dirs.ops = [];
    project.dirs.ops = project.dirs.ops.filter((dirName) => {
      return dirName !== opDir;
    });
    project.dirs.ops = this._helperUtil.uniqueArray(project.dirs.ops);
    this.invalidateProjectCaches(opDir);
    return project;
  }

  getSummary(project) {
    if (!project) return {};
    return {
      allowEdit: true,
      title: project.name,
      owner: settings.getCurrentUser(),
      description: project.description,
      licence: {
        name: "No licence chosen",
      },
    };
  }

  getOpDirs(currentProject) {
    const dirs = this.getProjectOpDirs(currentProject, true);
    const dirInfos = [];

    dirs.forEach((dir) => {
      const opJsons = this._helperUtil.getFileNamesRecursive(dir, ".json");
      const opLocations = {};
      opJsons.forEach((jsonLocation) => {
        const jsonName = path.basename(jsonLocation, ".json");
        if (
          this._opsUtil.isOpNameValid(jsonName) &&
          !opLocations.hasOwnProperty(jsonName)
        ) {
          opLocations[jsonName] = path.dirname(path.join(dir, jsonLocation));
        }
      });
      const opNames = Object.keys(opLocations);

      dirInfos.push({
        dir: dir,
        opLocations: opLocations,
        numOps: opNames.length,
        fixedPlace: this.isFixedPositionOpDir(dir),
      });
    });
    return dirInfos;
  }

  reorderOpDirs(currentProject, order) {
    const currentProjectFile = this._settings.getCurrentProjectFile();
    const newOrder = [];
    order.forEach((opDir) => {
      if (fs.existsSync(opDir)) newOrder.push(opDir);
    });
    if (!currentProject.dirs) currentProject.dirs = {};
    if (!currentProject.dirs.ops) currentProject.dirs.ops = [];
    currentProject.dirs.ops = newOrder.filter((dir) => {
      return !this.isFixedPositionOpDir(dir);
    });
    currentProject.dirs.ops = this._helperUtil.uniqueArray(
      currentProject.dirs.ops,
    );
    this.writeProjectToFile(currentProjectFile, currentProject);
    this.invalidateProjectCaches();
    return currentProject;
  }

  getAbsoluteOpDirFromHierarchy(opName) {
    const currentProject = this._settings.getCurrentProject();
    if (currentProject && !this._dirInfos) {
      this._log.debug("rebuilding opdir-cache, changed by:", opName);
      this._dirInfos = this.getOpDirs(currentProject);
    }
    if (!this._dirInfos) return this._opsUtil.getOpSourceNoHierarchy(opName);

    for (let i = 0; i < this._dirInfos.length; i++) {
      const dirInfo = this._dirInfos[i];
      const opNames = dirInfo.opLocations
        ? Object.keys(dirInfo.opLocations)
        : [];
      if (opNames.includes(opName)) {
        return dirInfo.opLocations[opName];
      }
    }
    return this._opsUtil.getOpSourceNoHierarchy(opName);
  }

  invalidateProjectCaches() {
    this._dirInfos = null;
    this._projectOpDocs = null;
  }

  getOpDocsInProjectDirs(
    project,
    filterOldVersions = false,
    filterDeprecated = false,
    rebuildCache = false,
  ) {
    if (!this._projectOpDocs || rebuildCache) {
      const ops = {};
      const opDirs = this.getProjectOpDirs(project, true, false, false);

      opDirs.forEach((opDir) => {
        if (fs.existsSync(opDir)) {
          const opJsons = this._helperUtil.getFilesRecursive(opDir, ".json");
          for (let jsonPath in opJsons) {
            const opName = path.basename(jsonPath, ".json");
            if (this._opsUtil.isOpNameValid(opName)) {
              if (ops.hasOwnProperty(opName)) {
                if (!ops[opName].hasOwnProperty("overrides"))
                  ops[opName].overrides = [];
                ops[opName].overrides.push(
                  path.join(opDir, path.dirname(jsonPath)),
                );
              } else {
                try {
                  const opDoc = jsonfile.readFileSync(
                    path.join(opDir, jsonPath),
                  );
                  opDoc.name = opName;
                  ops[opName] = this._docsUtil.buildOpDocs(opName);
                } catch (e) {
                  this._log.warn(
                    "failed to parse opDoc for",
                    opName,
                    "from",
                    jsonPath,
                  );
                }
              }
            }
          }
        }
      });
      let opDocs = Object.values(ops);
      opDocs = this._opsUtil.addVersionInfoToOps(opDocs, true);
      this._projectOpDocs = opDocs;
    }
    let filteredOpDocs = [];
    if (filterDeprecated || filterOldVersions) {
      for (let i = 0; i < this._projectOpDocs.length; i++) {
        const opDoc = this._projectOpDocs[i];
        if (
          filterOldVersions &&
          this._opsUtil.isOpOldVersion(opDoc.name, this._projectOpDocs)
        )
          continue;
        if (filterDeprecated && this._opsUtil.isDeprecated(opDoc.name))
          continue;
        filteredOpDocs.push(opDoc);
      }
    } else {
      filteredOpDocs = this._projectOpDocs;
    }
    this._docsUtil.addOpsToLookup(this._projectOpDocs);
    return filteredOpDocs;
  }
}
