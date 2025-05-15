import { Events, ele } from "@cables/client";
import Gui from "../../gui.js";
import UserSettings from "../../components/usersettings.js";
import uiconfig from "../../uiconfig.js";
import TabPanel from "./tabpanel.js";

export default class BottomTabPanel extends Events {
  /**
   * @param {TabPanel} tabs
   */
  constructor(tabs) {
    super();
    this._tabs = tabs;
    this._tabs.showTabListButton = false;
    this._visible = false;
    this._ele = document.getElementById("bottomtabs");
    this._ele.style.display = "none";
    this.height =
      UserSettings.userSettings.get("bottomPanelHeight") ||
      uiconfig.timingPanelHeight;
    this._toBottomPanel = null;

    this._tabs.on("onTabAdded", (tab, existedBefore) => {
      const wasVisible = this._visible;
      if (!existedBefore) this.show();

      tabs.activateTab("");
      tabs.activateTab(tab.id);

      if (!wasVisible && Gui.gui) Gui.gui.setLayout();
    });

    this._tabs.on("onTabRemoved", (_tab) => {
      if (this._tabs.getNumTabs() == 0) {
        this.hide();
        Gui.gui.setLayout();
      }
    });
    this.fixHeight();
  }

  init() {
    const showtabs = UserSettings.userSettings.get("bottomTabsVisible");
    if (showtabs) this.show();
    else this.hide(true);
  }

  isVisible() {
    return this._visible;
  }

  /**
   * @param {Boolean} userInteraction
   */
  show(userInteraction = false) {
    if (Gui.gui.unload) return;
    UserSettings.userSettings.set("bottomTabsOpened", true);
    this._tabs.emitEvent("resize");

    if (this._tabs.getNumTabs() == 0) {
      this.hide(true);
      return;
    }

    if (!userInteraction) {
      if (!UserSettings.userSettings.get("bottomTabsVisible")) {
        return;
      }
    }

    this._visible = true;
    this._ele.style.display = "block";

    ele.byId("splitterBottomTabs").style.display = "block";

    document.getElementById("editorminimized").style.display = "none";

    if (Gui.gui.finishedLoading() && userInteraction)
      UserSettings.userSettings.set("bottomTabsVisible", true);

    Gui.gui.setLayout();
  }

  getHeight() {
    if (!this._visible) return 0;
    return this.height;
  }

  fixHeight() {
    this.height = Math.min(this.height, window.innerHeight * 0.7);
    this.height = Math.max(150, this.height);
  }

  /**
   * @param {number} h
   */
  setHeight(h) {
    this.height = h;

    clearTimeout(this._toBottomPanel);
    this._toBottomPanel = setTimeout(() => {
      this.fixHeight();
      UserSettings.userSettings.set("bottomPanelHeight", this.height);
    }, 100);
    Gui.gui.setLayout();

    this._tabs.emitEvent("resize");
  }

  /**
   * @param {boolean} donotsave
   */
  hide(donotsave = false) {
    ele.byId("splitterBottomTabs").style.display = "none";

    UserSettings.userSettings.set("bottomTabsOpened", false);
    this._tabs.emitEvent("resize");

    this._visible = false;
    document.getElementById("editorminimized").style.display = "block";
    this._ele.style.display = "none";
    if (Gui.gui) Gui.gui.setLayout();

    if (!donotsave && Gui.gui.finishedLoading())
      UserSettings.userSettings.set("bottomTabsVisible", false);
  }

  /**
   * @param {boolean} userInteraction
   */
  toggle(userInteraction = false) {
    if (!Gui.gui.finishedLoading()) return;
    console.log("toggle", this._visible);
    if (this._visible) {
      this.hide();
      Gui.gui.patchView.focus();
      this._visible = false;
    } else this.show(userInteraction);
  }

  isMinimized() {
    return !this._visible;
  }
}
