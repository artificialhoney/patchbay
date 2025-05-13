import { Events, ele } from "@cables/client";
import { getHandleBarHtml } from "../utils/handlebars.js";
import TreeView from "./treeview.js";
import subPatchOpUtil from "../subpatchop_util.js";
import PatchOutline from "./patchoutline.js";
import Gui from "../gui.js";
import { platform } from "../platform.js";

/**
 * default panel when clicking into the pach background, shows patch summary and tree view
 *
 * @export
 * @class PatchPanel
 * @extends {Events}
 */
export default class PatchPanel extends Events {
  constructor() {
    super();

    this._firstTime = true;
    this._outline = new PatchOutline();
  }

  deserialize(obj) {
    this._outline.deserialize(obj);
  }

  serialize(obj) {
    this._outline.serialize(obj);
  }

  show(force) {
    if (!Gui.gui.finishedLoading()) return;

    if (this._firstTime) {
      Gui.gui.corePatch().buildSubPatchCache();
      this._firstTime = false;
    }

    Gui.gui.opParams.emitEvent("opSelected", null);

    if (!force && ele.byClass("patchParamPanel")) return;

    let html = '<div class="patchParamPanel panel bookmarkpanel">';

    const project = Gui.gui.project();
    if (project) {
      const projectId = project.shortId || project._id;
      const isSameHost = platform.isPatchSameHost();

      let host = "";

      if (!isSameHost) host = Gui.gui.project().buildInfo.host;

      html += getHandleBarHtml("patch_summary", {
        projectId: projectId,
        project: project,
        frontendOptions: platform.frontendOptions,
        isTrustedPatch: platform.isTrustedPatch(),
        cablesUrl: platform.getCablesUrl(),
        sameHost: isSameHost,
        patchHost: host,
      });
    }

    html += '<br/><div id="_cbl_outlinetree"></div>';

    if (Gui.gui.longPressConnector.isActive()) {
      html += Gui.gui.longPressConnector.getParamPanelHtml();
    } else {
      Gui.gui.patchView.checkPatchErrors();

      if (!Gui.gui.bookmarks.needRefreshSubs && ele.byId("patchsummary"))
        return;
      if (!Gui.gui.bookmarks.needRefreshSubs && ele.byId("bookmarkpanel"))
        return;

      html += Gui.gui.bookmarks.getHtml();
    }

    if (ele.byId(Gui.gui.getParamPanelEleId()))
      ele.byId(Gui.gui.getParamPanelEleId()).innerHTML = html;

    if (ele.byId("btn_patch_settings"))
      ele.clickable(ele.byId("btn_patch_settings"), CABLES.CMD.UI.settings);
    if (ele.byId("btn_analyze_patch"))
      ele.clickable(ele.byId("btn_analyze_patch"), CABLES.CMD.PATCH.analyze);
    if (ele.byId("btn_toggle_patch_like"))
      ele.clickable(
        ele.byId("btn_toggle_patch_like"),
        CABLES.CMD.PATCH.togglePatchLike,
      );

    if (ele.byId("btn_patch_opendir"))
      ele.clickable(ele.byId("btn_patch_opendir"), (e) => {
        if (e.ctrlKey || e.metaKey)
          navigator.clipboard.writeText(platform.config.currentPatchDir);
        else CABLES.CMD.ELECTRON.openProjectDir();
      });

    this._outline.insert();
  }
}
