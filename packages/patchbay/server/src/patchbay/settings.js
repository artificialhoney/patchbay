import path from "path";
import fs from "fs";
import mkdirp from "mkdirp";
// import jsonfile from "jsonfile";

import logger from "../utils/logger.js";

export default class PatchbaySettings {
  constructor(storageDir, config) {
    this._log = logger();
    this._config = config;
    this.SESSION_PARTITION = "persist:cables:standalone";

    if (storageDir && !fs.existsSync(storageDir)) {
      mkdirp.sync(storageDir);
    }
    this.MAIN_CONFIG_NAME = "cables-electron-preferences";
    this.PATCHID_FIELD = "patchId";
    this.PROJECTFILE_FIELD = "patchFile";
    this.CURRENTPROJECTDIR_FIELD = "currentPatchDir";
    this.STORAGEDIR_FIELD = "storageDir";
    this.USER_SETTINGS_FIELD = "userSettings";
    this.RECENT_PROJECTS_FIELD = "recentProjects";
    this.OPEN_DEV_TOOLS_FIELD = "openDevTools";
    this.WINDOW_ZOOM_FACTOR = "windowZoomFactor";
    this.WINDOW_BOUNDS = "windowBounds";
    this.DOWNLOAD_PATH = "downloadPath";

    this.opts = {};
    this.opts.defaults = {};
    this.opts.configName = this.MAIN_CONFIG_NAME;
    this.opts.defaults[this.USER_SETTINGS_FIELD] = {};
    this.opts.defaults[this.PATCHID_FIELD] = null;
    this.opts.defaults[this.PROJECTFILE_FIELD] = null;
    this.opts.defaults[this.CURRENTPROJECTDIR_FIELD] = null;
    this.opts.defaults[this.STORAGEDIR_FIELD] = storageDir;
    this.opts.defaults[this.RECENT_PROJECTS_FIELD] = {};
    this.opts.defaults[this.OPEN_DEV_TOOLS_FIELD] = false;
    this.opts.defaults[this.DOWNLOAD_PATH] = this._config.getPath("downloads");

    this.data = this.opts.defaults;
    this.settingsFile = path.join(
      this.data[this.STORAGEDIR_FIELD],
      this.opts.configName + ".json",
    );

    this.refresh();
    this.set("currentUser", this.getCurrentUser(), true);
  }

  refresh() {
    if (
      this.data &&
      this.data.hasOwnProperty(this.STORAGEDIR_FIELD) &&
      this.data[this.STORAGEDIR_FIELD]
    ) {
      const storedData = this._parseDataFile(
        this.settingsFile,
        this.opts.defaults,
      );
      Object.keys(this.opts.defaults).forEach((key) => {
        if (!storedData.hasOwnProperty(key))
          storedData[key] = this.opts.defaults[key];
      });
      this.data = storedData;
      this.data.paths = {
        home: this._config.getPath("home"),
        appData: this._config.getPath("appData"),
        userData: this._config.getPath("userData"),
        sessionData: this._config.getPath("sessionData"),
        temp: this._config.getPath("temp"),
        exe: this._config.getPath("exe"),
        module: this._config.getPath("module"),
        desktop: this._config.getPath("desktop"),
        documents: this._config.getPath("documents"),
        downloads: this._config.getPath("downloads"),
        music: this._config.getPath("music"),
        pictures: this._config.getPath("pictures"),
        videos: this._config.getPath("videos"),
        logs: this._config.getPath("logs"),
        crashDumps: this._config.getPath("crashDumps"),
      };
      const dir = this.get(this.CURRENTPROJECTDIR_FIELD);
      const id = this.get(this.PATCHID_FIELD);
      if (dir && id) {
        this.data.paths.assetPath = path.join(dir, "assets", id, "/");
      } else if (id) {
        this.data.paths.assetPath = path.join(".", "assets", id, "/");
      }
      if (process.platform === "win32") {
        this.data.paths.recent = this._config.getPath("recent");
      }
    }
  }

  get(key) {
    if (!this.data) {
      return null;
    }
    return this.data[key];
  }

  set(key, val, silent) {
    this.data[key] = val;
    if (!silent) {
      fs.writeFileSync(this.settingsFile, JSON.stringify(this.data));
      this.refresh();
    }
  }

  getCurrentProjectDir() {
    let value = this.get(this.CURRENTPROJECTDIR_FIELD);
    if (value && !value.endsWith("/")) value = path.join(value, "/");
    return value;
  }

  getCurrentProject() {
    return this._currentProject;
  }

  setProject(projectFile, newProject) {
    let projectDir = null;
    if (projectFile) projectDir = path.dirname(projectFile);
    this._setCurrentProjectFile(projectFile);
    this._setCurrentProjectDir(projectDir);
    this._setCurrentProject(projectFile, newProject);
    this.addToRecentProjects(projectFile, newProject);
  }

  getCurrentUser() {
    let username = this.getUserSetting("authorName", "") || "";
    return {
      username: username,
      //_id: helper.generateRandomId(),
      profile_theme: "dark",
      isStaff: false,
      usernameLowercase: username.toLowerCase(),
      isAdmin: false,
      theme: "dark",
      created: Date.now(),
    };
  }

  setUserSettings(value) {
    this.set(this.USER_SETTINGS_FIELD, value);
  }

  getUserSetting(key, defaultValue = null) {
    const userSettings = this.get(this.USER_SETTINGS_FIELD);
    if (!userSettings) return defaultValue;
    if (!userSettings.hasOwnProperty(key)) return defaultValue;
    return userSettings[key];
  }

  getCurrentProjectFile() {
    const projectFile = this.get(this.PROJECTFILE_FIELD);
    if (
      projectFile
      // projectFile &&
      // projectFile.endsWith(projectsUtil.CABLES_PROJECT_FILE_EXTENSION)
    )
      return projectFile;
    return null;
  }

  getBuildInfo() {
    // const coreFile = path.join(cables.getUiDistPath(), "js", "buildinfo.json");
    // const uiFile = path.join(cables.getUiDistPath(), "buildinfo.json");
    // const electronFile = path.join(
    //   cables.getDistPath(),
    //   "public",
    //   "js",
    //   "buildinfo.json",
    // );
    // let core = {};
    // if (fs.existsSync(coreFile)) {
    //   try {
    //     core = jsonfile.readFileSync(coreFile);
    //   } catch (e) {
    //     this._log.info("failed to parse buildinfo from", coreFile);
    //   }
    // }
    // let ui = {};
    // if (fs.existsSync(uiFile)) {
    //   try {
    //     ui = jsonfile.readFileSync(uiFile);
    //   } catch (e) {
    //     this._log.info("failed to parse buildinfo from", uiFile);
    //   }
    // }
    // let api = {};
    // if (fs.existsSync(electronFile)) {
    //   try {
    //     api = jsonfile.readFileSync(electronFile);
    //   } catch (e) {
    //     this._log.info("failed to parse buildinfo from", electronFile);
    //   }
    // }
    // return {
    //   updateWarning: false,
    //   core: core,
    //   ui: ui,
    //   api: api,
    // };
  }

  // helper methods
  _parseDataFile(filePath, defaults) {
    try {
      let jsonContent = fs.readFileSync(filePath);
      return JSON.parse(jsonContent);
    } catch (e) {
      return defaults;
    }
  }

  getRecentProjects() {
    const recentProjects = this.get(this.RECENT_PROJECTS_FIELD) || {};
    return Object.values(recentProjects);
  }

  getRecentProjectFile(projectId) {
    const recentProjects = this.get(this.RECENT_PROJECTS_FIELD) || {};
    for (const file in recentProjects) {
      const recent = recentProjects[file];
      if (
        recent &&
        (recent._id === projectId || recent.shortId === projectId)
      ) {
        if (fs.existsSync(file)) return file;
      }
    }
    return null;
  }

  setRecentProjects(recents) {
    if (!recents) recents = {};
    return this.set(this.RECENT_PROJECTS_FIELD, recents);
  }

  replaceInRecentProjects(oldFile, newFile, newProject) {
    const recents = this.get(this.RECENT_PROJECTS_FIELD) || {};
    recents[newFile] = this._toRecentProjectInfo(newProject);
    delete recents[oldFile];
    this._updateRecentProjects();
    return this.getRecentProjects();
  }

  _updateRecentProjects() {
    // const recents = this.get(this.RECENT_PROJECTS_FIELD) || {};
    // let files = Object.keys(recents);
    // files = files.filter((f) => {
    //   return fs.existsSync(f);
    // });
    // files = files.sort((f1, f2) => {
    //   const p1 = recents[f1];
    //   const p2 = recents[f2];
    //   if (!p1 || !p1.updated) return 1;
    //   if (!p2 || !p2.updated) return -1;
    //   return p2.updated - p1.updated;
    // });
    // files = helper.uniqueArray(files);
    // const newRecents = {};
    // for (let i = 0; i < 10; i++) {
    //   if (i > files.length) break;
    //   const key = files[i];
    //   if (key) {
    //     try {
    //       const project = jsonfile.readFileSync(key);
    //       newRecents[key] = this._toRecentProjectInfo(project);
    //     } catch (e) {
    //       this._log.info(
    //         "failed to parse project file for recent projects, ignoring",
    //         key,
    //       );
    //     }
    //   }
    // }
    // this.setRecentProjects(newRecents);
  }

  _setCurrentProjectFile(value) {
    this.set(this.PROJECTFILE_FIELD, value);
  }

  _toRecentProjectInfo(project) {
    if (!project) return null;
    return {
      _id: project._id,
      shortId: project.shortId,
      name: project.name,
      screenshot: project.screenshot,
      created: project.created,
      updated: project.updated,
    };
  }

  _setCurrentProjectDir(value) {
    if (value) value = path.join(value, "/");
    this.set(this.CURRENTPROJECTDIR_FIELD, value);
  }

  _setCurrentProject(projectFile, project) {
    // this._currentProject = project;
    // projectsUtil.invalidateProjectCaches();
    // if (project) {
    //   this.set(this.PATCHID_FIELD, project._id);
    // }
    // if (projectFile && project) {
    //   const projectName = path.basename(
    //     projectFile,
    //     "." + projectsUtil.CABLES_PROJECT_FILE_EXTENSION,
    //   );
    //   if (project.name !== projectName) {
    //     project.name = projectName;
    //     project.summary = project.summary || {};
    //     project.summary.title = project.name;
    //     projectsUtil.writeProjectToFile(projectFile, project);
    //   }
    //   this._updateRecentProjects();
    // }
    // electronApp.updateTitle();
  }

  addToRecentProjects(projectFile, project) {
    if (!projectFile || !project) return;
    // app.addRecentDocument(projectFile);
    const recentProjects = this.get(this.RECENT_PROJECTS_FIELD) || {};
    const recent = this._toRecentProjectInfo(project);
    if (recent) recentProjects[projectFile] = recent;
    this.setRecentProjects(recentProjects);
    this._updateRecentProjects();
  }

  getProjectFromFile(projectFile) {
    if (!projectFile || !fs.existsSync(projectFile)) return null;
    const project = fs.readFileSync(projectFile);
    try {
      return JSON.parse(project.toString("utf-8"));
    } catch (e) {
      this._log.error(
        "failed to parse project from projectfile",
        projectFile,
        e,
      );
    }
    return null;
  }

  getDownloadPath() {
    const customDownloadPath = this.get(this.DOWNLOAD_PATH);
    return customDownloadPath || this._config.getPath("downloads");
  }
}
