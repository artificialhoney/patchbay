import { ele } from "@cables/client";
import Tab from "../../elements/tabpanel/tab.js";
import Gui from "../../gui.js";
import text from "../../text.js";
import { getHandleBarHtml } from "../../utils/handlebars.js";
import { platform } from "../../platform.js";
import UserSettings from "../usersettings.js";
import TabPanel from "../../elements/tabpanel/tabpanel.js";

/**
 * show user editor preferences, stored in {@link UserSettings}
 *
 * @export
 * @class Preferences
 */
export default class Preferences {
  /**
   * @param {TabPanel} tabs
   */
  constructor(tabs) {
    this._tab = new Tab("Preferences", {
      icon: "settings",
      infotext: "tab_preferences",
      singleton: true,
    });
    tabs.addTab(this._tab, true);

    this.show();
  }

  setInputValue(name, value) {
    if (value === null) value = false;
    const elements = document.getElementsByClassName("valinput");
    for (let i = 0; i < elements.length; i++) {
      if (elements[i].dataset.setting == name) {
        elements[i].value = value;
        // if (elements[i].dataset.value == "" + value || (elements[i].dataset.value == "false" && !value)) elements[i].classList.add("switch-active");
        // else elements[i].classList.remove("switch-active");
      }
    }
  }

  setSwitchValue(name, value) {
    if (value === null) value = false;
    const elements = document.getElementsByClassName("prefswitch");

    for (let i = 0; i < elements.length; i++) {
      if (elements[i].dataset.setting == name) {
        if (
          elements[i].dataset.value == "" + value ||
          (elements[i].dataset.value == "false" && !value)
        )
          elements[i].classList.add("switch-active");
        else elements[i].classList.remove("switch-active");
      }
    }
  }

  updateValues() {
    this.setSwitchValue(
      "snapToGrid2",
      UserSettings.userSettings.get("snapToGrid2"),
    );
    this.setSwitchValue(
      "canvasMode",
      UserSettings.userSettings.get("canvasMode"),
    );

    this.setSwitchValue(
      "hideCanvasUi",
      UserSettings.userSettings.get("hideCanvasUi"),
    );
    this.setSwitchValue(
      "bgpreview",
      UserSettings.userSettings.get("bgpreview"),
    );

    this.setSwitchValue(
      "texpreviewTransparent",
      UserSettings.userSettings.get("texpreviewTransparent") || false,
    );
    this.setSwitchValue(
      "texpreviewMode",
      UserSettings.userSettings.get("texpreviewMode") || "",
    );

    this.setSwitchValue(
      "linetype",
      UserSettings.userSettings.get("linetype") || "curved",
    );
    this.setSwitchValue(
      "touchpadmode",
      UserSettings.userSettings.get("touchpadmode"),
    );
    this.setSwitchValue(
      "presentationmode",
      UserSettings.userSettings.get("presentationmode"),
    );
    this.setSwitchValue(
      "nobrowserWarning",
      UserSettings.userSettings.get("nobrowserWarning"),
    );
    this.setSwitchValue(
      "introCompleted",
      UserSettings.userSettings.get("introCompleted"),
    );
    this.setSwitchValue(
      "randomizePatchName",
      UserSettings.userSettings.get("randomizePatchName", true),
    );
    this.setSwitchValue(
      "showTipps",
      UserSettings.userSettings.get("showTipps"),
    );
    this.setSwitchValue(
      "showMinimap",
      UserSettings.userSettings.get("showMinimap"),
    );
    this.setSwitchValue(
      "hideSizeBar",
      UserSettings.userSettings.get("hideSizeBar"),
    );

    this.setSwitchValue(
      "helperMode",
      UserSettings.userSettings.get("helperMode"),
    );
    this.setSwitchValue("idlemode", UserSettings.userSettings.get("idlemode"));

    this.setInputValue(
      "wheelmultiplier",
      UserSettings.userSettings.get("wheelmultiplier") || 1,
    );
    this.setInputValue(
      "fontsize_ace",
      UserSettings.userSettings.get("fontsize_ace") || 12,
    );
    this.setSwitchValue(
      "wrapmode_ace",
      UserSettings.userSettings.get("wrapmode_ace") || false,
    );

    this.setSwitchValue(
      "quickLinkLongPress",
      UserSettings.userSettings.get("quickLinkLongPress"),
    );
    this.setSwitchValue(
      "quickLinkMiddleMouse",
      UserSettings.userSettings.get("quickLinkMiddleMouse"),
    );
    this.setSwitchValue(
      "doubleClickAction",
      UserSettings.userSettings.get("doubleClickAction"),
    );

    // this.setSwitchValue("forceWebGl1", UserSettings.userSettings.get("forceWebGl1"));
    this.setSwitchValue(
      "devinfos",
      UserSettings.userSettings.get("devinfos") || false,
    );

    this.setSwitchValue(
      "patch_button_scroll",
      UserSettings.userSettings.get("patch_button_scroll") || "2",
    );
    this.setSwitchValue(
      "patch_allowCableDrag",
      UserSettings.userSettings.get("patch_allowCableDrag") || false,
    );

    this.setSwitchValue(
      "miniopselect",
      UserSettings.userSettings.get("miniopselect"),
    );
    this.setSwitchValue(
      "glpatch_cursor",
      UserSettings.userSettings.get("glpatch_cursor"),
    );
    this.setSwitchValue(
      "noFadeOutCables",
      UserSettings.userSettings.get("noFadeOutCables"),
    );

    // this.setSwitchValue("glpatch_showboundings", UserSettings.userSettings.get("glpatch_showboundings") || false);

    this.setSwitchValue(
      "bgpattern",
      UserSettings.userSettings.get("bgpattern") || "bgPatternDark",
    );
    this.setSwitchValue(
      "fontSizeOff",
      UserSettings.userSettings.get("fontSizeOff") || 0,
    );

    this.setSwitchValue(
      "formatcode",
      UserSettings.userSettings.get("formatcode") || false,
    );
    this.setSwitchValue(
      "notlocalizeNumberformat",
      UserSettings.userSettings.get("notlocalizeNumberformat") || false,
    );

    this.setSwitchValue(
      "openlastproject",
      UserSettings.userSettings.get("openlastproject") || false,
    );
    this.setSwitchValue(
      "openfullscreen",
      UserSettings.userSettings.get("openfullscreen") || false,
    );
    this.setSwitchValue(
      "maximizerenderer",
      UserSettings.userSettings.get("maximizerenderer") || false,
    );

    this.setInputValue(
      "authorName",
      UserSettings.userSettings.get("authorName") || "",
    );
    this.setSwitchValue(
      "escape_closetabs",
      UserSettings.userSettings.get("escape_closetabs") || false,
    );

    this.setSwitchValue(
      "ace_keymode",
      UserSettings.userSettings.get("ace_keymode") || "",
    );

    if (platform.frontendOptions.selectableDownloadPath) {
      const currentValue = UserSettings.userSettings.get("downloadPath") || "";
      this.setInputValue("downloadPath", currentValue);
      const pathSelectEle = ele.byId("usersetting_downloadPath");
      if (pathSelectEle) {
        const valueEle = pathSelectEle.querySelector(".value");
        if (valueEle) valueEle.innerText = currentValue;
        pathSelectEle.addEventListener("click", () => {
          platform.talkerAPI.send(
            "selectDir",
            { dir: currentValue },
            (err, dirName) => {
              if (!err) {
                UserSettings.userSettings.set("downloadPath", dirName);
              }
            },
          );
        });
      }
    }

    this.setSwitchValue(
      "patch_wheelmode",
      UserSettings.userSettings.get("patch_wheelmode") || "zoom",
    );
    this.setInputValue(
      "patch_panspeed",
      UserSettings.userSettings.get("patch_panspeed") || 0.25,
    );
    this.setInputValue(
      "keybind_escape",
      UserSettings.userSettings.get("keybind_escape") || "escape",
    );
  }

  show() {
    const html = getHandleBarHtml("tab_preferences", {
      user: Gui.gui.user,
      texts: text.preferences,
    });
    this._tab.html(html);
    this.updateValues();

    let elements = document.getElementsByClassName("prefswitch");
    for (let i = 0; i < elements.length; i++) {
      elements[i].addEventListener("click", (e) => {
        let v = e.target.dataset.value;

        if (v === "true") v = true;
        if (v === "false") v = false;

        UserSettings.userSettings.set(e.target.dataset.setting, v);
      });
    }

    elements = document.getElementsByClassName("valinput");
    for (let i = 0; i < elements.length; i++) {
      elements[i].addEventListener("input", (e) => {
        let v = e.target.value;
        if (e.target.classList.contains("numberinput")) v = parseFloat(v);
        if (v == v) UserSettings.userSettings.set(e.target.dataset.setting, v);
      });
    }

    ele.byId("resetPrefs").addEventListener("click", () => {
      UserSettings.userSettings.reset();
    });

    UserSettings.userSettings.on("change", () => {
      this.updateValues();
    });
  }
}
