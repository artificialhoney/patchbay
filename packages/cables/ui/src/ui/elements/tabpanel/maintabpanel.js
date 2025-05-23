import { Events } from "@cables/client";
import Gui from "../../gui.js";
import UserSettings from "../../components/usersettings.js";
import TabPanel from "./tabpanel.js";

/**
 * the maintabpanel on the left side of the patchfield, can be minimized
 *
 * @export
 * @class MainTabPanel
 * @extends {Events}
 */
export default class MainTabPanel extends Events {
  /**
   * @param {TabPanel} tabs
   */
  constructor(tabs) {
    super();

    /** @type {TabPanel} */
    this._tabs = tabs;
    this._tabs.showTabListButton = true;
    this._visible = false;
    this._ele = document.getElementById("maintabs");
    this._ele.style.display = "none";

    this._tabs.on("onTabAdded", (tab, existedBefore) => {
      const wasVisible = this._visible;
      if (!existedBefore) this.show();

      tabs.activateTab("");
      tabs.activateTab(tab.id);

      if (!wasVisible && Gui.gui) Gui.gui.setLayout();
    });

    this._tabs.on("onTabRemoved", (tab) => {
      if (this._tabs.getNumTabs() == 0) {
        this.hide();
        Gui.gui.setLayout();
      }
    });
  }

  get tabs() {
    return this._tabs;
  }

  init() {
    const showMainTabs = UserSettings.userSettings.get("maintabsVisible");
    if (showMainTabs) this.show();
    else this.hide(true);
  }

  isVisible() {
    return this._visible;
  }

  /**
   * @param {boolean} userInteraction
   */
  show(userInteraction = false) {
    if (this._tabs.getNumTabs() == 0) {
      this.hide(true);
      return;
    }

    if (!userInteraction) {
      if (!UserSettings.userSettings.get("maintabsVisible")) {
        return;
      }
    }

    this._visible = true;
    this._ele.style.display = "block";
    document.getElementById("editorminimized").style.display = "none";

    if (Gui.gui.finishedLoading() && userInteraction)
      UserSettings.userSettings.set("maintabsVisible", true);

    Gui.gui.setLayout();

    this._tabs.updateSize();
    if (this._tabs.getActiveTab()) this._tabs.getActiveTab().activate();
  }

  /**
   * @param {boolean} donotsave
   */
  hide(donotsave = false) {
    this._visible = false;
    document.getElementById("editorminimized").style.display = "block";
    this._ele.style.display = "none";
    if (Gui.gui) Gui.gui.setLayout();

    if (!donotsave && Gui.gui.finishedLoading())
      UserSettings.userSettings.set("maintabsVisible", false);
  }

  /**
   * @param {boolean} userInteraction
   */
  toggle(userInteraction = false) {
    if (!Gui.gui.finishedLoading()) return;
    if (this._visible) {
      this.hide();
      Gui.gui.patchView.focus();
      const actTab = this.tabs.getActiveTab();
      if (actTab) actTab.activate();
    } else this.show(userInteraction);
  }
}
