import { ele, HandlebarsHelper } from "@cables/client";
import ServerOps from "./api/opsserver.js";
import NoPatchEditor from "./components/nopatcheditor.js";
import Gui from "./gui.js";
import Tracking from "./tracking/tracking.js";
import HtmlInspector from "./elements/canvasoverlays/htmlinspect.js";
import ModalDialog from "./dialogs/modaldialog.js";
import ScConnection from "./socketcluster/sc_connection.js";
import text from "./text.js";
import { notifyError } from "./elements/notification.js";
import startIdleListeners from "./components/idlemode.js";
import GlGuiFull from "./glpatch/gluifull.js";
import { platform } from "./platform.js";
import { editorSession } from "./elements/tabpanel/editor_session.js";
import UserSettings from "./components/usersettings.js";

/**
 * manage the start of the ui/editor
 *
 * @export
 * @param {*} cfg
 */
export default function startUi(cfg) {
  if (window.logStartup) logStartup("Init UI");
  HandlebarsHelper.initHandleBarsHelper();

  window.CABLES.GLGUI = window.gui = window.Gui = new Gui(cfg);

  Gui.gui.on("uiloaded", () => {
    new Tracking();
  });

  if (Gui.gui.isRemoteClient) new NoPatchEditor();
  else new GlGuiFull(Gui.gui.corePatch());

  incrementStartup();
  Gui.gui.serverOps = new ServerOps(cfg.patchId, () => {
    Gui.gui.init();
    Gui.gui.checkIdle();
    Gui.gui.initCoreListeners();

    Gui.gui.corePatch().timer.setTime(0);

    if (!Gui.gui.corePatch().cgl.gl) {
      // ele.byId("loadingstatus").remove();
      // ele.byId("loadingstatusLog").remove();

      new ModalDialog({
        title: "GL Error",
        html: "Could not initialize webgl, or it crashed. Try to restart your browser, or try another one...",
      });
      return;
    }

    Gui.gui.bind(() => {
      incrementStartup();
      platform.initRouting(() => {
        incrementStartup();
        Gui.gui.opSelect().prepare();
        UserSettings.userSettings.init();
        incrementStartup();

        Gui.gui.opSelect().reload();
        Gui.gui.showWelcomeNotifications();
        incrementStartup();
        Gui.gui.showUiElements();
        Gui.gui.setLayout();
        Gui.gui.opSelect().prepare();
        incrementStartup();
        Gui.gui.opSelect().search();
        Gui.gui.setElementBgPattern(ele.byId("cablescanvas"));

        editorSession.open();

        Gui.gui.setFontSize(UserSettings.userSettings.get("fontSizeOff"));

        UserSettings.userSettings.on("change", function (key, v) {
          if (key == "fontSizeOff") {
            Gui.gui.setFontSize(v);
          }

          if (key == "bgpattern") {
            Gui.gui.setElementBgPattern(ele.byId("cablescanvas"));
            Gui.gui.setElementBgPattern(ele.byId("bgpreview"));
          }

          if (key == "hideSizeBar") {
            Gui.gui.setLayout();
          }
        });

        if (!UserSettings.userSettings.get("introCompleted"))
          Gui.gui.introduction.showIntroduction();

        Gui.gui.bindKeys();
        ele.byId("maincomponents").style.display = "inline";

        const socketClusterConfig = platform.getSocketclusterConfig();
        if (!Gui.gui.socket && socketClusterConfig.enabled) {
          Gui.gui.socket = new ScConnection(socketClusterConfig);
        }

        startIdleListeners();

        new HtmlInspector();

        if (UserSettings.userSettings.get("openLogTab") == true)
          CABLES.CMD.DEBUG.logConsole();

        Gui.gui.maintabPanel.init();

        Gui.gui.corePatch().logStartup("finished loading cables");

        setTimeout(() => {
          if (UserSettings.userSettings.get("forceWebGl1"))
            notifyError("Forcing WebGl v1 ");
        }, 1000);

        Gui.gui.patchView.checkPatchErrors();

        Gui.gui.patchView.setCurrentSubPatch(0);

        ele.byId("patchnavhelperEmpty").innerHTML =
          text.patch_hint_overlay_empty;
        ele.byId("patchnavhelperBounds").innerHTML =
          text.patch_hint_overlay_outofbounds;

        document.getElementById("loadingstatusLog").style.display = "none";

        let projectId = Gui.gui.patchId;
        if (Gui.gui.project()) {
          projectId = Gui.gui.project().shortId || Gui.gui.project()._id;
        }
        new QRCode(document.getElementById("remote_view_qr"), {
          text: platform.getCablesUrl() + "/remote_client/" + projectId,
          width: 200,
          height: 200,
          colorDark: "#000000",
          colorLight: "#ffffff",
          correctLevel: QRCode.CorrectLevel.H,
        });

        new QRCode(document.getElementById("patch_view_qr"), {
          text: platform.getCablesUrl() + "/p/" + projectId,
          width: 200,
          height: 200,
          colorDark: "#000000",
          colorLight: "#ffffff",
          correctLevel: QRCode.CorrectLevel.H,
        });

        if (Gui.gui.user)
          Gui.gui.updateActivityFeedIcon(Gui.gui.user.activityFeed);

        CABLES.UI.loaded = true;
        CABLES.UI.loadedTime = performance.now();

        Gui.gui.corePatch().clearSubPatchCache();

        for (let i = 0; i < Gui.gui.corePatch().ops.length; i++)
          if (Gui.gui.corePatch().ops[i].checkLinkTimeWarnings)
            Gui.gui.corePatch().ops[i].checkLinkTimeWarnings();

        Gui.gui.patchParamPanel.show();

        setTimeout(() => {
          Gui.gui.emitEvent("uiloaded");
          Gui.gui.corePatch().timer.setTime(0);
        }, 100);
      });
    });
  });

  Gui.gui.corePatch().logStartup("Init UI done");
}
