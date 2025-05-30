import { Events, Logger, ele } from "@cables/client";

import { FpsCounter } from "@cables/cables";
import { getHandleBarHtml } from "../utils/handlebars.js";
import { glTlAnimLine } from "./gltlanimline.js";
import { glTlRuler } from "./gltlruler.js";
import { glTlScroll } from "./gltlscroll.js";
import { GlTlView } from "./gltlview.js";
import Gui from "../gui.js";
import { notify, notifyWarn } from "../elements/notification.js";
import UserSettings from "../components/usersettings.js";
import GlRectInstancer from "../gldraw/glrectinstancer.js";
import GlSplineDrawer from "../gldraw/glsplinedrawer.js";
import GlTextWriter from "../gldraw/gltextwriter.js";
import undo from "../utils/undo.js";

/**
 * @typedef TlConfig
 * @property {Number} fps
 * @property {Number} [duration]
 * @property {Number} bpm
 * @property {Boolean} fadeInFrames
 * @property {Boolean} showBeats
 * @property {String} displayUnits
 * @property {Boolean} restrictToFrames
 */

/**
 * gl timeline
 *
 * @export
 * @class GlTimeline
 * @extends {Events}
 */
export class GlTimeline extends Events {
  activateAllAnims() {
    throw new Error("Method not implemented.");
  }

  /** @type {GlTextWriter} */
  texts = null;

  /** @type {GlSplineDrawer} */
  splines;

  /** @type {GlRectInstancer} */
  #rects = null;

  /** @type {GlRectInstancer} */
  #rectsOver = null;

  /** @type {glTlRuler} */
  ruler = null;

  /** @type {glTlScroll} */
  scroll = null;

  /** @type {Array<glTlAnimLine>} */
  #tlAnims = [];

  /** @type {GlRect} */
  #glRectCursor;

  duration = 120;

  displayUnits = "Seconds";

  /** @type {GlRect} */
  // #timeBg;

  /** @type {GlRect} */
  #rectSelect;

  /** @type {GlTlView} */
  view = null;
  needsUpdateAll = true;

  static LAYOUT_LINES = 0;
  static LAYOUT_GRAPHS = 1;
  #layout = GlTimeline.LAYOUT_LINES;

  /** @type {Array<AnimKey>} */
  #selectedKeys = [];

  hoverKeyRect = null;
  disposed = false;

  #oldhtml = "";
  #canvasMouseDown = false;
  #paused = false;

  /** @type {CglContext} */
  #cgl = null;
  #isAnimated = false;
  buttonForScrolling = 2;
  toParamKeys = null;

  /** @type {TlConfig} */
  cfg = {
    fps: 30,
    bpm: 180,
    fadeInFrames: true,
    showBeats: true,
    displayUnits: "Seconds",
    restrictToFrames: true,
  };

  #selOpsStr = "";
  #lastXnoButton = 0;
  #lastYnoButton = 0;

  selectRect = null;
  #selectedKeyAnims = [];
  #firstInit = true;
  #focusRuler = false;
  #focusScroll = false;
  #keyOverEl;
  #tlTimeDisplay;

  #perfFps = new FpsCounter();
  #filterInputEl;
  #filterString = "";

  /**
   * @param {CglContext} cgl
   */
  constructor(cgl) {
    super();

    this._log = new Logger("gltimeline");

    this.#cgl = cgl;
    this.view = new GlTlView(this);

    this.#layout =
      UserSettings.userSettings.get("gltl_layout") || GlTimeline.LAYOUT_LINES;

    this.texts = new GlTextWriter(cgl, { name: "mainText", initNum: 1000 });
    this.#rects = new GlRectInstancer(cgl, {
      name: "gltl rects",
      allowDragging: true,
    });

    this.#rectsOver = new GlRectInstancer(cgl, {
      name: "gltl rects",
      allowDragging: true,
    });

    this.ruler = new glTlRuler(this);

    this.scroll = new glTlScroll(this);

    this.#glRectCursor = this.#rectsOver.createRect({
      draggable: true,
      interactive: true,
    });
    this.#glRectCursor.setSize(1, cgl.canvasHeight);
    this.#glRectCursor.setPosition(0, 0, -1.0);
    this.setColorRectSpecial(this.#glRectCursor);

    // this.#timeBg = this.#rects.createRect({ });
    // this.#timeBg.setSize(this.titleSpace, this.ruler.height + this.scroll.height);
    // this.#timeBg.setColor(0.15, 0.15, 0.15, 1);
    // this.#timeBg.setPosition(0, 0, -0.5);

    this.#rectSelect = this.#rectsOver.createRect({
      draggable: true,
      interactive: true,
    });
    this.#rectSelect.setSize(0, 0);
    this.#rectSelect.setPosition(0, 0, -0.9);
    this.#rectSelect.setColorArray(
      Gui.gui.theme.colors_patch.patchSelectionArea,
    );

    Gui.gui.corePatch().timer.on("playPause", () => {
      gui
        .corePatch()
        .timer.setTime(this.snapTime(Gui.gui.corePatch().timer.getTime()));
    });

    cgl.canvas.classList.add("cblgltimelineEle");
    cgl.canvas.addEventListener(
      "pointermove",
      this._onCanvasMouseMove.bind(this),
      { passive: false },
    );
    cgl.canvas.addEventListener("pointerup", this._onCanvasMouseUp.bind(this), {
      passive: false,
    });
    cgl.canvas.addEventListener(
      "pointerdown",
      this._onCanvasMouseDown.bind(this),
      { passive: false },
    );
    cgl.canvas.addEventListener("wheel", this._onCanvasWheel.bind(this), {
      passive: true,
    });
    cgl.addEventListener("resize", this.resize.bind(this));

    Gui.gui.corePatch().on("timelineConfigChange", this.onConfig.bind(this));

    Gui.gui.corePatch().on(CABLES.Patch.EVENT_OP_DELETED, () => {
      this.init();
    });
    Gui.gui.corePatch().on(CABLES.Patch.EVENT_OP_ADDED, () => {
      this.init();
    });
    Gui.gui.corePatch().on("portAnimToggle", () => {
      this.init();
    });

    this.#keyOverEl = document.createElement("div");
    this.#keyOverEl.classList.add("keyOverlay");
    this.#keyOverEl.classList.add("hidden");
    cgl.canvas.parentElement.appendChild(this.#keyOverEl);

    this.#filterInputEl = document.createElement("input");
    this.#filterInputEl.classList.add("filterInput");
    this.#filterInputEl.setAttribute("placeholder", "filter...");
    cgl.canvas.parentElement.appendChild(this.#filterInputEl);

    this.#filterInputEl.addEventListener("input", () => {
      this.#filterString = this.#filterInputEl.value;
      this.init();
    });

    this.#tlTimeDisplay = document.createElement("div");
    this.#tlTimeDisplay.classList.add("tltimedisplay");
    cgl.canvas.parentElement.appendChild(this.#tlTimeDisplay);

    Gui.gui.keys.key("c", "Center cursor", "down", cgl.canvas.id, {}, () => {
      this.view.centerCursor();
    });

    Gui.gui.keys.key(
      "f",
      "zoom to all or selected keys",
      "down",
      cgl.canvas.id,
      {},
      () => {
        if (this.getNumSelectedKeys() == 1) {
        } else if (this.getNumSelectedKeys() > 1) {
          this.zoomToFitSelection();
        } else {
          this.selectAllKeys();
          this.zoomToFitSelection();
          this.unSelectAllKeys();
        }
      },
    );

    Gui.gui.keys.key(
      "j",
      "Go to previous keyframe",
      "down",
      cgl.canvas.id,
      {},
      () => {
        this.jumpKey(-1);
      },
    );
    Gui.gui.keys.key(
      "k",
      "Go to next keyframe",
      "down",
      cgl.canvas.id,
      {},
      () => {
        this.jumpKey(1);
      },
    );

    Gui.gui.keys.key(
      "delete",
      "delete selected keys",
      "down",
      cgl.canvas.id,
      {},
      () => {
        this.deleteSelectedKeys();
        this.needsUpdateAll = true;
      },
    );

    Gui.gui.keys.key(
      "backspace",
      "delete selected keys",
      "down",
      cgl.canvas.id,
      {},
      () => {
        this.deleteSelectedKeys();
        this.needsUpdateAll = true;
      },
    );

    Gui.gui.keys.key(
      "a",
      "Select all keys",
      "down",
      cgl.canvas.id,
      { cmdCtrl: true },
      (_e) => {
        this.selectAllKeys();
      },
    );

    /// ///////////////////

    Gui.gui.on("opSelectChange", () => {
      for (let i = 0; i < this.#tlAnims.length; i++) this.#tlAnims[i].update();
      this.needsUpdateAll = true;
    });

    Gui.gui.patchView.patchRenderer.on("selectedOpsChanged", () => {
      let selops = Gui.gui.patchView.getSelectedOps();

      if (selops.length == 0) return;
      let isAnimated = false;
      for (let i = 0; i < selops.length; i++)
        if (selops[i].isAnimated()) isAnimated = true;

      if (!isAnimated) return;

      let selOpsStr = "";
      for (let i = 0; i < selops.length; i++) selOpsStr += selops[i].id;

      this.needsUpdateAll = true;
      if (
        this.#layout == GlTimeline.LAYOUT_GRAPHS &&
        selOpsStr != this.#selOpsStr
      ) {
        this.init();
        this.#selOpsStr = selOpsStr;
      }
    });
    Gui.gui.glTimeline = this;

    this.init();
    this._initUserPrefs();
  }

  _initUserPrefs() {
    const userSettingScrollButton = UserSettings.userSettings.get(
      "patch_button_scroll",
    );
    this.buttonForScrolling = userSettingScrollButton || 2;
  }

  /** @returns {number} */
  get bpm() {
    return this.cfg.bpm;
  }

  /** @returns {number} */
  get fps() {
    return this.cfg.fps;
  }

  get layout() {
    return this.#layout;
  }

  get rects() {
    return this.#rects;
  }

  get isAnimated() {
    return !this.view.animsFinished;
  }

  get cursorTime() {
    return Gui.gui.corePatch().timer.getTime();
  }

  parentElement() {
    return this.#cgl.canvas.parentElement;
  }

  resize() {
    this.scroll.setWidth(this.#cgl.canvasWidth);
    this.ruler.setWidth(this.#cgl.canvasWidth);

    for (let i = 0; i < this.#tlAnims.length; i++)
      this.#tlAnims[i].setWidth(this.#cgl.canvasWidth);

    this.needsUpdateAll = true;
  }

  /**
   * @param {number} time
   */
  snapTime(time) {
    if (this.cfg.restrictToFrames)
      time = Math.floor(time * this.fps) / this.fps;
    return time;
  }

  toggleGraphLayout() {
    if (this.#layout == GlTimeline.LAYOUT_GRAPHS)
      this.#layout = GlTimeline.LAYOUT_LINES;
    else this.#layout = GlTimeline.LAYOUT_GRAPHS;

    UserSettings.userSettings.set("gltl_layout", this.#layout);

    this.updateIcons();
    this.init();
  }

  updateIcons() {
    ele.byId("togglegraph1").parentElement.classList.remove("button-active");
    ele.byId("togglegraph2").parentElement.classList.remove("button-active");
    ele.byId("zoomgraph1").parentElement.classList.remove("button-inactive");
    ele.byId("zoomgraph2").parentElement.classList.remove("button-inactive");

    if (this.#layout == GlTimeline.LAYOUT_GRAPHS) {
      ele.byId("togglegraph1").parentElement.classList.add("button-active");
    } else {
      ele.byId("togglegraph2").parentElement.classList.add("button-active");
      ele.byId("zoomgraph1").parentElement.classList.add("button-inactive");
      ele.byId("zoomgraph2").parentElement.classList.add("button-inactive");
    }
  }

  setanim() {}

  getColorSpecial() {
    return [0.02745098039215691, 0.968627450980392, 0.5490196078431373, 1];
  }

  /**
   * @param {GlRect|GlText|GlSpline} rect
   */
  setColorRectSpecial(rect) {
    if (rect) rect.setColorArray(this.getColorSpecial());
  }

  /**
   * @param {PointerEvent} e
   */
  _onCanvasMouseDown(e) {
    if (!e.pointerType) return;
    this.#focusRuler = false;
    this.#focusScroll = false;
    if (this.ruler.isHovering()) this.#focusRuler = true;
    if (this.scroll.isHovering()) this.#focusScroll = true;

    if (this.#focusRuler) {
      this.ruler.setTimeFromPixel(e.offsetX);
    } else if (this.#focusScroll) {
    } else {
      if (!this.selectRect && e.buttons == 1)
        if (this.hoverKeyRect == null && !e.shiftKey)
          if (e.offsetY > this.getFirstLinePosy()) this.unSelectAllKeys();

      try {
        this.#cgl.canvas.setPointerCapture(e.pointerId);
      } catch (er) {
        this._log.log(er);
      }

      this.#rects.mouseDown(e, e.offsetX, e.offsetY);
    }

    this.mouseDown = true;
  }

  /**
   * @param {MouseEvent} event
   */
  _onCanvasMouseMove(event) {
    this.emitEvent("mousemove", event);

    let x = event.offsetX;
    let y = event.offsetY;
    this.#rects.mouseMove(x, y, event.buttons, event);

    if (event.buttons == 1) {
      if (event.ctrlKey || event.metaKey) {
        for (let i = 0; i < this.#tlAnims.length; i++) {
          if (this.#tlAnims[i].isHovering()) {
            const t = this.snapTime(
              this.view.pixelToTime(x) + this.view.timeLeft,
            );
            this.#tlAnims[i].anims[0].setValue(
              t,
              this.#tlAnims[i].anims[0].getValue(t),
            );
          }
        }
      }

      if (!this.#focusRuler && !this.#focusScroll) {
        if (this.hoverKeyRect && !this.selectRect) {
        } else {
          if (y > this.getFirstLinePosy()) {
            if (!event.shiftKey) this.unSelectAllKeys();

            this.selectRect = {
              x: Math.min(this.#lastXnoButton, x),
              y: Math.min(this.#lastYnoButton, y),
              x2: Math.max(this.#lastXnoButton, x),
              y2: Math.max(this.#lastYnoButton, y),
            };

            this.#rectSelect.setPosition(
              this.#lastXnoButton,
              this.#lastYnoButton,
              -1,
            );
            this.#rectSelect.setSize(
              x - this.#lastXnoButton,
              y - this.#lastYnoButton,
            );
          }
        }

        this.updateAllElements();

        this.showKeyParamsSoon();
      }
    } else if (event.buttons == this.buttonForScrolling) {
      this.view.scroll(-this.view.pixelToTime(event.movementX) * 4);
      this.view.scrollY(event.movementY);
      this.updateAllElements();
    } else {
      this.#lastXnoButton = x;
      this.#lastYnoButton = y;
    }
  }

  /**
   * @param {AnimKey} k
   * @returns {boolean}
   */
  isKeySelected(k) {
    return this.#selectedKeys.indexOf(k) != -1;
  }

  /**
   * @param {Array<AnimKey>} keys
   * @returns {Number}
   */
  getKeysSmallestTime(keys) {
    let minTime = 9999999;
    for (let i = 0; i < keys.length; i++)
      minTime = Math.min(minTime, keys[i].time);

    return minTime;
  }

  getNumSelectedKeys() {
    return this.#selectedKeys.length;
  }

  /**
   * @param {Number} time
   */
  moveSelectedKeys(time = this.cursorTime) {
    let minTime = time - this.getKeysSmallestTime(this.#selectedKeys);
    this.moveSelectedKeysDelta(minTime);
    this.needsUpdateAll = true;
  }

  /**
   * @param {Number} easing
   */
  setSelectedKeysEasing(easing) {
    for (let i = 0; i < this.#selectedKeys.length; i++)
      this.#selectedKeys[i].set({ e: easing });

    this.needsUpdateAll = true;
  }

  /**
   * @param {Number} time
   */
  setSelectedKeysTime(time = this.cursorTime) {
    for (let i = 0; i < this.#selectedKeys.length; i++)
      this.#selectedKeys[i].set({ time: time });

    this.needsUpdateAll = true;
  }

  /**
   * @param {boolean} [newId]
   */
  serializeSelectedKeys(newId) {
    const keys = [];
    for (let i = 0; i < this.#selectedKeys.length; i++) {
      const o = this.#selectedKeys[i].getSerialized();
      o.id = this.#selectedKeys[i].id;
      o.animName = this.#selectedKeyAnims[i].name;
      o.animId = this.#selectedKeyAnims[i].id;

      if (newId) o.id = CABLES.shortId();
      keys.push(o);
    }

    return keys;
  }

  /**
   * @param {number} deltaTime
   * @param {number} deltaValue
   */
  moveSelectedKeysDelta(deltaTime, deltaValue = 0) {
    if (deltaTime == 0 && deltaValue == 0) return;
    for (let i = 0; i < this.#selectedKeys.length; i++) {
      this.#selectedKeys[i].set({
        time: this.#selectedKeys[i].time + deltaTime,
        value: this.#selectedKeys[i].value + deltaValue,
      });
    }

    this.needsUpdateAll = true;
  }

  getSelectedKeysBoundsValue() {
    let min = 999999;
    let max = -999999;
    for (let i = 0; i < this.#selectedKeys.length; i++) {
      min = Math.min(min, this.#selectedKeys[i].value);
      max = Math.max(max, this.#selectedKeys[i].value);
    }
    return { min: min, max: max };
  }

  getSelectedKeysBoundsTime() {
    let min = 999999;
    let max = -999999;
    for (let i = 0; i < this.#selectedKeys.length; i++) {
      min = Math.min(min, this.#selectedKeys[i].time);
      max = Math.max(max, this.#selectedKeys[i].time);
    }
    return { min: min, max: max, length: Math.abs(max) - Math.abs(min) };
  }

  showKeyParamsSoon() {
    clearTimeout(this.toParamKeys);
    this.toParamKeys = setTimeout(() => {
      this.showKeyParams();
    }, 100);
  }

  unSelectAllKeys() {
    this.#selectedKeys = [];
    this.#selectedKeyAnims = [];
    this.showKeyParamsSoon();
  }

  selectAllKeys() {
    if (this.disposed) return;
    for (let i = 0; i < this.#tlAnims.length; i++) {
      for (let j = 0; j < this.#tlAnims[i].anims.length; j++) {
        for (let k = 0; k < this.#tlAnims[i].anims[j].keys.length; k++) {
          this.selectKey(
            this.#tlAnims[i].anims[j].keys[k],
            this.#tlAnims[i].anims[j],
          );
        }
      }
    }
    this.needsUpdateAll = true;
  }

  deleteSelectedKeys() {
    if (this.disposed) return;
    const oldKeys = this.serializeSelectedKeys();
    const gltl = this;
    undo.add({
      title: "timeline move keys",
      undo() {
        gltl.deserializeKeys(oldKeys);
      },
      redo() {},
    });

    for (let i = 0; i < this.#selectedKeys.length; i++)
      this.#selectedKeyAnims[i].remove(this.#selectedKeys[i]);

    this.unSelectAllKeys();
  }

  /**
   * @param {AnimKey} k
   * @param {Anim} a
   *
   */
  selectKey(k, a) {
    if (a.tlActive && !this.isKeySelected(k)) {
      this.#selectedKeys.push(k);
      this.#selectedKeyAnims.push(a);
    }
    this.showKeyParamsSoon();
  }

  /**
   * @param {MouseEvent} e
   */
  _onCanvasMouseUp(e) {
    this.#rects.mouseUp(e);
    this.mouseDown = false;
    this.hoverKeyRect = null;
    this.selectRect = null;
    this.#rectSelect.setSize(0, 0);
  }

  /**
   * @param {WheelEvent} event
   */
  _onCanvasWheel(event) {
    this.pixelPerSecond = this.view.timeToPixel(1);

    if (event.metaKey) {
      this.view.scroll(this.view.visibleTime * event.deltaY * 0.0005);
    } else if (event.shiftKey) {
      this.view.scale(event.deltaX * 0.003);
    } else if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
      let delta = 0;
      if (event.deltaY < 0) delta = 1.1;
      else delta = 0.9;

      this.view.setZoomOffset(delta);
    }

    this.needsUpdateAll = true;
  }

  get width() {
    return this.#cgl.canvasWidth;
  }

  init() {
    if (this.disposed) return;
    const perf = Gui.gui.uiProfiler.start("[gltimeline] init");

    this.splines = new GlSplineDrawer(this.#cgl, "gltlSplines_0");
    this.splines.setWidth(2);
    this.splines.setFadeout(false);

    for (let i = 0; i < this.#tlAnims.length; i++) this.#tlAnims[i].dispose();
    this.#tlAnims = [];

    let ops = [];
    let count = 0;
    const ports = [];

    let selops = Gui.gui.patchView.getSelectedOps();
    if (this.#layout == GlTimeline.LAYOUT_LINES) ops = Gui.gui.corePatch().ops;

    // if (this.#layout == GlTimeline.LAYOUT_GRAPHS && selops.length > 0) ops = selops;
    // if (this.#layout == GlTimeline.LAYOUT_GRAPHS && this.#firstInit)ops = i
    ops = Gui.gui.corePatch().ops;

    this.#firstInit = false;

    for (let i = 0; i < ops.length; i++) {
      const op = ops[i];
      for (let j = 0; j < op.portsIn.length; j++) {
        if (op.portsIn[j].anim) {
          if (this.filter(op.portsIn[j])) {
            ports.push(op.portsIn[j]);

            if (this.#layout === GlTimeline.LAYOUT_LINES) {
              const a = new glTlAnimLine(this, [op.portsIn[j]]);
              this.#tlAnims.push(a);
            }
            count++;
          }
        }
      }
    }

    if (this.#layout === GlTimeline.LAYOUT_GRAPHS) {
      const multiAnim = new glTlAnimLine(this, ports, {
        keyYpos: true,
        multiAnims: true,
      });
      multiAnim.setHeight(this.#cgl.canvasHeight - this.getFirstLinePosy());
      multiAnim.setPosition(0, this.getFirstLinePosy());
      this.#tlAnims.push(multiAnim);
    }

    this.updateAllElements();
    this.setPositions();
    this.resize();
    this.updateIcons();

    perf.finish();
  }

  /**
   * @param {Port} port
   */
  filter(port) {
    if (
      port.op.shortName.toLowerCase().includes(this.#filterString) ||
      (port.op.uiAttribs.comment || "")
        .toLowerCase()
        .includes(this.#filterString) ||
      port.name.toLowerCase().includes(this.#filterString)
    )
      return true;

    return false;
  }

  getFirstLinePosy() {
    let posy = 0;

    this.scroll.setPosition(0, posy);
    posy += this.scroll.height;

    this.ruler.setPosition(0, posy);
    posy += this.ruler.height;
    return posy;
  }

  setPositions() {
    if (this.disposed) return;
    let posy = this.getFirstLinePosy();

    for (let i = 0; i < this.#tlAnims.length; i++) {
      this.#tlAnims[i].setPosition(0, posy);
      posy += this.#tlAnims[i].height;
    }
  }

  dispose() {
    if (this.disposed) return;
    this.disposed = true;

    if (this.#rects) this.#rects = this.#rects.dispose();
  }

  updateSize() {
    if (this.disposed) return;
    this.setPositions();
    // this.updateAllElements();
    this.needsUpdateAll = true;
  }

  /**
   * @param {number} resX
   * @param {number} resY
   */
  render(resX, resY) {
    this.#perfFps.startFrame();

    if (!Gui.gui.bottomTabPanel.isMinimized()) {
      if (this.disposed) return;
      this.view.updateAnims();

      if (!this.view.animsFinished || this.needsUpdateAll)
        this.updateAllElements();

      this.udpateCursor();
      this.#cgl.gl.clearColor(0.2, 0.2, 0.2, 1);
      this.#cgl.gl.clear(
        this.#cgl.gl.COLOR_BUFFER_BIT | this.#cgl.gl.DEPTH_BUFFER_BIT,
      );

      this.#cgl.pushDepthTest(true);

      this.#rects.render(resX, resY, -1, 1, resX / 2);
      this.texts.render(resX, resY, -1, 1, resX / 2);
      this.splines.render(
        resX,
        resY,
        -1,
        1,
        resX / 2,
        this.#lastXnoButton,
        this.#lastYnoButton,
      );
      this.#rectsOver.render(resX, resY, -1, 1, resX / 2);

      this.#cgl.popDepthTest();
    }
    this.#perfFps.endFrame();
  }

  udpateCursor() {
    this.#glRectCursor.setPosition(
      this.view.timeToPixelScreen(this.cursorTime),
      0,
    );

    let s = "" + Math.round(this.cursorTime * 1000) / 1000;
    const parts = s.split(".");
    parts[1] = parts[1] || "000";
    while (parts[1].length < 3) parts[1] += "0";

    let html = "";
    html += "frame " + Math.floor(this.cursorTime * this.fps) + " ";
    html += "second " + parts[0] + "." + parts[1] + "<br>";

    if (this.cfg.showBeats)
      html += "beat " + Math.floor(this.cursorTime * (this.bpm / 60)) + "<br>";

    if (this.#oldhtml != html) {
      this.#tlTimeDisplay.innerHTML = html;
      this.#oldhtml = html;
    }
  }

  updateAllElements() {
    const perf = Gui.gui.uiProfiler.start("[gltimeline] udpateAllElements");

    this.ruler.update();
    this.scroll.update();
    for (let i = 0; i < this.#tlAnims.length; i++) this.#tlAnims[i].update();
    this.#glRectCursor.setSize(1, this.#cgl.canvasHeight);
    this.udpateCursor();

    if (this.#layout === GlTimeline.LAYOUT_GRAPHS && this.#tlAnims[0])
      this.#tlAnims[0].setHeight(
        this.#cgl.canvasHeight - this.getFirstLinePosy(),
      );

    perf.finish();
  }

  /** @param {TlConfig} cfg */
  onConfig(cfg) {
    this.cfg = cfg;
    this.duration = cfg.duration;
    this.displayUnits = cfg.displayUnits;
    this.updateAllElements();
  }

  /**
   * @param {number} dir 1 or -1
   */
  jumpKey(dir) {
    let theKey = null;

    for (let anii = 0; anii < this.#tlAnims.length; anii++) {
      for (let ans = 0; ans < this.#tlAnims[anii].anims.length; ans++) {
        const anim = this.#tlAnims[anii].anims[ans];
        const index = 0;

        for (let ik = 0; ik < anim.keys.length; ik++) {
          if (ik < 0) continue;
          let newIndex = ik;

          if (anim.keys[newIndex].time != this.view.cursorTime) {
            if (dir == 1 && anim.keys[newIndex].time > this.view.cursorTime) {
              if (!theKey) theKey = anim.keys[newIndex];
              if (anim.keys[newIndex].time < theKey.time)
                theKey = anim.keys[newIndex];
            }

            if (dir == -1 && anim.keys[newIndex].time < this.view.cursorTime) {
              if (!theKey) theKey = anim.keys[newIndex];
              if (anim.keys[newIndex].time > theKey.time)
                theKey = anim.keys[newIndex];
            }
          }
        }
      }
    }

    if (theKey) {
      Gui.gui.corePatch().timer.setTime(theKey.time);
      if (theKey.time > this.view.timeRight || theKey.time < this.view.timeLeft)
        this.view.centerCursor();
    }
  }

  zoomToFitSelection() {
    const bounds = this.getSelectedKeysBoundsTime();
    console.log(bounds);
    this.view.setZoomLength(bounds.length + 1);
    this.view.scrollTo(bounds.min - 0.5);
    this.view.scrollToY(0);
    for (let anii = 0; anii < this.#tlAnims.length; anii++)
      this.#tlAnims[anii].fitValues();
  }

  showKeyParams() {
    const timebounds = this.getSelectedKeysBoundsTime();
    const valbounds = this.getSelectedKeysBoundsValue();
    let timestr = " (" + Math.round(timebounds.length * 100) / 100 + "s)";
    let valstr =
      " (" +
      Math.round(valbounds.min * 100) / 100 +
      " - " +
      Math.round(valbounds.max * 100) / 100 +
      ")";

    if (this.#selectedKeys.length == 0) {
      this.#keyOverEl.classList.add("hidden");
      ele.byId("tlselectinfo").innerHTML = "";
    } else {
      this.#keyOverEl.classList.remove("hidden");
      ele.byId("tlselectinfo").innerHTML =
        "" +
        this.#selectedKeys.length +
        " keys selected " +
        timestr +
        " " +
        valstr;
    }

    const html = getHandleBarHtml("params_keys", {
      numKeys: this.#selectedKeys.length,
      timeBounds: timebounds,
      valueBounds: valbounds,
    });
    this.#keyOverEl.innerHTML = html;
  }

  /**
   * @param {ClipboardEvent} event
   */
  copy(event = null) {
    const obj = { keys: this.serializeSelectedKeys(true) };

    if (event) {
      const objStr = JSON.stringify(obj);
      event.clipboardData.setData("text/plain", objStr);
      event.preventDefault();
    }
    return obj;
  }

  /**
   * @param {ClipboardEvent} event
   */
  cut(event) {
    this.copy(event);
    this.deleteSelectedKeys();
  }

  /**
   * @param {Array<Object>} keys
   * @param {Object} options
   */
  deserializeKeys(keys, options = {}) {
    const useId = options.useId || false;
    const setCursorTime = options.setCursorTime || false;

    let minTime = Number.MAX_VALUE;
    for (let i in keys) {
      minTime = Math.min(minTime, keys[i].t);
    }

    let notfoundallAnims = false;
    let newKeys = [];

    for (let i = 0; i < keys.length; i++) {
      const k = keys[i];
      if (setCursorTime) k.t = k.t - minTime + this.cursorTime;

      let found = false;
      for (let j = 0; j < this.#tlAnims.length; j++) {
        let an = null;
        if (k.animId) an = this.#tlAnims[j].getAnimById(k.animId);

        if (an) {
          const l = new CABLES.AnimKey(keys[i], an);

          newKeys.push(l);
          an.addKey(l);
          found = true;
        }
      }

      if (!found) notfoundallAnims = true;
    }
    return { keys: newKeys, notfoundallAnims: notfoundallAnims };
  }

  /**
   * @param {ClipboardEvent} e
   */
  paste(e) {
    if (e.clipboardData.types.indexOf("text/plain") > -1) {
      e.preventDefault();

      const str = e.clipboardData.getData("text/plain");

      e.preventDefault();

      const json = JSON.parse(str);
      if (json) {
        if (json.keys) {
          const deser = this.deserializeKeys(json.keys, {
            setCursorTime: true,
          });
          const notfoundallAnims = deser.notfoundallAnims;

          if (notfoundallAnims) {
            notifyWarn("could not find all anims for pasted keys");
          } else {
            notify(json.keys.length + " keys pasted");
          }

          const animPorts = Gui.gui.corePatch().getAllAnimPorts();
          for (let i = 0; i < animPorts.length; i++) {
            if (animPorts[i].anim) animPorts[i].anim.removeDuplicates();
          }

          console.log(json.keys);
          this.needsUpdateAll = true;

          return;
        }
      }
      CABLES.UI.notify("Paste failed");
    }
  }

  /** @returns {boolean} */
  isFocused() {
    // todo
    return true;
  }

  duplicateSelectedKeys() {
    const o = this.copy();

    const newKeys = this.deserializeKeys(o.keys, false).keys;

    undo.add({
      title: "timeline duplicate keys",
      undo() {
        for (let i = 0; i < newKeys.length; i++) {
          console.log("delete...dupes");
          newKeys[i].delete();
        }
        // key.set(oldValues);
      },
      redo() {},
    });
  }

  getDebug() {
    const o = {
      layout: this.#layout,
      tlAnims: [],
      view: this.view.getDebug(),
      perf: this.#perfFps.stats,
    };

    for (let anii = 0; anii < this.#tlAnims.length; anii++)
      o.tlAnims.push(this.#tlAnims[anii].getDebug());

    return o;
  }

  createKeyAtCursor() {
    for (let i = 0; i < this.#tlAnims.length; i++) {
      const t = this.cursorTime;
      this.#tlAnims[i].anims[0].setValue(
        t,
        this.#tlAnims[i].anims[0].getValue(t),
      );
    }
  }

  toggle() {
    Gui.gui.bottomTabPanel.toggle(true);
  }

  deactivateAllAnims(v = false) {
    for (let anii = 0; anii < this.#tlAnims.length; anii++) {
      for (let ans = 0; ans < this.#tlAnims[anii].anims.length; ans++) {
        const anim = this.#tlAnims[anii].anims[ans];
        anim.tlActive = v;
      }
      this.#tlAnims[anii].updateTitles();
    }
  }
}
