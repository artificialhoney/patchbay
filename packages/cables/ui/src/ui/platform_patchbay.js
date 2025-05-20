import { ele } from "@cables/client";
import { Platform } from "./platform.js";
import ModalDialog from "./dialogs/modaldialog.js";
import text from "./text.js";
import { notify } from "./elements/notification.js";
import Gui from "./gui.js";

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

    this.paths = cfg.paths;

    this.frontendOptions.npm = false;
    this.frontendOptions.isElectron = false;

    this.frontendOptions.openLocalFiles = true;
    this.frontendOptions.selectableDownloadPath = false;
    this.frontendOptions.dragDropLocalFiles = true;
    this.frontendOptions.showLocalAssetDirOpen = false;
    this.frontendOptions.showLocalOpDirButton = false;
    this.frontendOptions.editOpSummary = true;
    this.frontendOptions.hasOpDirectories = false;
    this.frontendOptions.hasAssetDirectories = false;
    this.frontendOptions.showWelcome = true;
    this.frontendOptions.showBuildInfoMenuLink = true;
    this.frontendOptions.opDependencies = false;
    this.frontendOptions.showOpenPatch = true;
    this.frontendOptions.showExport = false;
    this.frontendOptions.showExportPatch = true;
    this.frontendOptions.opRenameInEditor = false;
    this.frontendOptions.opDeleteInEditor = false;
    this.frontendOptions.showSetProjectTitle = false;
    this.frontendOptions.showStartUpLog = true;
    this.frontendOptions.showFormatCodeButton = true;

    // this.bindHrTimer();
  }

  // bindHrTimer() {
  //   const process = window.nodeRequire("node:process");
  //   const startTime = process.hrtime();
  //   performance.now = () => {
  //     let t = process.hrtime(startTime);
  //     return t[0] * 1000 + t[1] / 1000000;
  //   };
  // }

  isElectron() {
    return true;
  }

  getCablesVersion() {
    let version = "Patchbay";

    if (
      CABLESUILOADER &&
      CABLESUILOADER.buildInfo &&
      CABLESUILOADER.buildInfo.api &&
      CABLESUILOADER.buildInfo.api.version
    )
      version += " v" + CABLESUILOADER.buildInfo.api.version;
    else version += " development version";
    return version;
  }

  getCablesDocsUrl() {
    return this.getCablesUrl();
  }

  currentUserIsPatchOwner() {
    return true;
  }

  getIssueTrackerUrl() {
    return "https://github.com/cables-gl/cables_electron/issues";
  }

  getCablesStaticUrl() {
    return "";
  }

  noCacheUrl(url) {
    let separator = "?";
    if (url.includes("?")) separator = "&";
    return url + separator + "nc=" + (Date.now() + "").substr(-6);
  }

  showFileSelect(inputId, filterType, opId, previewId) {
    let value = null;
    let inputEle = null;
    if (inputId) {
      inputEle = ele.byQuery(inputId);
      if (inputEle) value = inputEle.value;
    }
    this.talkerAPI.send(
      "selectFile",
      { url: value, filter: filterType, opId: opId },
      (_err, file) => {
        if (file && inputEle) {
          const op = Gui.gui.corePatch().getOpById(opId);
          Gui.gui.savedState.setUnSaved("filemanager", op.getSubPatch());
          inputEle.value = file;
          const event = document.createEvent("Event");
          event.initEvent("input", true, true);
          inputEle.dispatchEvent(event);
          Gui.gui.opParams.show(op);
        }
      },
    );
  }

  createBackup() {
    const showBackupDialog = () => {
      this.talkerAPI.send("patchCreateBackup", {}, (err, result) => {
        if (result.success) notify("Backup created!");
      });
    };

    if (!Gui.gui.getSavedState()) {
      new ModalDialog({
        choice: true,
        cancelButton: {
          text: "Backup last saved state",
          callback: showBackupDialog,
        },
        title: "Backup",
        warning: true,
        text: text.projectBackupNotSaved,
      });

      return;
    }

    showBackupDialog();
  }

  showGitBranchWarning() {}

  exportPatch(projectId, exportType = null) {
    let talkerCommand = "exportPatch";
    if (exportType === "patch") talkerCommand = "exportPatchBundle";
    gui
      .jobs()
      .start({ id: "exportPatch", title: "export patch", indicator: "canvas" });
    this.talkerAPI.send(
      talkerCommand,
      { projectId: projectId },
      (err, result) => {
        const modalOptions = {
          title: "Patch Export",
        };
        Gui.gui.jobs().finish("exportPatch");
        if (err || result.error) {
          modalOptions.warning = true;
          modalOptions.text =
            "Failed to export patch:<br/>" + (err || "") + (result.error || "");
        } else {
          modalOptions.showOkButton = true;
          modalOptions.okButton = {
            text: "Show",
            callback: (a, b, c) => {
              CABLES.CMD.ELECTRON.openFileManager(result.data.url);
            },
          };
          modalOptions.text = "Successfully exported patch:";
        }
        if (result && result.data && result.data.log) {
          modalOptions.notices = result.data.log.map((l) => {
            return l.text;
          });
        }
        new ModalDialog(modalOptions);
      },
    );
  }

  getPatchOpsNamespace() {
    return "Ops.Local.";
  }

  isSaving() {
    return false;
  }

  getDefaultOpName() {
    return this.getPatchOpsNamespace() + super.getDefaultOpName();
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

  getUrlApiPrefix() {
    return this._cfg.urlCables + "/api/cables/";
  }
}
