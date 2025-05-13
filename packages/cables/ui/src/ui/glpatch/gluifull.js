import Gui from "../gui.js";
import GlUiCanvas from "./gluicanvas.js";

export default class GlGuiFull {
  constructor(patch) {
    const views = document.getElementById("patchviews");
    const ele = document.createElement("div");

    views.appendChild(ele);
    const id = "glpatch" + views.children.length;
    ele.id = id;
    ele.classList.add("glpatchcontainer");

    if (!patch.cgl.gl) {
      console.log("webgl not available! :/");
      return;
    }

    const a = new GlUiCanvas(patch, ele);

    Gui.gui.patchView.setPatchRenderer(id, a.glPatch);
    Gui.gui.patchView.switch(ele.id);

    a.parentResized();

    Gui.gui.on("setLayout", () => {
      a.parentResized();
    });
  }
}
