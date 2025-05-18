import { Cables } from "@cables/api";
import path from "path";
import fs from "fs";
import mkdirp from "mkdirp";

export default class PatchbayApp extends Cables {
  constructor(
    utilProvider,
    dirName,
    writableDirName,
    configLocation,
    settings,
  ) {
    super(utilProvider, dirName, writableDirName, configLocation);
    this._writableDirName = writableDirName;
    this._settings = settings;
    this._config.isPackaged = true;
    this._config.uiIndexHtml = path.join(this.getUiDistPath(), "index.html");
    if (writableDirName && !fs.existsSync(path.join(writableDirName, "/ops")))
      mkdirp.sync(path.join(writableDirName, "/ops"));
  }

  isElectron() {
    return false;
  }

  getCommunityUrl() {
    return this._config.communityUrl;
  }

  isPackaged() {
    return this._config.isPackaged;
  }

  sendErrorReports() {
    return this._config.isPackaged || this._config.forceSendErrorReports;
  }

  inPackage(filePath) {
    if (!filePath) return false;
    if (!this.isPackaged()) return false;
    return filePath.startsWith(this.getOpsPath());
  }

  getApiPath() {
    return path.join(this._dirname, "/../");
  }

  getPackagedPath() {
    return this.getOpsPath();
  }

  getDistPath() {
    if (this._config.path.standaloneDist) {
      return path.join(this._dirname, this._config.path.standaloneDist);
    }
    return path.join(this.getApiPath(), "dist");
  }

  getAssetPath() {
    const currentProjectDir = this._settings.getCurrentProjectDir();
    let assetPath = "";
    if (!currentProjectDir) {
      assetPath = path.join(this._writeableDirName, "assets/");
    } else {
      assetPath = path.join(currentProjectDir);
    }
    // if (!fs.existsSync(assetPath)) mkdirp.sync(assetPath);
    return assetPath;
  }

  getAssetLibraryPath() {
    if (!this._config.path.assets)
      path.join(this.getPublicPath(), "assets/library/");
    return this._config.path.assets.startsWith("/")
      ? this._config.path.assets
      : path.join(this._dirname, this._config.path.assets, "library/");
  }

  getExportAssetTargetPath() {
    return "";
  }

  getGenPath() {
    const genPath = path.join(this._writeableDirName, "gen/");
    if (!fs.existsSync(genPath)) mkdirp.sync(genPath);
    return genPath;
  }

  getOpDocsCachePath() {
    const cachePath = path.join(this.getGenPath(), "opdocs_collections/");
    if (!fs.existsSync(cachePath)) mkdirp.sync(cachePath);
    return cachePath;
  }

  getUserOpsPath() {
    if (!this._settings.getCurrentProjectDir())
      return path.join(this.getOpsPath(), "/", this.USER_OPS_SUBDIR);
    return path.join(
      this._settings.getCurrentProjectDir(),
      "/ops/",
      this.USER_OPS_SUBDIR,
    );
  }

  getTeamOpsPath() {
    if (!this._settings.getCurrentProjectDir())
      return path.join(this.getOpsPath(), "/", this.TEAM_OPS_SUBDIR);
    return path.join(
      this._settings.getCurrentProjectDir(),
      "/ops/",
      this.TEAM_OPS_SUBDIR,
    );
  }

  getPatchOpsPath() {
    if (!this._settings.getCurrentProjectDir())
      return path.join(this.getOpsPath(), "/", this.PATCH_OPS_SUBDIR);
    return path.join(
      this._settings.getCurrentProjectDir(),
      "/ops/",
      this.PATCH_OPS_SUBDIR,
    );
  }

  getProjectOpsPath(create = false) {
    if (!this._settings.getCurrentProjectDir()) return null;
    const opsPath = path.join(this._settings.getCurrentProjectDir(), "/ops/");
    if (create && !fs.existsSync(opsPath)) mkdirp.sync(opsPath);
    return opsPath;
  }

  getOsOpsDir() {
    return path.join(this._writableDirName, "ops/");
  }

  _createDirectories() {
    if (!fs.existsSync(this.getGenPath())) mkdirp.sync(this.getGenPath());
    if (!fs.existsSync(this.getOpDocsCachePath()))
      mkdirp.sync(this.getOpDocsCachePath());
    if (!fs.existsSync(this.getOpDocsFile())) {
      if (!fs.existsSync(this.getOpDocsFile()))
        fs.writeFileSync(
          this.getOpDocsFile(),
          JSON.stringify({ generated: Date.now(), opDocs: [] }),
        );
    }
    if (!fs.existsSync(this.getOpLookupFile()))
      fs.writeFileSync(
        this.getOpLookupFile(),
        JSON.stringify({ names: {}, ids: {} }),
      );
  }

  get settings() {
    return this._settings;
  }

  // mock
  openPatch() {
    console.warn(`PatchbayApp.openPatch()`, "Not implemented!");
  }

  pickProjectFileDialog() {
    console.warn(`PatchbayApp.pickProjectFileDialog()`, "Not implemented!");
  }
}
