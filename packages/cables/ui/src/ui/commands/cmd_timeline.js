import { PortHtmlGenerator } from "../components/opparampanel/op_params_htmlgen.js";
import ParamsListener from "../components/opparampanel/params_listener.js";
import GlTimelineTab from "../components/tabs/tab_gltimeline.js";
import Gui from "../gui.js";

const CABLES_CMD_TIMELINE = {};

const timelineCommands = {
  commands: [],
  functions: CABLES_CMD_TIMELINE,
};

export default timelineCommands;

CABLES_CMD_TIMELINE.TimelineCreateKeyAtCursor = function () {
  Gui.gui.glTimeline.createKeyAtCursor();
};

CABLES_CMD_TIMELINE.ListAnimatedPorts = function () {
  const panelid = CABLES.uuid();
  const ops = Gui.gui.corePatch().ops;
  const ports = [];

  for (let i = 0; i < ops.length; i++) {
    const inputs = ops[i].portsIn;
    for (let j = 0; j < inputs.length; j++)
      if (inputs[j].isAnimated()) ports.push(inputs[j]);
  }

  const htmlgen = new PortHtmlGenerator(panelid);

  let html = '<div class="panel params" ><table>';

  html += htmlgen.getHtmlInputPorts(ports);
  html += "</table></div>";
  const tab = new CABLES.UI.Tab("Animated Ports", {
    icon: "clock",
    infotext: "tab_timeline",
    padding: true,
    singleton: true,
  });
  Gui.gui.mainTabs.addTab(tab, true);
  tab.html(html);
  Gui.gui.maintabPanel.show(true);

  const paramsListener = new ParamsListener(panelid);
  paramsListener.init({ portsIn: ports });
};

CABLES_CMD_TIMELINE.TimelinePlay = function () {
  Gui.gui.corePatch().timer.play();
  Gui.gui.emitEvent(
    "timelineControl",
    "setPlay",
    true,
    Gui.gui.corePatch().timer.getTime(),
  );
};

CABLES_CMD_TIMELINE.setLength = function () {
  // Gui.gui.timeLine().setProjectLength();
};

CABLES_CMD_TIMELINE.TimelineForward = function () {
  Gui.gui.corePatch().timer.setTime(Gui.gui.corePatch().timer.getTime() + 2);
  Gui.gui.timeLine().view.centerCursor();
};

CABLES_CMD_TIMELINE.TimelineRewind = function () {
  Gui.gui.corePatch().timer.setTime(Gui.gui.corePatch().timer.getTime() - 2);
  Gui.gui.timeLine().view.centerCursor();
};

CABLES_CMD_TIMELINE.TimelineRewindStart = function () {
  Gui.gui.corePatch().timer.setTime(0);
  Gui.gui.timeLine().view.centerCursor();
};

CABLES_CMD_TIMELINE.TimelinePause = function () {
  Gui.gui.corePatch().timer.pause();
  Gui.gui.emitEvent(
    "timelineControl",
    "setPlay",
    false,
    Gui.gui.corePatch().timer.getTime(),
  );
};

CABLES_CMD_TIMELINE.togglePlay = function () {
  if (Gui.gui.corePatch().timer.isPlaying()) Gui.gui.corePatch().timer.pause();
  else Gui.gui.corePatch().timer.play();
};

CABLES_CMD_TIMELINE.openGlTimeline = function () {
  Gui.gui.glTimeLineTab = new GlTimelineTab(Gui.gui.bottomTabs);
};

CABLES_CMD_TIMELINE.toggleTimeline = function () {
  Gui.gui.toggleTimeline();
};

CABLES_CMD_TIMELINE.hideTimeline = function () {
  Gui.gui.hideTimeline();
};

CABLES_CMD_TIMELINE.showTimeline = function () {
  Gui.gui.showTiming();
};

timelineCommands.commands.push(
  {
    cmd: "toggle timeline",
    category: "ui",
    func: CABLES_CMD_TIMELINE.toggleTimeline,
    icon: "timeline",
  },
  {
    cmd: "show timeline",
    category: "ui",
    func: CABLES_CMD_TIMELINE.openGlTimeline,
    icon: "timeline",
  },
  {
    cmd: "hide timeline",
    category: "ui",
    func: CABLES_CMD_TIMELINE.hideTimeline,
    icon: "timeline",
  },
  {
    cmd: "timeline play",
    category: "ui",
    func: CABLES_CMD_TIMELINE.TimelinePlay,
    icon: "play",
  },
  {
    cmd: "timeline pause",
    category: "ui",
    func: CABLES_CMD_TIMELINE.TimelinePause,
    icon: "pause",
  },
  {
    cmd: "timeline rewind",
    category: "ui",
    func: CABLES_CMD_TIMELINE.TimelineRewind,
    icon: "rewind",
  },
  {
    cmd: "timeline forward",
    category: "ui",
    func: CABLES_CMD_TIMELINE.TimelineForward,
    icon: "fast-forward",
  },
  {
    cmd: "timeline rewind to 0",
    category: "ui",
    func: CABLES_CMD_TIMELINE.TimelineRewindStart,
    icon: "skip-back",
  },
  {
    cmd: "set timeline length",
    category: "timeline",
    func: CABLES_CMD_TIMELINE.setLength,
  },
  {
    cmd: "show all animated ports",
    category: "timeline",
    func: CABLES_CMD_TIMELINE.ListAnimatedPorts,
  },
  {
    cmd: "add new keyframe at cursor",
    category: "timeline",
    func: CABLES_CMD_TIMELINE.TimelineCreateKeyAtCursor,
  },
);
