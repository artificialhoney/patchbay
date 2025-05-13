import { ele } from "@cables/client";
import UserSettings from "../components/usersettings.js";
import Gui from "../gui.js";

const splitpane = {};
window.splitpane = splitpane;
splitpane.listeners = [];

export default initSplitPanes;

function initSplitPanes() {
  ele.byId("splitterPatch").addEventListener("pointerdown", function (ev) {
    Gui.gui.pauseProfiling();
    ev.preventDefault();
    splitpane.bound = true;
    function mm(e) {
      Gui.gui.pauseInteractionSplitpanes();

      Gui.gui.pauseProfiling();
      e.preventDefault();

      const pos =
        (window.innerWidth - e.clientX) *
        (1 / Gui.gui.corePatch().cgl.canvasScale);

      if (Gui.gui.rendererWidth != -1) Gui.gui.rendererWidth = pos;
      Gui.gui.splitpanePatchPos = pos;

      Gui.gui.setLayout();
      Gui.gui.emitEvent(Gui.gui.EVENT_RESIZE_CANVAS);
      Gui.gui.canvasManager.getCanvasUiBar().updateCanvasIconBar();
    }

    document.addEventListener("pointermove", mm);
    splitpane.listeners.push(mm);
  });

  ele.byId("splitterPatch").addEventListener("pointerup", function (_e) {
    Gui.gui.resumeInteractionSplitpanes();
  });

  ele.byId("splitterMaintabs").addEventListener("pointerup", function (_e) {
    Gui.gui.resumeInteractionSplitpanes();
  });

  function resizeTabs(_ev) {
    Gui.gui.pauseProfiling();
    splitpane.bound = true;
    function mm(e) {
      Gui.gui.pauseInteractionSplitpanes();

      Gui.gui.editorWidth = e.clientX;
      if (Gui.gui.editorWidth < 30) Gui.gui.editorWidth = 30;
      UserSettings.userSettings.set("editorWidth", Gui.gui.editorWidth);
      Gui.gui.setLayout();
      Gui.gui.mainTabs.emitEvent("resize");
    }

    document.addEventListener("pointermove", mm, { passive: false });
    splitpane.listeners.push(mm);
  }

  ele
    .byId("splitterMaintabs")
    .addEventListener("pointerdown", resizeTabs, { passive: false });

  ele.byId("splitterRenderer").addEventListener("pointerdown", function (ev) {
    ev.preventDefault();
    splitpane.bound = true;
    function mm(e) {
      e.preventDefault();
      Gui.gui.rendererHeight =
        e.clientY * (1 / Gui.gui.corePatch().cgl.canvasScale);
      Gui.gui.setLayout();
      Gui.gui.canvasManager.getCanvasUiBar().updateCanvasIconBar();
    }

    document.addEventListener("pointermove", mm);
    splitpane.listeners.push(mm);
  });

  ele.byId("splitterBottomTabs").addEventListener("pointerdown", function (ev) {
    ev.preventDefault();
    splitpane.bound = true;
    function mm(e) {
      Gui.gui.pauseInteractionSplitpanes();
      e.preventDefault();
      Gui.gui.bottomTabPanel.setHeight(window.innerHeight - e.clientY);
      Gui.gui.setLayout();
    }

    document.addEventListener("pointermove", mm);
    splitpane.listeners.push(mm);
  });

  function resizeRenderer(ev) {
    if (Gui.gui.canvasManager.mode == Gui.gui.canvasManager.CANVASMODE_PATCHBG)
      return;

    if (ev.shiftKey) {
      if (!splitpane.rendererAspect)
        splitpane.rendererAspect =
          Gui.gui.rendererWidth / Gui.gui.rendererHeight;
    } else splitpane.rendererAspect = 0.0;

    ev.preventDefault();
    splitpane.bound = true;
    function mm(e) {
      Gui.gui.pauseInteractionSplitpanes();
      let x = e.clientX;
      let y = e.clientY;

      if (x === undefined && e.touches && e.touches.length > 0) {
        x = e.touches[0].clientX;
        y = e.touches[0].clientY;
      }

      Gui.gui.rendererWidth =
        (window.innerWidth - x) * (1 / Gui.gui.corePatch().cgl.canvasScale) + 3;

      if (splitpane.rendererAspect)
        Gui.gui.rendererHeight =
          (1 / splitpane.rendererAspect) * Gui.gui.rendererWidth;
      else
        Gui.gui.rendererHeight =
          y * (1 / Gui.gui.corePatch().cgl.canvasScale) - 38;

      Gui.gui.setLayout();
      Gui.gui.canvasManager.getCanvasUiBar().updateCanvasIconBar();
      Gui.gui.canvasManager.focus();
      Gui.gui.emitEvent(Gui.gui.EVENT_RESIZE_CANVAS);
      e.preventDefault();
    }

    document.addEventListener("pointermove", mm);
    splitpane.listeners.push(mm);
  }

  ele
    .byId("splitterRendererWH")
    .addEventListener("pointerdown", resizeRenderer, { passive: false });

  function stopSplit(_e) {
    if (splitpane.listeners.length > 0) {
      for (let i = 0; i < splitpane.listeners.length; i++)
        document.removeEventListener("pointermove", splitpane.listeners[i]);

      Gui.gui.resumeInteractionSplitpanes();

      splitpane.listeners.length = 0;
      splitpane.bound = false;
      Gui.gui.setLayout();
    }
  }

  document.addEventListener("pointerup", stopSplit);
}
