import { Events } from "@cables/client";
import Gui from "../gui.js";

export default class NoPatchEditor extends Events {
  constructor(cgl) {
    super();
    Gui.gui.patchView.setPatchRenderer(null, this);
  }

  get name() {
    return "nopatch";
  }

  isDraggingPort() {
    return false;
  }

  setSize() {}

  setProject() {}

  clear() {}

  dispose() {}

  focus() {}

  setCurrentSubPatch() {}

  getCurrentSubPatch() {
    return 0;
  }
}
