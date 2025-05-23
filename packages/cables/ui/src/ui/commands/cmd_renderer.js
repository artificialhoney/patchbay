import { ele } from "@cables/client";
import CanvasLens from "../components/canvas/canvaslens.js";
import ModalDialog from "../dialogs/modaldialog.js";
import Gui from "../gui.js";

const CABLES_CMD_RENDERER = {};

const rendererCommands = {
  commands: [],
  functions: CABLES_CMD_RENDERER,
};

export default rendererCommands;

CABLES_CMD_RENDERER.screenshot = function () {
  Gui.gui.canvasManager.currentContext().saveScreenshot();
  Gui.gui.corePatch().resume();
};

CABLES_CMD_RENDERER.maximizeCanvas = function () {
  Gui.gui.cycleFullscreen();
};

CABLES_CMD_RENDERER.resetSize = function () {
  Gui.gui.rendererWidth = 640;
  Gui.gui.rendererHeight = 360;
  Gui.gui.setLayout();
};

CABLES_CMD_RENDERER.canvasMagnifier = function () {
  Gui.gui.canvasMagnifier = new CanvasLens();
};

CABLES_CMD_RENDERER.scrollingPage = function () {
  if (ele.byId("testcontent").innerHTML == "") {
    document.body.classList.add("scrollPage");

    let str = "";
    for (let i = 0; i < 1000; i++) {
      str += "- long page...<br/>";
    }

    str +=
      '<div style="position:fixed;bottom:50px;z-index:99999;border-radius:10px;left:40%;cursor:pointer;background-color:#07F78C;color:#000;padding:20px;" class="button-small" onclick="CABLES.CMD.RENDERER.scrollingPage();">exit scrollmode<div>';
    ele.byId("testcontent").innerHTML = str;
  } else {
    document.body.scrollTo({ top: 0, behaviour: "smooth" });
    document.body.classList.remove("scrollPage");
    ele.byId("testcontent").innerHTML = "";
  }
};

CABLES_CMD_RENDERER.aspect = function (a = 0) {
  if (!a) {
    new ModalDialog({
      prompt: true,
      title: "Change Aspect Ratio of Renderer",
      text: "Enter an aspect ratio, e.g.: 16:9 or 0.22",
      promptValue: Gui.gui.corePatch().cgl.canvasScale,
      promptOk: (r) => {
        if (r.indexOf(":") >= 0) {
          const parts = r.split(":");
          const s = parseInt(parts[0]) / parseInt(parts[1]);
          CABLES_CMD_RENDERER.aspect(s);
        } else {
          const s = parseFloat(r);
          CABLES_CMD_RENDERER.aspect(s);
        }
      },
    });

    return;
  }
  const nh = (Gui.gui.rendererWidth * 1) / a;

  if (nh < window.innerHeight * 0.6) {
    Gui.gui.rendererHeight = nh;
  } else {
    Gui.gui.rendererHeight = window.innerHeight * 0.6;
    Gui.gui.rendererWidth = Gui.gui.rendererHeight * a;
  }

  Gui.gui.emitEvent(Gui.gui.EVENT_RESIZE_CANVAS);
  Gui.gui.setLayout();
  Gui.gui.canvasManager.getCanvasUiBar().updateCanvasIconBar();
};

CABLES_CMD_RENDERER.scaleCanvas = function () {
  const p = new ModalDialog({
    prompt: true,
    title: "Change Scale of Renderer",
    text: "Enter a new scale",
    promptValue: Gui.gui.corePatch().cgl.canvasScale || 1,
    promptOk: (r) => {
      const s = parseFloat(r);
      Gui.gui.corePatch().cgl.canvasScale = s;
      Gui.gui.setLayout();
    },
  });
};

CABLES_CMD_RENDERER.changeSize = function () {
  let str = "Enter a new size:";

  if (Gui.gui.canvasManager.getCanvasUiBar())
    Gui.gui.canvasManager.getCanvasUiBar().showCanvasModal(false);

  const p = new ModalDialog({
    prompt: true,
    title: "Change Canvas size",
    text: str,
    promptValue:
      Math.round(Gui.gui.rendererWidth) +
      " x " +
      Math.round(Gui.gui.rendererHeight),
    promptOk: (r) => {
      const matches = r.match(/\d+/g);
      if (matches.length > 0) {
        Gui.gui.rendererWidth = matches[0];
        Gui.gui.rendererHeight = matches[1];
        Gui.gui.setLayout();
      }
    },
  });
};

CABLES_CMD_RENDERER.popoutCanvas = function () {
  Gui.gui.canvasManager.popOut();
};

rendererCommands.commands.push(
  {
    cmd: "save screenshot",
    category: "canvas",
    func: CABLES_CMD_RENDERER.screenshot,
    icon: "image",
  },
  {
    cmd: "maximize canvas",
    category: "canvas",
    func: CABLES_CMD_RENDERER.maximizeCanvas,
    icon: "canvas_max",
    infotext: "renderer_maximize",
  },
  {
    cmd: "change canvas size",
    category: "canvas",
    func: CABLES_CMD_RENDERER.changeSize,
    icon: "resize_canvas",
  },
  {
    cmd: "reset canvas size",
    category: "canvas",
    func: CABLES_CMD_RENDERER.resetSize,
    icon: "reset_render_size",
  },
  {
    cmd: "set canvas aspect ratio",
    category: "canvas",
    func: CABLES_CMD_RENDERER.aspect,
    icon: "canvas_max",
  },
  {
    cmd: "scale canvas",
    category: "canvas",
    func: CABLES_CMD_RENDERER.scaleCanvas,
    icon: "scale_canvas",
  },
  {
    cmd: "canvas magnifier",
    category: "canvas",
    func: CABLES_CMD_RENDERER.canvasMagnifier,
    icon: "picker",
  },
  {
    cmd: "canvas window",
    category: "canvas",
    func: CABLES_CMD_RENDERER.popoutCanvas,
    icon: "external",
  },
  {
    cmd: "Simulate Scrolling Page",
    category: "canvas",
    func: CABLES_CMD_RENDERER.scrollingPage,
  },
);
