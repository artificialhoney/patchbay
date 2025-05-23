import { Events } from "@cables/client";
import Tab from "../../elements/tabpanel/tab.js";
import { getHandleBarHtml } from "../../utils/handlebars.js";
import text from "../../text.js";
import Gui from "../../gui.js";

export default class JobsTab extends Events {
  constructor(tabs) {
    super();
    this._tabs = tabs;

    this._tab = new Tab("Jobs", {
      icon: "list",
      infotext: "tab_logging",
      padding: true,
      singleton: "true",
    });
    this._tabs.addTab(this._tab, true);

    this._html();

    Gui.gui.corePatch().loading.on("finishedTask", this._html.bind(this));
    Gui.gui.corePatch().loading.on("addTask", this._html.bind(this));
    Gui.gui.corePatch().loading.on("startTask", this._html.bind(this));

    Gui.gui.jobs().on("taskAdd", this._html.bind(this));
    Gui.gui.jobs().on("taskFinish", this._html.bind(this));
  }

  _html() {
    let list = Gui.gui.corePatch().loading.getList();
    let jobs = Gui.gui.jobs().getList();

    for (let i = 0; i < jobs.length; i++) {
      jobs[i].name = jobs[i].name || jobs[i].title;
      jobs[i].type = jobs[i].type || "";
      jobs[i].finished = jobs[i].finished || false;
      list.push(jobs[i]);
    }

    list.sort((a, b) => {
      return b.timeStart - a.timeStart;
    });

    const html = getHandleBarHtml("tab_jobs", {
      user: Gui.gui.user,
      texts: text.preferences,
      list: list,
    });
    this._tab.html(html);
  }
}
