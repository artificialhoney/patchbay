import { ele } from "@cables/client";
import cablesElectron from "./cables_init.js";

window.ele = ele;
document.addEventListener("DOMContentLoaded", () => {
  cablesElectron.init();
  window.electron = cablesElectron;
  document.dispatchEvent(new Event("cablesStandaloneReady"));
});
