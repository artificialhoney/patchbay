import { ModalBackground, Logger } from "@cables/client";
import uiConfig from "../uiconfig.js";
import Gui from "../gui.js";
import UserSettings from "./usersettings.js";

let idling = false;
let idleTimeout = null;
let idleModeStart = 0;
let idleFocus = false;
let idleModal = null;
let activeModeStart = performance.now();

const logger = new Logger("idlemode");

function startIdleMode() {
  if (
    Gui.gui.canvasManager.mode == Gui.gui.canvasManager.CANVASMODE_POPOUT ||
    Gui.gui.canvasManager.mode == Gui.gui.canvasManager.CANVASMODE_FULLSCREEN
  )
    return;
  if (Gui.gui.patchView.hasFocus() && idleFocus) return;

  if (!window.gui || !Gui.gui.finishedLoading()) return;
  if (idling) return;
  if (!UserSettings.userSettings.get("idlemode")) return;
  if (Gui.gui.socket && Gui.gui.socket.inMultiplayerSession) return;

  const wasActiveSeconds = (performance.now() - activeModeStart) / 1000;
  if (
    window.gui &&
    !(
      Gui.gui.currentModal &&
      Gui.gui.currentModal.persistInIdleMode &&
      Gui.gui.currentModal.persistInIdleMode()
    )
  ) {
    Gui.gui.restriction.setMessage(
      "idlemode",
      "cables is paused! Click to resume",
    );
    idleModal = new ModalBackground();
    idleModal.show();
  }

  Gui.gui.corePatch().pause();
  Gui.gui.emitEvent("uiIdleStart", wasActiveSeconds);
  idling = true;

  clearTimeout(idleTimeout);
  idleModeStart = Date.now();
}

function idleInteractivity() {
  idleFocus = true;

  if (idling) stopIdleMode();
  if (!document.hidden) {
    clearTimeout(idleTimeout);
    idleTimeout = setTimeout(startIdleMode, uiConfig.idleModeTimeout * 1000);
  }
}

function stopIdleMode() {
  if (!window.gui || !Gui.gui.finishedLoading()) return;
  if (!idling) return;

  const idleSeconds = Math.round((Date.now() - idleModeStart) / 1000);
  logger.log("idled for ", idleSeconds + " seconds");

  Gui.gui.corePatch().resume();
  // if (idleModal) idleModal.close();
  if (idleModal) {
    idleModal.hide();
    Gui.gui.restriction.setMessage("idlemode", null);
  }
  // Gui.gui.closeModal();
  idling = false;
  clearTimeout(idleTimeout);
  Gui.gui.emitEvent("uiIdleEnd", idleSeconds);
  activeModeStart = performance.now();
}

function visibilityChanged(e) {
  idleTimeout = clearTimeout(idleTimeout);
  if (document.hidden) idleTimeout = setTimeout(startIdleMode, 1000);
  else stopIdleMode();
}

export default function startIdleListeners() {
  if (Gui.gui.isRemoteClient) return;

  window.addEventListener("focus", (event) => {
    idleFocus = true;
    clearTimeout(idleTimeout);
    stopIdleMode();
  });

  window.addEventListener("blur", (event) => {
    idleFocus = false;
    clearTimeout(idleTimeout);
    idleTimeout = setTimeout(startIdleMode, uiConfig.idleModeTimeout * 1000);
  });

  document.addEventListener("keydown", idleInteractivity, false);
  document.addEventListener("pointermove", idleInteractivity);
  document.addEventListener("visibilitychange", visibilityChanged);
  Gui.gui.on("userActivity", idleInteractivity);

  idleTimeout = setTimeout(startIdleMode, uiConfig.idleModeTimeout * 1000);
}
