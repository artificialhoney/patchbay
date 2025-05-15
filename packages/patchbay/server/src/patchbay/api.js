import fs from "fs";
import path from "path";
import mkdirp from "mkdirp";
import { promisify } from "util";

import jsonfile from "jsonfile";
import sanitizeFileName from "sanitize-filename";

import HtmlExportElectron from "../export/export_html.js";
import PatchExportElectron from "../export/export_patch.js";
import { UtilProvider } from "@cables/api";
import { createRequire } from "module";

export default class PatchbayApi {
  constructor(utilProvider, ipcMain, app) {
    this._log = utilProvider.getUtil(UtilProvider.LOGGER);
    this._ipcMain = ipcMain;
    this._app = app;
    this._settings = app.settings;
    this._opsUtil = utilProvider.getUtil(UtilProvider.OPS_UTIL);
    this._helperUtil = utilProvider.getUtil(UtilProvider.HELPER_UTIL);
    this._docsUtil = utilProvider.getUtil(UtilProvider.DOCS_UTIL);
    this._projectsUtil = utilProvider.getUtil(UtilProvider.PROJECTS_UTIL);
  }

  init() {
    this._ipcMain.on("talkerMessage", (event, cmd, data, topicConfig = {}) => {
      try {
        event.returnValue = this.talkerMessage(cmd, data, topicConfig);
      } catch (e) {
        event.returnValue = this.error(e.message, e);
      }
    });

    this._ipcMain.on("platformSettings", (event, _cmd, _data) => {
      this._settings.data.buildInfo = this._settings.getBuildInfo();
      event.returnValue = this._settings.data;
    });

    this._ipcMain.on("cablesConfig", (event, _cmd, _data) => {
      event.returnValue = this._app.getConfig();
    });

    this._ipcMain.on("getStartupLog", (event, _cmd, _data) => {
      event.returnValue = this._log.startUpLog || [];
    });

    this._ipcMain.on("getOpDir", (event, data) => {
      let opName = this._opsUtil.getOpNameById(data.opId);
      if (!opName) opName = data.opName;
      event.returnValue = this._opsUtil.getOpAbsolutePath(opName);
    });

    this._ipcMain.on("getOpModuleDir", (event, data) => {
      let opName = this._opsUtil.getOpNameById(data.opId);
      if (!opName) opName = data.opName;
      const opDir = this._opsUtil.getOpAbsolutePath(opName);
      event.returnValue = path.join(opDir, "node_modules", data.moduleName);
    });

    this._ipcMain.on("getOpModuleLocation", (event, data) => {
      let opName = this._opsUtil.getOpNameById(data.opId);
      if (!opName) opName = data.opName;
      const opDir = this._opsUtil.getOpAbsolutePath(opName);
      const moduleDir = path.join(opDir, "node_modules");
      const moduleRequire = createRequire(moduleDir);
      if (moduleRequire) {
        try {
          let location = moduleRequire.resolve(data.moduleName);
          if (data.asUrl) location = this._helperUtil.pathToFileURL(location);
          event.returnValue = location;
        } catch (e) {
          this._log.error(data.moduleName + " " + moduleDir);
          event.returnValue = null;
        }
      } else {
        event.returnValue = null;
      }
    });

    this._ipcMain.on("getOpModules", (event, data) => {
      let deps = [];
      if (!data.opName) return [];
      const opName = data.opName;
      const opDocFile = this._opsUtil.getOpAbsoluteJsonFilename(opName);
      if (fs.existsSync(opDocFile)) {
        let opDoc = jsonfile.readFileSync(opDocFile);
        if (opDoc) {
          deps = opDoc.dependencies || [];
        }
      }
      event.returnValue = deps
        .filter((dep) => {
          return dep.type === "npm";
        })
        .map((dep) => {
          return dep.src[0];
        });
    });
  }

  async talkerMessage(cmd, data, topicConfig = {}) {
    let response = null;
    if (!cmd) return this.error("UNKNOWN_COMMAND", null, "warn");
    if (typeof this[cmd] === "function") {
      if (topicConfig.needsProjectFile) {
        const projectFile = this._settings.getCurrentProjectFile();
        if (!projectFile) {
          const newName = data
            ? data.name
            : this._projectsUtil.getNewProjectName();
          const newProjectFile = await this._app.saveProjectFileDialog(newName);
          if (newProjectFile) {
            let patchData = null;
            let currentProject = this._settings.getCurrentProject();
            if (cmd === "savePatch" && data) {
              patchData = data;
            }
            this._projectsUtil.writeProjectToFile(
              newProjectFile,
              currentProject,
              patchData,
            );
            this.loadProject(newProjectFile);
          } else {
            return this.error("CANCELLED", null, "info");
          }
        }
      }
      return this[cmd](data);
    } else {
      this._log.warn("no method for talkerMessage", cmd);
    }
    return response;
  }

  getOpInfo(data) {
    const opName = this._opsUtil.getOpNameById(data.opName) || data.opName;

    let warns = [];
    try {
      const currentProject = this._settings.getCurrentProject();
      if (currentProject) {
        let opDocs = this._projectsUtil.getOpDocsInProjectDirs(currentProject);
        opDocs = opDocs.filter((opDoc) => {
          return opDoc.name === opName;
        });
        opDocs.forEach((opDoc) => {
          if (opDoc.overrides) {
            opDoc.overrides.forEach((override) => {
              warns.push({
                type: "project",
                id: "",
                text:
                  "<a onclick=\"CABLESUILOADER.talkerAPI.send('openDir', { 'dir': '" +
                  override +
                  '\'});"><span class="icon icon-folder"></span> this op overrides another op</a>',
              });
            });
          }
        });
      }

      warns = warns.concat(this._opsUtil.getOpCodeWarnings(opName));

      if (this._opsUtil.isOpNameValid(opName)) {
        const result = { warns: warns };
        result.attachmentFiles = this._opsUtil.getAttachmentFiles(opName);

        const opDocs = this._docsUtil.getDocForOp(opName);
        let changelogEntries = [];
        if (opDocs && opDocs.changelog) {
          // copy array to not modify reference
          changelogEntries = changelogEntries.concat(opDocs.changelog);
          if (data.sort === "asc") {
            changelogEntries.sort((a, b) => {
              return a.date - b.date;
            });
          } else {
            changelogEntries.sort((a, b) => {
              return b.date - a.date;
            });
          }
          const numChangelogEntries = data.cl || 5;
          result.changelog = changelogEntries.slice(0, numChangelogEntries);
        }
        return this.success("OK", result, true);
      } else {
        const result = { warns: [] };
        result.attachmentFiles = [];
        return this.success("OK", result, true);
      }
    } catch (e) {
      this._log.warn("error when getting opinfo", opName, e.message);
      const result = { warns: warns };
      result.attachmentFiles = [];
      return this.success("OK", result, true);
    }
  }

  async savePatch(patch) {
    const currentProject = this._settings.getCurrentProject();
    const currentProjectFile = this._settings.getCurrentProjectFile();

    const re = {
      msg: "PROJECT_SAVED",
    };
    currentProject.updated = Date.now();
    currentProject.updatedByUser = this._settings.getCurrentUser().username;
    this._projectsUtil.writeProjectToFile(
      currentProjectFile,
      currentProject,
      patch,
    );
    this.loadProject(currentProjectFile);
    re.updated = currentProject.updated;
    re.updatedByUser = currentProject.updatedByUser;
    return this.success("OK", re, true);
  }

  async patchCreateBackup() {
    const re = {
      msg: "BACKUP_CREATED",
    };
    const currentProject = this._settings.getCurrentProject();
    const projectFile = await this._app.saveProjectFileDialog();
    if (!projectFile) {
      logger.info("no backup file chosen");
      return this.error("no backup file chosen", null, "info");
    }

    const backupProject = this._projectsUtil.getBackup(currentProject);
    fs.writeFileSync(projectFile, JSON.stringify(backupProject));
    return this.success("OK", re, true);
  }

  getPatch() {
    const patchPath = this._settings.getCurrentProjectFile();
    const currentUser = this._settings.getCurrentUser();
    let currentProject = this._settings.getCurrentProject();
    if (patchPath && fs.existsSync(patchPath)) {
      currentProject = fs.readFileSync(patchPath);
      currentProject = JSON.parse(currentProject.toString("utf-8"));
      if (!currentProject.hasOwnProperty("userList"))
        currentProject.userList = [currentUser];
      if (!currentProject.hasOwnProperty("teams")) currentProject.teams = [];
    } else {
      if (!currentProject) {
        const newProject = this._projectsUtil.generateNewProject(
          this._settings.getCurrentUser(),
        );
        this.loadProject(patchPath, newProject);
        currentProject = newProject;
      }
    }
    currentProject.allowEdit = true;
    currentProject.summary = currentProject.summary || {};
    currentProject.summary.title = currentProject.name;
    currentProject.summary.allowEdit = true;
    return this.success("OK", currentProject, true);
  }

  async newPatch() {
    this._app.openPatch();
    return this.success("OK", true, true);
  }

  fileUpload(data) {
    const target = this._app.getAssetPath();
    if (!data.fileStr) return;
    if (!data.filename) {
      return;
    }
    let saveAs = data.filename;
    if (!path.isAbsolute(data.filename))
      saveAs = path.join(target, path.join("/", data.filename));
    const buffer = Buffer.from(data.fileStr.split(",")[1], "base64");
    fs.writeFileSync(saveAs, buffer);
    return this.success("OK", { filename: path.basename(saveAs) }, true);
  }

  async getAllProjectOps() {
    const currentUser = this._settings.getCurrentUser();
    const project = this._settings.getCurrentProject();

    let opDocs = [];

    if (!project) {
      return this.success("OK", opDocs, true);
    }

    let projectOps = [];
    let projectNamespaces = [];
    let usedOpIds = [];
    // add all ops that are used in the toplevel of the project, save them as used
    project.ops.forEach((projectOp) => {
      projectOps.push(this._opsUtil.getOpNameById(projectOp.opId));
      usedOpIds.push(projectOp.opId);
    });

    // add all ops in any of the project op directory
    const otherDirsOps = projectsUtil
      .getOpDocsInProjectDirs(project, true, true)
      .map((opDoc) => {
        return opDoc.name;
      });
    projectOps = projectOps.concat(otherDirsOps);

    // now we should have all the ops that are used in the project, walk subPatchOps
    // recursively to get their opdocs
    const subPatchOps = this._subPatchOpUtil.getOpsUsedInSubPatches(project);
    subPatchOps.forEach((subPatchOp) => {
      const opName = this._opsUtil.getOpNameById(subPatchOp.opId);
      const nsName = this._opsUtil.getCollectionNamespace(opName);
      projectOps.push(opName);
      if (this._opsUtil.isCollection(nsName)) projectNamespaces.push(nsName);
      usedOpIds.push(subPatchOp.opId);
    });

    projectOps = this._helperUtil.uniqueArray(projectOps);
    usedOpIds = this._helperUtil.uniqueArray(usedOpIds);
    projectNamespaces = this._helperUtil.uniqueArray(projectNamespaces);
    const coreOpDocs = this._docsUtil.getOpDocs();
    projectOps.forEach((opName) => {
      let opDoc = this._docsUtil.getDocForOp(opName, coreOpDocs);
      if (opDoc) {
        if (!opDoc.name) opDoc.name = opName;
        opDocs.push(opDoc);
      }
    });

    // get opdocs for all the collected ops
    opDocs = this._opsUtil.addOpDocsForCollections(projectNamespaces, opDocs);
    opDocs.forEach((opDoc) => {
      if (usedOpIds.includes(opDoc.id)) opDoc.usedInProject = true;
    });

    this._opsUtil.addPermissionsToOps(opDocs, currentUser, [], project);
    this._opsUtil.addVersionInfoToOps(opDocs);

    opDocs = this._docsUtil.makeReadable(opDocs);
    return this.success("OK", opDocs, true);
  }

  async getOpDocsAll() {
    const currentUser = this._settings.getCurrentUser();
    const currentProject = this._settings.getCurrentProject();
    let opDocs = this._docsUtil.getOpDocs(true, true);
    opDocs = opDocs.concat(
      this._docsUtil.getCollectionOpDocs(
        "Ops.Extension.Standalone",
        currentUser,
      ),
    );
    opDocs = opDocs.concat(
      this._projectsUtil.getOpDocsInProjectDirs(currentProject, true, true),
    );
    const cleanDocs = this._docsUtil.makeReadable(opDocs);
    this._opsUtil.addPermissionsToOps(cleanDocs, null);

    const extensions = this._docsUtil.getAllExtensionDocs(true, true);
    const libs = this._projectsUtil.getAvailableLibs(currentProject);
    const coreLibs = this._projectsUtil.getCoreLibs();

    return this.success(
      "OK",
      {
        opDocs: cleanDocs,
        extensions: extensions,
        teamNamespaces: [],
        libs: libs,
        coreLibs: coreLibs,
      },
      true,
    );
  }

  async getOpDocs(data) {
    const opName = this._opsUtil.getOpNameById(data) || data;
    if (!opName) {
      return {};
    }
    const result = {};
    result.opDocs = [];

    const opDoc = this._docsUtil.getDocForOp(opName);
    result.content = "No docs yet...";

    const opDocs = [];
    if (opDoc) {
      const currentProject = this._settings.getCurrentProject();
      const projectOps =
        this._projectsUtil.getOpDocsInProjectDirs(currentProject);
      const projectOp = projectOps.find((op) => {
        return op.name === opName;
      });
      if (projectOp) {
        opDocs.push(projectOp);
      } else {
        opDocs.push(opDoc);
      }
      if (opDoc.dependencies) {
        const opPackages = this._opsUtil.getOpNpmPackages(opName);
        const packageDir = this._opsUtil.getOpAbsolutePath(opName);
        result.dependenciesOutput = await this._app.installPackages(
          packageDir,
          opPackages,
          opName,
        );
      }
      result.opDocs = this._docsUtil.makeReadable(opDocs);
      result.opDocs = this._opsUtil.addVersionInfoToOps(opDocs);
      result.opDocs = this._opsUtil.addPermissionsToOps(result.opDocs, null);
      return this.success("OK", result, true);
    } else {
      let text = "Could not find op with id " + data + " in:";
      const footer =
        "Try adding other directories via 'Manage Op Directories' after loading the patch.";
      const reasons = [];

      const errorVars = {
        text: text,
        footer: footer,
        reasons: reasons,
        hideEnvButton: true,
      };

      const currentProject = this._settings.getCurrentProject();
      const projectOpDirs = this._projectsUtil.getProjectOpDirs(
        currentProject,
        true,
      );
      projectOpDirs.forEach((projectOpDir) => {
        const link =
          "<a onclick=\"CABLESUILOADER.talkerAPI.send('openDir', { 'dir': '" +
          projectOpDir +
          '\'});"><span class="icon icon-folder"></span> ' +
          projectOpDir +
          "</a>";
        reasons.push(link);
      });

      if (isOnline()) {
        const getOpEnvironmentDocs = promisify(
          this._opsUtil.getOpEnvironmentDocs.bind(opsUtil),
        );
        try {
          const envDocs = await getOpEnvironmentDocs(data);
          if (
            envDocs &&
            envDocs.environments &&
            envDocs.environments.length > 0
          ) {
            const otherEnvName = envDocs.environments[0];
            errorVars.editorLink =
              "https://" + otherEnvName + "/op/" + envDocs.name;
            errorVars.otherEnvButton = "Visit " + otherEnvName;

            text =
              'Could not find <a href="' +
              errorVars.editorLink +
              '" target="_blank">' +
              envDocs.name +
              "</a> in:";

            envDocs.environments.forEach((envName) => {
              const opLink = "https://" + envName + "/op/" + envDocs.name;
              reasons.push(
                'Found <a href="' +
                  opLink +
                  '" target="_blank">' +
                  envDocs.name +
                  "</a> on " +
                  envName,
              );
            });
          }
          errorVars.text = text;
          errorVars.reasons = reasons;
          errorVars.hideEnvButton = false;
        } catch (e) {
          // something went wrong, no internet or something, this is informational anyhow}
        }
      }

      return this.error("OP_NOT_FOUND", errorVars, "warn");
    }
  }

  saveOpCode(data) {
    const opName = this._opsUtil.getOpNameById(data.opname);
    const code = data.code;
    let returnedCode = code;

    const format = this._opsUtil.validateAndFormatOpCode(code);
    if (format.error) {
      const { line, message } = format.message;
      this._log.info({
        line,
        message,
      });
      return {
        error: {
          line,
          message,
        },
      };
    }
    const formatedCode = format.formatedCode;
    if (data.format || this._opsUtil.isCoreOp(opName)) {
      returnedCode = formatedCode;
    }
    returnedCode = this._opsUtil.updateOpCode(
      opName,
      this._settings.getCurrentUser(),
      returnedCode,
    );
    this._docsUtil.updateOpDocs(opName);

    return this.success("OK", { opFullCode: returnedCode }, true);
  }

  getOpCode(data) {
    const opName = this._opsUtil.getOpNameById(data.opId || data.opname);
    if (this._opsUtil.opExists(opName)) {
      this._filesUtill.registerOpChangeListeners([opName]);
      let code = this._opsUtil.getOpCode(opName);
      return this.success(
        "OK",
        {
          name: opName,
          id: data.opId,
          code: code,
        },
        true,
      );
    } else {
      let code = "//empty file...";
      return this.success(
        "OK",
        {
          name: opName,
          id: null,
          code: code,
        },
        true,
      );
    }
  }

  async opAttachmentAdd(data) {
    const opName = this._opsUtil.getOpNameById(data.opname) || data.opname;
    const attName = data.name;
    const p = this._opsUtil.addAttachment(
      opName,
      "att_" + attName,
      "hello attachment",
    );
    this._log.info("created attachment!", p);
    this._docsUtil.updateOpDocs(opName);
    this.success("OK");
  }

  async opAttachmentDelete(data) {
    const opName = this._opsUtil.getOpNameById(data.opname) || data.opname;
    const attName = data.name;
    this._opsUtil.deleteAttachment(opName, attName);
    this.success("OK");
  }

  async opAddCoreLib(data) {
    const opName = this._opsUtil.getOpNameById(data.opname) || data.opname;
    const libName = sanitizeFileName(data.name);
    const opFilename = this._opsUtil.getOpJsonPath(data.opname);
    const libFilename = this._app.getCoreLibsPath() + libName;
    const existsLib = fs.existsSync(libFilename + ".js");
    if (!existsLib) {
      this.error("LIB_NOT_FOUND");
      return;
    }

    try {
      const obj = jsonfile.readFileSync(opFilename);
      obj.coreLibs = obj.coreLibs || [];

      if (obj.coreLibs.indexOf(libName) === -1) obj.coreLibs.push(libName);

      try {
        jsonfile.writeFileSync(opFilename, obj, {
          encoding: "utf-8",
          spaces: 4,
        });
        this._docsUtil.updateOpDocs(opName);
        this.success("OK", {});
      } catch (writeErr) {
        this.error("WRITE_ERROR");
      }
    } catch (err) {
      this.error("UNKNOWN_ERROR");
    }
  }

  async opAddLib(data) {
    const opName = this._opsUtil.getOpNameById(data.opname) || data.opname;
    const libName = sanitizeFileName(data.name);

    const filename = this._opsUtil.getOpJsonPath(opName);

    const libExists = this._libsUtil.libExists(libName);
    if (!libExists) {
      this.error("LIB_NOT_FOUND", 400);
      return;
    }

    try {
      const obj = jsonfile.readFileSync(filename);
      obj.libs = obj.libs || [];

      if (obj.libs.indexOf(libName) === -1) obj.libs.push(libName);

      try {
        jsonfile.writeFileSync(filename, obj, {
          encoding: "utf-8",
          spaces: 4,
        });
        this._docsUtil.updateOpDocs(opName);
        this.success("OK");
      } catch (writeErr) {
        this.error("WRITE_ERROR", 500);
      }
    } catch (err) {
      this.error("UNKNOWN_ERROR", 500);
    }
  }

  async opRemoveLib(data) {
    const opName = this._opsUtil.getOpNameById(data.opname) || data.opname;
    const libName = sanitizeFileName(data.name);

    const filename = this._opsUtil.getOpJsonPath(opName);

    try {
      const obj = jsonfile.readFileSync(filename);
      obj.libs = obj.libs || [];

      if (obj.libs.includes(libName))
        obj.libs = obj.libs.filter((lib) => {
          return lib !== libName;
        });

      try {
        jsonfile.writeFileSync(filename, obj, {
          encoding: "utf-8",
          spaces: 4,
        });
        this._docsUtil.updateOpDocs(opName);
        this.success("OK");
      } catch (writeErr) {
        this.error("WRITE_ERROR", 500);
      }
    } catch (err) {
      this.error("UNKNOWN_ERROR", 500);
    }
  }

  async opRemoveCoreLib(data) {
    const opName = this._opsUtil.getOpNameById(data.opname) || data.opname;
    const libName = sanitizeFileName(data.name);
    const opFilename = this._opsUtil.getOpJsonPath(opName);

    try {
      const obj = jsonfile.readFileSync(opFilename);
      obj.coreLibs = obj.coreLibs || [];

      if (obj.coreLibs.includes(libName))
        obj.coreLibs = obj.coreLibs.filter((lib) => {
          return lib !== libName;
        });

      try {
        jsonfile.writeFileSync(opFilename, obj, {
          encoding: "utf-8",
          spaces: 4,
        });
        this._docsUtil.updateOpDocs(opName);
        this.success("OK");
      } catch (writeErr) {
        this.error("WRITE_ERROR", 500);
      }
    } catch (err) {
      this.error("UNKNOWN_ERROR", 500);
    }
  }

  async opAttachmentGet(data) {
    const opName = this._opsUtil.getOpNameById(data.opname) || data.opname;
    const attName = data.name;
    const content = this._opsUtil.getAttachment(opName, attName);
    return this.success("OK", { content: content }, true);
  }

  async getCollectionOpDocs(data) {
    let opDocs = [];
    const collectionName = data.name;
    const currentUser = this._settings.getCurrentUser();
    if (collectionName) {
      const opNames = this._opsUtil.getCollectionOpNames(collectionName, true);
      opDocs = this._opsUtil.addOpDocsForCollections(opNames, opDocs);
      opDocs = this._opsUtil.addVersionInfoToOps(opDocs);
      opDocs = this._opsUtil.addPermissionsToOps(opDocs, currentUser);
    }
    return this.success(
      "OK",
      { opDocs: this._docsUtil.makeReadable(opDocs) },
      true,
    );
  }

  getBuildInfo() {
    return this.success("OK", this._settings.getBuildInfo(), true);
  }

  formatOpCode(data) {
    const code = data.code;
    if (code) {
      // const format = this._opsUtil.validateAndFormatOpCode(code);
      // if (format.error)
      // {
      //     const {
      //         line,
      //         message
      //     } = format.message;
      //     return {
      //         "error": {
      //             line,
      //             message
      //         }
      //     };
      // }
      // else
      // {
      //     return {
      //         "opFullCode": format.formatedCode,
      //         "success": true
      //     };
      // }

      return this.success(
        "OK",
        {
          opFullCode: code,
        },
        true,
      );
    } else {
      return this.success(
        "OK",
        {
          opFullCode: "",
        },
        true,
      );
    }
  }

  saveUserSettings(data) {
    if (data && data._settings) {
      this._settings.setUserSettings(data._settings);
    }
  }

  checkProjectUpdated(data) {
    const project = this._settings.getCurrentProject();
    if (project) {
      return this.success(
        "OK",
        {
          updated: null,
          updatedByUser: project.updatedByUser,
          buildInfo: project.buildInfo,
          maintenance: false,
          disallowSave: false,
        },
        true,
      );
    } else {
      return this.success(
        "OK",
        {
          updated: "",
          updatedByUser: "",
          buildInfo: this._settings.getBuildInfo(),
          maintenance: false,
          disallowSave: false,
        },
        true,
      );
    }
  }

  getChangelog(data) {
    const obj = {};
    obj.items = [];
    obj.ts = Date.now();
    return this.success("OK", obj, true);
  }

  opAttachmentSave(data) {
    let opName = data.opname;
    if (this._opsUtil.isOpId(data.opname))
      opName = this._opsUtil.getOpNameById(data.opname);
    const result = this._opsUtil.updateAttachment(
      opName,
      data.name,
      data.content,
      false,
    );
    return this.success("OK", result, true);
  }

  setIconSaved() {
    // let title = this._app.editorWindow.getTitle();
    // const pos = title.lastIndexOf(" *");
    // let newTitle = title;
    // if (pos !== -1) newTitle = title.substring(0, pos);
    // this._app.setDocumentEdited(false);
    // this._app.editorWindow.setTitle(newTitle);
  }

  setIconUnsaved() {
    const title = this._app.editorWindow.getTitle();
    this._app.setDocumentEdited(true);
    this._app.editorWindow.setTitle(title + " *");
  }

  saveScreenshot(data) {
    const currentProject = this._settings.getCurrentProject();
    if (!currentProject || !data || !data.screenshot) {
      return this.error("NO_PROJECT");
    }
    currentProject.screenshot = data.screenshot;
    this._projectsUtil.writeProjectToFile(
      this._settings.getCurrentProjectFile(),
      currentProject,
    );
    return this.success("OK", { msg: "OK" }, true);
  }

  getFilelist(data) {
    let files;
    switch (data.source) {
      case "patch":
        files = this._filesUtill.getPatchFiles();
        break;
      case "lib":
        files = this._filesUtill.getLibraryFiles();
        break;
      default:
        files = [];
        break;
    }
    return this.success("OK", files, true);
  }

  getFileDetails(data) {
    let filePath = this._helperUtil.fileURLToPath(data.filename);
    const fileDb = this._filesUtill.getFileDb(
      filePath,
      this._settings.getCurrentProject(),
      this._settings.getCurrentUser(),
      new Date().getTime(),
    );
    return this.success("OK", this._filesUtill.getFileInfo(fileDb), true);
  }

  getLibraryFileInfo(data) {
    const fileName = this._filesUtill.realSanitizeFilename(data.filename);
    const fileCategory = this._filesUtill.realSanitizeFilename(
      data.fileCategory,
    );

    const filePath = path.join(fileCategory, fileName);
    const libraryPath = this._app.getAssetLibraryPath();
    const finalPath = path.join(libraryPath, filePath);

    if (!fs.existsSync(finalPath)) {
      return this.success("OK", {}, true);
    } else {
      const infoFileName = finalPath + ".fileinfo.json";
      let filename = "";

      if (fs.existsSync(infoFileName)) filename = infoFileName;

      if (filename === "") {
        return this.success("OK", {}, true);
      } else {
        const fileInfo = JSON.parse(fs.readFileSync(filename));
        return this.success("OK", fileInfo, true);
      }
    }
  }

  checkOpName(data) {
    const opDocs = this._docsUtil.getOpDocs(false, false);
    const newName = encodeURIComponent(data.v);
    const sourceName = data.sourceName || null;
    const currentUser = this._settings.getCurrentUser();
    const project = this._settings.getCurrentProject();
    const fromRename = data.rename;
    const result = this._getFullRenameResponse(
      opDocs,
      newName,
      sourceName,
      currentUser,
      project,
      true,
      fromRename,
      data.opTargetDir,
    );
    result.checkedName = newName;
    return this.success("OK", result, true);
  }

  getRecentPatches() {
    const recents = this._settings.getRecentProjects();
    const result = [];
    for (let i = 0; i < recents.length; i++) {
      const recentProject = recents[i];
      let screenShot = recentProject.screenshot;
      if (!screenShot) {
        screenShot = this._projectsUtil.getScreenShotFileName(
          recentProject,
          "png",
        );
        if (!fs.existsSync(screenShot))
          screenShot = path.join(
            this._app.getUiDistPath(),
            "/img/placeholder_dark.png",
          );
      }
      result[i] = recentProject;
      result[i].thumbnail = screenShot;
    }
    return this.success("OK", result.slice(0, 10), true);
  }

  async opCreate(data) {
    let opName = data.opname;
    const currentUser = this._settings.getCurrentUser();
    const opDocDefaults = {
      layout: data.layout,
      libs: data.libs,
      coreLibs: data.coreLibs,
    };
    let targetDir = data.opTargetDir;
    const projectOpDirs = this._projectsUtil.getOpDirs(
      this._settings.getCurrentProject(),
    );
    if (projectOpDirs && projectOpDirs.length > 0) {
      targetDir = projectOpDirs[0].dir;
    }
    const result = this._opsUtil.createOp(
      opName,
      currentUser,
      data.code,
      opDocDefaults,
      data.attachments,
      targetDir,
    );
    this._filesUtill.registerOpChangeListeners([opName]);
    this._projectsUtil.invalidateProjectCaches();

    return this.success("OK", result, true);
  }

  opUpdate(data) {
    let opName = data.opname;
    if (this._opsUtil.isOpId(data.opname))
      opName = this._opsUtil.getOpNameById(data.opname);
    const currentUser = this._settings.getCurrentUser();
    const result = this._opsUtil.updateOp(currentUser, opName, data.update, {
      formatCode: data.formatCode,
    });
    return this.success("OK", { data: result }, true);
  }

  opSaveLayout(data) {
    const layout = data.layout;
    const opName = this._opsUtil.getOpNameById(data.opname) || layout.name;
    return this.success("OK", this._opsUtil.saveLayout(opName, layout), true);
  }

  opSetSummary(data) {
    const opName = this._opsUtil.getOpNameById(data.opId) || data.name;
    let summary = data.summary || "";
    if (summary === "No Summary") summary = "";
    const opDocFile = this._opsUtil.getOpAbsoluteJsonFilename(opName);
    if (fs.existsSync(opDocFile)) {
      let opDoc = jsonfile.readFileSync(opDocFile);
      if (opDoc) {
        opDoc.summary = summary;
        opDoc = this._docsUtil.cleanOpDocData(opDoc);
        jsonfile.writeFileSync(opDocFile, opDoc, {
          encoding: "utf-8",
          spaces: 4,
        });
        this._docsUtil.updateOpDocs();
      }
      return this.success("OK", opDoc, true);
    } else {
      return this.error("UNKNOWN_OP", null, "error");
    }
  }

  opClone(data) {
    const newName = data.name;
    const oldName = this._opsUtil.getOpNameById(data.opname) || data.opname;
    const currentUser = this._settings.getCurrentUser();
    const cloned = this._opsUtil.cloneOp(
      oldName,
      newName,
      currentUser,
      data.opTargetDir,
    );
    this._projectsUtil.invalidateProjectCaches();
    return this.success("OK", cloned, true);
  }

  opRename(data) {
    this._projectsUtil.invalidateProjectCaches();

    const oldId = data.opname;
    const newName = data.name;
    const oldName = this._opsUtil.getOpNameById(oldId);

    const currentUser = this._settings.getCurrentUser();
    const currentProject = this._settings.getCurrentProject();
    let opNamespace = this._opsUtil.getNamespace(newName);

    const opDocs = this._docsUtil.getOpDocs(false, false);
    const renameResults = this._getFullRenameResponse(
      opDocs,
      newName,
      oldName,
      currentUser,
      currentProject,
      this._opsUtil.isPrivateOp(newName),
      true,
    );
    if (!oldName) {
      renameResults.problems.push("No name for source op given.");
    }

    const result = renameResults;
    result.title = "rename - " + oldName + " - " + newName;
    result.objName = newName;
    result.oldName = oldName;
    result.opId = oldId;
    result.opname = oldName;
    result.opNamespace = opNamespace;
    result.newopname = newName;
    result.shortname = this._opsUtil.getOpShortName(newName);
    result.oldShortName = this._opsUtil.getOpShortName(oldName);
    const versions = this._opsUtil.getOpVersionNumbers(oldName, opDocs);
    result.otherVersions =
      versions.length > 1
        ? versions.filter((v) => {
            return v.name !== oldName;
          })
        : [];
    result.renamePossible = renameResults.problems.length === 0;

    if (Object.keys(renameResults.problems).length > 0) {
      result.problems = Object.values(renameResults.problems);
      return this.success("PROBLEMS", result);
    }

    const start = Date.now();

    result.user = currentUser;
    result.showresult = true;

    let removeOld = true;
    let renameSuccess = false;
    if (this._opsUtil.isUserOp(newName)) {
      renameSuccess = this._opsUtil.renameToUserOp(
        oldName,
        newName,
        currentUser,
        removeOld,
      );
    } else if (this._opsUtil.isTeamOp(newName)) {
      renameSuccess = this._opsUtil.renameToTeamOp(
        oldName,
        newName,
        currentUser,
        removeOld,
      );
    } else if (this._opsUtil.isExtensionOp(newName)) {
      renameSuccess = this._opsUtil.renameToExtensionOp(
        oldName,
        newName,
        currentUser,
        removeOld,
      );
    } else if (this._opsUtil.isPatchOp(newName)) {
      renameSuccess = this._opsUtil.renameToPatchOp(
        oldName,
        newName,
        currentUser,
        removeOld,
        false,
      );
    } else {
      renameSuccess = this._opsUtil.renameToCoreOp(
        oldName,
        newName,
        currentUser,
        removeOld,
      );
    }

    this._projectsUtil.invalidateProjectCaches();

    if (!renameSuccess) {
      return this.error("ERROR", 500);
    } else {
      this._log.verbose(
        "*" +
          currentUser.username +
          " finished after " +
          Math.round((Date.now() - start) / 1000) +
          " seconds ",
      );
      return this.success("OK", result);
    }
  }

  opDelete(data) {
    const opName = this._opsUtil.getOpNameById(data.opId) || data.opName;
    this._opsUtil.deleteOp(opName);
    return this.success("OP_DELETED", { opNames: [opName] });
  }

  async _installOpDependencies(opName) {
    const results = [];
    if (opName) {
      const targetDir = this._opsUtil.getOpAbsolutePath(opName);
      const opPackages = this._opsUtil.getOpNpmPackages(opName);
      if (opPackages.length === 0) {
        const nodeModulesDir = path.join(targetDir, "node_modules");
        if (fs.existsSync(nodeModulesDir))
          fs.rmSync(nodeModulesDir, { recursive: true });
        results.push({ stdout: "nothing to install", packages: [] });
        return this.success("EMPTY", results, false);
      } else {
        const npmResults = await this._app.installPackages(
          targetDir,
          opPackages,
          opName,
        );
        if (npmResults.stderr) {
          return this.error("NPM_ERROR", npmResults, "error");
        } else {
          return this.success("OK", npmResults);
        }
      }
    } else {
      results.push({ stdout: "nothing to install", packages: [] });
      return this.success("EMPTY", results, false);
    }
  }

  async installProjectDependencies() {
    const currentProject = this._settings.getCurrentProject();
    if (!currentProject) {
      return this.error("UNSAVED_PROJECT", [
        { stdout: "please save your project first", packages: [] },
      ]);
    }

    const results = [];
    let projectPackages = {};
    currentProject.ops.forEach((op) => {
      const opName = this._opsUtil.getOpNameById(op.opId);
      if (opName) {
        const targetDir = this._opsUtil.getOpAbsolutePath(opName);
        const opPackages = this._opsUtil.getOpNpmPackages(opName);
        if (opPackages.length > 0) {
          if (!projectPackages.hasOwnProperty(targetDir))
            projectPackages[targetDir] = [];
          projectPackages[targetDir] = {
            opName: opName,
            packages: opPackages,
          };
        }
      }
    });
    if (Object.keys(projectPackages).length === 0) {
      results.push({ stdout: "nothing to install", packages: [] });
      return this.success("EMPTY", results, false);
    } else {
      const allNpmInstalls = [];
      for (let targetDir in projectPackages) {
        const opData = projectPackages[targetDir];
        allNpmInstalls.push(
          this._app.installPackages(targetDir, opData.packages, opData.opName),
        );
      }

      const npmResults = await Promise.all(allNpmInstalls);
      if (
        npmResults.some((result) => {
          return result.error;
        })
      ) {
        return this.error("NPM_ERROR", npmResults, "error");
      } else {
        return this.success("OK", npmResults);
      }
    }
  }

  async addOpPackage(data) {
    const currentProjectDir = this._settings.getCurrentProjectDir();
    const targetDir = data.targetDir || currentProjectDir;
    const npmResults = await this._app.addOpPackage(targetDir, data.package);
    return this.success("OK", npmResults);
  }

  async openDir(options = {}) {
    await shell.openPath(options.dir || app.getPath("home"));
    return this.success("OK", {}, true);
  }

  async openOpDir(options) {
    const opName = this._opsUtil.getOpNameById(options.opId) || options.opName;
    if (!opName) return;
    const opDir = this._opsUtil.getOpAbsoluteFileName(opName);
    if (opDir) {
      // shell.showItemInFolder(opDir);
      return this.success("OK", {}, true);
    }
  }

  async openProjectDir() {
    const projectFile = this._settings.getCurrentProjectFile();
    if (projectFile) {
      // shell.showItemInFolder(projectFile);
      return this.success("OK", {});
    }
  }

  async openFileManager(data) {
    let assetPath = this._helperUtil.fileURLToPath(data.url, true);
    if (fs.existsSync(assetPath)) {
      const stats = fs.statSync(assetPath);
      if (stats.isDirectory()) {
        // shell.openPath(assetPath);
        return this.success("OK", {});
      } else {
        shell.showItemInFolder(assetPath);
        return this.success("OK", {});
      }
    } else {
      shell.openPath(this._app.getAssetPath());
      return this.success("OK", {});
    }
  }

  async selectFile(data) {
    if (data) {
      let pickedFileUrl = null;
      if (data.url) {
        let assetUrl = this._helperUtil.fileURLToPath(data.url, true);
        let filter = ["*"];
        if (data.filter) {
          filter = this._filesUtill.FILETYPES[data.filter] || ["*"];
        }
        pickedFileUrl = await this._app.pickFileDialog(assetUrl, true, filter);
      } else {
        let file = data.dir;
        pickedFileUrl = await this._app.pickFileDialog(file);
      }
      pickedFileUrl = this._helperUtil.pathToFileURL(pickedFileUrl);
      return this.success("OK", pickedFileUrl, true);
    } else {
      return this.error("NO_FILE_SELECTED", null, "info");
    }
  }

  async selectDir(data) {
    const pickedFileUrl = await this._app.pickDirDialog(data.dir);
    return this.success("OK", pickedFileUrl, true);
  }

  checkNumAssetPatches() {
    return this.success(
      "OK",
      { assets: [], countPatches: 0, countOps: 0 },
      true,
    );
  }

  async saveProjectAs(data) {
    const projectFile = await this._app.saveProjectFileDialog(data.name);
    if (!projectFile) {
      return this.error("no project dir chosen", null, "info");
    }

    let collaborators = [];
    let usersReadOnly = [];

    const currentUser = this._settings.getCurrentUser();
    const origProject = this._settings.getCurrentProject();
    origProject._id = this._helperUtil.generateRandomId();
    origProject.name = path.basename(projectFile);
    origProject.summary = origProject.summary || {};
    origProject.summary.title = origProject.name;
    origProject.userId = currentUser._id;
    origProject.cachedUsername = currentUser.username;
    origProject.created = Date.now();
    origProject.cloneOf = origProject._id;
    origProject.updated = Date.now();
    origProject.users = collaborators;
    origProject.usersReadOnly = usersReadOnly;
    origProject.visibility = "private";
    origProject.shortId = this._helperUtil.generateShortId(
      origProject._id,
      Date.now(),
    );
    this._projectsUtil.writeProjectToFile(projectFile, origProject);
    this.loadProject(projectFile);
    this._app.reload();
    return this.success("OK", origProject, true);
  }

  async gotoPatch(data) {
    let project = null;
    let projectFile = null;
    if (data && data.id) {
      projectFile = this._settings.getRecentProjectFile(data.id);
      if (projectFile) project = this._settings.getProjectFromFile(projectFile);
    }
    if (project && projectFile) {
      this._app.openPatch(projectFile);
      return this.success("OK", true, true);
    } else {
      const file = await this._app.pickProjectFileDialog();
      return this.success("OK", { projectFile: file });
    }
  }

  updateFile(data) {
    this._log.info("file edit...");
    if (!data || !data.fileName) {
      return this.error("UNKNOWN_FILE");
    }

    const newPath = this._helperUtil.fileURLToPath(data.fileName, true);
    if (!fs.existsSync(newPath)) mkdirp.sync(newPath);
    try {
      if (fs.existsSync(newPath)) {
        this._log.info("delete old file ", newPath);
        fs.unlinkSync(newPath);
      }
    } catch (e) {}

    this._log.info("edit file", newPath);

    fs.writeFileSync(newPath, data.content);
    return this.success("OK", { filename: newPath }, true);
  }

  getProjectOpDirs() {
    const currentProject = this._settings.getCurrentProject();
    const dirInfos = this._projectsUtil.getOpDirs(currentProject);

    const opDirs = {};
    if (currentProject && currentProject.ops) {
      currentProject.ops.forEach((op) => {
        const opName = this._opsUtil.getOpNameById(op.opId);
        const opPath = this._opsUtil.getOpAbsolutePath(opName);
        if (opPath) {
          if (!opDirs.hasOwnProperty(opPath)) opDirs[opPath] = 0;
          opDirs[opPath]++;
        }
      });
    }

    dirInfos.forEach((dirInfo) => {
      if (!dirInfo.hasOwnProperty("numUsedOps")) dirInfo.numUsedOps = 0;
      for (const opDir in opDirs) {
        const count = opDirs[opDir];
        if (opDir.startsWith(dirInfo.dir)) {
          dirInfo.numUsedOps += count;
        }
      }
    });

    return this.success("OK", dirInfos);
  }

  async addProjectOpDir() {
    let currentProject = this._settings.getCurrentProject();
    if (!currentProject)
      return this.error(
        "Please save your project before adding op directories",
        null,
        "warn",
      );
    const opDir = await this._app.pickOpDirDialog();
    if (opDir) {
      currentProject = this._projectsUtil.addOpDir(currentProject, opDir, true);
      this._projectsUtil.writeProjectToFile(
        this._settings.getCurrentProjectFile(),
        currentProject,
      );
    }
    return this.success(
      "OK",
      this._projectsUtil.getProjectOpDirs(currentProject, true),
    );
  }

  async removeProjectOpDir(dirName) {
    let currentProject = this._settings.getCurrentProject();
    if (!currentProject || !dirName)
      return this.success(
        "OK",
        this._projectsUtil.getProjectOpDirs(currentProject, true),
      );
    dirName = path.resolve(dirName);
    currentProject = this._projectsUtil.removeOpDir(currentProject, dirName);

    this._projectsUtil.writeProjectToFile(
      this._settings.getCurrentProjectFile(),
      currentProject,
    );
    return this.success(
      "OK",
      this._projectsUtil.getProjectOpDirs(currentProject, true),
    );
  }

  saveProjectOpDirOrder(order) {
    let currentProject = this._settings.getCurrentProject();
    if (!currentProject || !order)
      return this.error("NO_PROJECT", null, "warn");
    currentProject = this._projectsUtil.reorderOpDirs(currentProject, order);
    return this.success(
      "OK",
      this._projectsUtil.getProjectOpDirs(currentProject, true),
    );
  }

  setProjectName(options) {
    const oldFile = this._settings.getCurrentProjectFile();
    let project = this._settings.getCurrentProject();
    project.name = options.name;
    const newFile = path.join(
      this._settings.getCurrentProjectDir(),
      this._projectsUtil.getProjectFileName(project),
    );
    project.name = path.basename(newFile);
    project.summary = project.summary || {};
    project.summary.title = project.name;
    fs.renameSync(oldFile, newFile);
    this._settings.replaceInRecentProjects(oldFile, newFile);
    this._projectsUtil.writeProjectToFile(newFile, project);
    this.loadProject(newFile);
    const summary = this._projectsUtil.getSummary(
      this._settings.getCurrentProject(),
    );
    this._app.updateTitle();
    return this.success("OK", { name: project.name, summary: summary });
  }

  cycleFullscreen() {
    this._app.cycleFullscreen();
  }

  collectAssets() {
    const currentProject = this._settings.getCurrentProject();
    const assetPorts = this._projectsUtil.getProjectAssetPorts(
      currentProject,
      true,
    );

    const oldNew = {};
    let projectAssetPath = this._app.getAssetPath();
    projectAssetPath = path.join(projectAssetPath, "assets");
    if (!fs.existsSync(projectAssetPath)) mkdirp.sync(projectAssetPath);
    assetPorts.forEach((assetPort) => {
      const portValue = assetPort.value;
      let oldFile = this._helperUtil.fileURLToPath(portValue, true);
      if (
        !this._helperUtil.isLocalAssetPath(oldFile) &&
        !oldNew.hasOwnProperty(portValue) &&
        fs.existsSync(oldFile)
      ) {
        const baseName = path.basename(oldFile);
        const newName = this._projectsUtil.findNewAssetFilename(
          projectAssetPath,
          baseName,
        );
        const newLocation = path.join(projectAssetPath, newName);
        fs.copyFileSync(oldFile, newLocation);
        // cant use path.join here since we need to keep the ./
        oldNew[assetPort.value] =
          this._projectsUtil.getAssetPathUrl(currentProject._id) + newName;
      }
    });
    return this.success("OK", oldNew);
  }

  collectOps() {
    const currentProject = this._settings.getCurrentProject();
    const movedOps = {};
    const allOpNames = [];
    if (currentProject && currentProject.ops) {
      currentProject.ops.forEach((op) => {
        const opName = this._opsUtil.getOpNameById(op.opId);
        allOpNames.push(opName);
        if (!movedOps.hasOwnProperty(opName)) {
          const opPath = this._opsUtil.getOpAbsolutePath(opName);
          if (!opPath.startsWith(this._app.getOpsPath())) {
            const targetPath = this._opsUtil.getOpTargetDir(opName, true);
            const newOpLocation = path.join(
              this._app.getProjectOpsPath(true),
              targetPath,
            );
            if (opPath !== newOpLocation) {
              fs.cpSync(opPath, newOpLocation, { recursive: true });
              movedOps[opName] = newOpLocation;
            }
          }
        }
      });
    }
    this._filesUtill.registerOpChangeListeners(allOpNames, true);
    return this.success("OK", movedOps);
  }

  loadProject(projectFile, newProject = null, rebuildCache = true) {
    let project = newProject;
    if (projectFile) {
      project = this._settings.getProjectFromFile(projectFile);
      if (project) {
        this._settings.setProject(projectFile, project);
        if (rebuildCache) this._projectsUtil.invalidateProjectCaches();
        // add ops in project dirs to lookup
        this._projectsUtil.getOpDocsInProjectDirs(project, false, false, true);
        this._filesUtill.registerAssetChangeListeners(project, true);
        if (project.ops) {
          const opNames = [];
          project.ops.forEach((op) => {
            const opName = this._opsUtil.getOpNameById(op.opId);
            if (opName) {
              opNames.push(opName);
            }
          });
          this._filesUtill.registerOpChangeListeners(opNames);
        }
      }
    } else {
      this._settings.setProject(null, null);
      this._projectsUtil.getOpDocsInProjectDirs(project);
    }
    // this._app.updateTitle();
  }

  async addOpDependency(options) {
    if (!options.opName || !options.type) return this.error("INVALID_DATA");

    const opName = options.opName;
    const dep = this._getOpDepFromRequest({ body: options });
    const added = this._opsUtil.addOpDependency(opName, dep);
    if (added) {
      this._log.info("added dependency!", opName, dep.src);
      this._docsUtil.updateOpDocs(opName);
      return await this._installOpDependencies(opName);
    } else {
      return this.error("FAILED_TO_ADD_DEPENDENCY");
    }
  }

  async removeOpDependency(options) {
    if (!options.opName || !options.type) return this.error("INVALID_DATA");
    const opName = options.opName;
    const opDocFile = this._opsUtil.getOpAbsoluteJsonFilename(opName);
    if (fs.existsSync(opDocFile)) {
      let opDoc = jsonfile.readFileSync(opDocFile);
      if (opDoc) {
        const newDeps = [];
        const deps = opDoc.dependencies || [];
        deps.forEach((dep) => {
          if (dep.src !== options.src) newDeps.push(dep);
        });
        opDoc.dependencies = newDeps;
        const libPath = path.join(
          this._opsUtil.getOpAbsolutePath(opName),
          options.src,
        );
        if (fs.existsSync(libPath)) fs.unlinkSync(libPath);
        if (opDoc.dependencies)
          jsonfile.writeFileSync(opDocFile, opDoc, this._opsUtil.OPJSON_FORMAT);
        this._docsUtil.updateOpDocs();
        await this._installOpDependencies(opName);
        return this.success("OK");
      } else {
        return this.error("OP_NOT_FOUND");
      }
    } else {
      return this.error("OP_NOT_FOUND");
    }
  }

  async createFile(data) {
    let file = data.name;
    let pickedFileUrl = await this._app.saveFileDialog(file);
    if (pickedFileUrl) {
      fs.writeFileSync(pickedFileUrl, "");
      return this.success("OK", pickedFileUrl, true);
    } else {
      return this.success("NO_DIR_CHOSEN", null, true);
    }
  }

  async exportPatch() {
    const service = new HtmlExportElectron(utilProvider, null, null, this._app);

    const exportPromise = promisify(service.doExport.bind(service));

    try {
      const result = await exportPromise(null);
      return this.success("OK", result);
    } catch (e) {
      return this.error("ERROR", e);
    }
  }

  async exportPatchBundle() {
    const service = new PatchExportElectron(
      utilProvider,
      null,
      null,
      this._app,
    );

    const exportPromise = promisify(service.doExport.bind(service));

    try {
      const result = await exportPromise(null);
      return this.success("OK", result);
    } catch (e) {
      return this.error("ERROR", e);
    }
  }

  async uploadFileToOp(params) {
    const fileName = params.filename;
    const opId = params.opId;
    const dataUrl = params.fileStr;

    const opName = this._opsUtil.getOpNameById(opId);

    if (fileName && opId && dataUrl && opName) {
      let data = atob(dataUrl.split(",")[1]);
      let buffer = Buffer.from(data);

      const newFileName = this._opsUtil.addOpDependencyFile(
        opName,
        fileName,
        buffer,
      );
      if (newFileName) {
        this._log.info("added op file!", opName, newFileName);
        this._docsUtil.updateOpDocs(opName);
        return this.success("OK", { filename: newFileName }, true);
      } else {
        return this.error("FAILED_TO_ADD_DEPENDENCY");
      }
    } else {
      return this.error("ERROR", {
        fileName: fileName,
        opId: opId,
        opName: opName,
      });
    }
  }

  errorReport(report) {
    try {
      // const communityUrl = this._app.getCommunityUrl();
      // if (this._app.sendErrorReports() && communityUrl) {
      //   try {
      //     const errorReportSend = net.request({
      //       url: path.join(communityUrl, "/api/errorReport"),
      //       method: "POST",
      //     });
      //     delete report.url;
      //     delete report.file;
      //     if (report.log) {
      //       report.log.forEach((log) => {
      //         if (log.errorStack) {
      //           log.errorStack.forEach((stack) => {
      //             if (stack.fileName) {
      //               stack.fileName = path.basename(stack.fileName);
      //             }
      //             if (stack.source) {
      //               delete stack.source;
      //             }
      //           });
      //         }
      //       });
      //     }
      //     report.username = "electron";
      //     errorReportSend.setHeader("Content-Type", "application/json");
      //     errorReportSend.write(JSON.stringify(report), "utf-8");
      //     errorReportSend.end();
      //   } catch (e) {
      //     this._log.debug("failed to send error report", e);
      //   }
      // }
    } catch (e) {
      this._log.info("failed to parse error report", e);
    }
    this.success("OK");
  }

  success(msg, data = null, raw = false) {
    if (raw) {
      if (data && typeof data === "object") data.success = true;
      return data;
    } else {
      return { success: true, msg: msg, data: data || {} };
    }
  }

  error(msg, data = null, level = "warn") {
    const error = { error: true, msg: msg, level: level };
    if (data) error.data = data;
    return error;
  }

  _getFullRenameResponse(
    opDocs,
    newName,
    oldName,
    currentUser,
    project = null,
    ignoreVersionGap = false,
    fromRename = false,
    targetDir = false,
  ) {
    let opNamespace = this._opsUtil.getNamespace(newName, true);
    let oldOpNamespace = this._opsUtil.getNamespace(oldName, true);

    let availableNamespaces = [];

    if (project) {
      const projectOpDocs = this._projectsUtil.getOpDocsInProjectDirs(project);
      availableNamespaces = projectOpDocs.map((opDoc) => {
        return this._opsUtil.getNamespace(opDoc.name, true);
      });
    }

    availableNamespaces = availableNamespaces.map((availableNamespace) => {
      return availableNamespace.endsWith(".")
        ? availableNamespace
        : availableNamespace + ".";
    });
    availableNamespaces = this._helperUtil.uniqueArray(availableNamespaces);
    availableNamespaces = availableNamespaces.sort((a, b) => {
      return a.localeCompare(b);
    });
    if (opNamespace && !availableNamespaces.includes(opNamespace))
      availableNamespaces.unshift(opNamespace);
    if (oldOpNamespace && !availableNamespaces.includes(oldOpNamespace))
      availableNamespaces.unshift(oldOpNamespace);

    availableNamespaces = availableNamespaces.filter((availableNamespace) => {
      return availableNamespace.startsWith(this._opsUtil.PREFIX_OPS);
    });

    let suggestedNamespaces = [...availableNamespaces];
    if (project) {
      suggestedNamespaces.unshift(
        this._opsUtil.getPatchOpsNamespaceForProject(project),
      );
    }
    suggestedNamespaces.unshift("Your namespaces..");
    suggestedNamespaces = suggestedNamespaces.map((suggestedNamespace) => {
      return this._opsUtil.getNamespace(suggestedNamespace, true);
    });
    suggestedNamespaces = this._helperUtil.uniqueArray(suggestedNamespaces);

    let removeOld =
      newName &&
      !(
        this._opsUtil.isExtensionOp(newName) && this._opsUtil.isCoreOp(newName)
      );
    const result = {
      namespaces: suggestedNamespaces,
      problems: [],
      consequences: [],
      action: removeOld ? "Rename" : "Copy",
    };

    if (!newName) {
      result.problems.push("No name for new op given.");
      return result;
    }

    if (fromRename) targetDir = this._opsUtil.getOpSourceDir(oldName);
    const problems = this._opsUtil.getOpRenameProblems(
      newName,
      oldName,
      currentUser,
      [],
      null,
      null,
      [],
      true,
      targetDir,
    );
    const hints = {};
    const consequences = this._opsUtil.getOpRenameConsequences(
      newName,
      oldName,
      targetDir,
    );

    let newOpDocs = opDocs;
    if (!this._opsUtil.isCoreOp(newName))
      newOpDocs = this._docsUtil.getCollectionOpDocs(newName, currentUser);

    const nextOpName = this._opsUtil.getNextVersionOpName(newName, newOpDocs);
    const nextShort = this._opsUtil.getOpShortName(nextOpName);
    let nextVersion = null;
    let suggestVersion = false;

    if (problems.target_exists) {
      suggestVersion = true;
    }

    if (!ignoreVersionGap) {
      const wantedVersion = this._opsUtil.getVersionFromOpName(newName);
      const currentHighest = this._opsUtil.getHighestVersionNumber(
        newName,
        newOpDocs,
      );

      const versionTolerance = currentHighest ? 1 : 2;
      if (wantedVersion - versionTolerance > currentHighest) {
        hints.version_gap = "Gap in version numbers!";
        suggestVersion = true;
      }
    }

    if (problems.illegal_ops) {
      suggestVersion = false;
    }

    if (!fromRename && oldName) {
      const hierarchyProblem = this._opsUtil.getNamespaceHierarchyProblem(
        oldName,
        newName,
      );
      if (hierarchyProblem) {
        problems.bad_op_hierarchy = hierarchyProblem;
        suggestVersion = false;
      }
    }

    if (suggestVersion) {
      const text =
        "Try creating a new version <a class='button-small versionSuggestion' data-short-name='" +
        nextShort +
        "' data-next-name='" +
        nextOpName +
        "'>" +
        nextOpName +
        "</a>";
      nextVersion = {
        fullName: nextOpName,
        namespace: this._opsUtil.getNamespace(nextOpName),
        shortName: nextShort,
      };
      if (problems.target_exists) {
        problems.version_suggestion = text;
      } else {
        hints.version_suggestion = text;
      }
    }

    result.problems = Object.values(problems);
    result.hints = Object.values(hints);
    result.consequences = Object.values(consequences);
    if (nextVersion) result.nextVersion = nextVersion;
    return result;
  }

  _getOpDepFromRequest(req) {
    const validTypes = ["commonjs", "module", "npm", "op", "lib", "corelib"];
    const data = req.body;
    const dep = {};
    if (data.src) dep.src = data.src.trim();
    if (data.type && validTypes.includes(data.type.trim()))
      dep.type = data.type.trim();
    if (data.export && dep.type === "module") dep.export = data.export.trim();
    return dep;
  }
}
