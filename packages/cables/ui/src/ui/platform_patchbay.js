import Gui from "./gui.js";
import { Platform } from "./platform.js";

/**
 * platform implementation for community (https://cables.gl)
 *
 * @export
 * @class PlatformPatchbay
 * @extends {Platform}
 */
export default class PlatformPatchbay extends Platform {
  constructor(cfg) {
    super(cfg);

    this.frontendOptions.showStartUpLog = this.isDevEnv();

    this.frontendOptions.hasCommunity = // favs/comments/activity feed etc.
      this.frontendOptions.uploadFiles =
      this.frontendOptions.showAssetExternalLink =
      this.frontendOptions.showAssetUpload =
      this.frontendOptions.showPatchSettings =
      this.frontendOptions.showPatchBackups =
      this.frontendOptions.showPatchViewPage =
      this.frontendOptions.showExport =
      this.frontendOptions.showMyLinks =
      this.frontendOptions.needsInternet =
      this.frontendOptions.showRemoteViewer =
      this.frontendOptions.showChangeLogLink =
      this.frontendOptions.sendErrorReports =
      this.frontendOptions.showFormatCodeButton =
      this.frontendOptions.opDependencies =
      this.frontendOptions.showSetProjectTitle =
        true;
  }

  getCablesDocsUrl() {
    return this.getCablesUrl();
  }

  getCablesVersion() {
    return "Community build";
  }

  currentUserIsPatchOwner() {
    return Gui.gui.project().userId === Gui.gui.user.id;
  }

  getUrlOpsCode() {
    let url = this.getSandboxUrl() + "/api/cables/ops/code";
    if (this.config.previewMode) url += "?preview=true";
    return url;
  }

  getUrlProjectOpsCode(projectId) {
    let url = this.getCablesUrl() + "/api/cables/ops/code/project/" + projectId;
    if (this.config.previewMode) url += "?preview=true";
    return url;
  }
}
