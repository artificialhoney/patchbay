import { Events } from "@cables/client";
import Tab from "../../elements/tabpanel/tab.js";
import Gui from "../../gui.js";

/**
 *simple tab to just show html
 *
 * @export
 * @class HtmlTab
 * @extends {Events}
 */
export default class HtmlTab extends Events {
  constructor(tabs, html, title, options = {}) {
    super();
    this._tabs = tabs || Gui.gui.mainTabs;

    this._tab = new Tab(title, {
      icon: options.icon || "list",
      infotext: "tab_logging",
      padding: true,
      singleton: true,
    });
    this._tabs.addTab(this._tab, true);
    Gui.gui.maintabPanel.show(true);

    this._tab.html(html);
  }
}
