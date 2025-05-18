import { ele } from "@cables/client";
import { Platform } from "./platform.js";
import CMD from "./commands/commands.js";
import OverlayMeshes from "./components/overlay/overlaymeshes.js";
import Collapsable from "./components/collapsable.js";
import DragNDrop from "./components/filemanager_dragdrop.js";
import setHtmlDefaultListeners from "./components/htmldefaultlisteners.js";
import UserSettings from "./components/usersettings.js";
import paramsHelper from "./components/opparampanel/params_helper.js";
import FindTab from "./components/tabs/tab_find.js";
import defaultOps from "./defaultops.js";
import GradientEditor from "./dialogs/gradienteditor.js";
import ModalDialog from "./dialogs/modaldialog.js";
import ModalError from "./dialogs/modalerror.js";
import oldModalWrap from "./dialogs/modal_old_wrap.js";
import { contextMenu } from "./elements/contextmenu.js";
import Tab from "./elements/tabpanel/tab.js";
import gluiconfig from "./glpatch/gluiconfig.js";
import UiOp from "./core_extend_op.js";
import PlatformCommunity from "./platform_community.js";
import PlatformElectron from "./platform_electron.js";
import PlatformPatchbay from "./platform_patchbay.js";
import startUi from "./startgui.js";
import text from "./text.js";
import LogFilter from "./utils/logfilter.js";
import undo from "./utils/undo.js";
import TabPortObjectInspect from "./components/tabs/tab_portobjectionspect.js";
import UiPatch from "./core_extend_patch.js";
import Gizmo from "./elements/canvasoverlays/transformgizmo.js";
import ModalSourceCode from "./dialogs/modalsourcecode.js";
import { showShaderError } from "./dialogs/modalshadererrorgl.js";
import { showShaderErrorCgp } from "./dialogs/modalshadererrorcgp.js";
import {
  CGL,
  CG,
  CGP,
  EMBED,
  WEBAUDIO,
  Link,
  Port,
  Patch,
  Timer,
  Variable,
  LoadingStatus,
  internalNow,
  now,
  Anim,
  AnimKey,
  utils,
  CgContext,
  CONSTANTS,
  glmatrix,
  Op,
  Profiler,
} from "@cables/cables";

window.glMatrix = glmatrix.glMatrix;
window.mat2 = glmatrix.mat2;
window.mat2d = glmatrix.mat2d;
window.mat3 = glmatrix.mat3;
window.mat4 = glmatrix.mat4;
window.quat = glmatrix.quat;
window.quat2 = glmatrix.quat2;
window.vec2 = glmatrix.vec2;
window.vec3 = glmatrix.vec3;
window.vec4 = glmatrix.vec4;

const CABLES = {};
window.CABLES = CABLES || {};

CABLES.CGL = CGL;
CABLES.CG = CG;
CABLES.CGP = CGP;
CABLES.EMBED = EMBED;
CABLES.Link = Link;
CABLES.Port = Port;
CABLES.Op = Op;
CABLES.Profiler = Profiler;
CABLES.Patch = Patch;
CABLES.Timer = Timer;
CABLES.WEBAUDIO = WEBAUDIO;
CABLES.Variable = Variable;
CABLES.LoadingStatus = LoadingStatus;
CABLES.now = now;
CABLES.internalNow = internalNow;
CABLES.Anim = Anim;
CABLES.AnimKey = AnimKey;

CABLES.shortId = utils.shortId;
CABLES.uuid = utils.uuid;
CABLES.getShortOpName = utils.getShortOpName;
CABLES.simpleId = utils.simpleId;
CABLES.clamp = utils.clamp;
CABLES.map = utils.map;
CABLES.shuffleArray = utils.shuffleArray;
CABLES.generateUUID = utils.generateUUID;
CABLES.prefixedHash = utils.prefixedHash;
CABLES.smoothStep = utils.smoothStep;
CABLES.smootherStep = utils.smootherStep;
CABLES.cacheBust = utils.cacheBust;
CABLES.copyArray = utils.copyArray;
CABLES.basename = utils.basename;
CABLES.logStack = utils.logStack;
CABLES.filename = utils.filename;
CABLES.ajaxSync = utils.ajaxSync;
CABLES.ajax = utils.ajax;
CABLES.request = utils.request;
CABLES.logErrorConsole = utils.logErrorConsole;
CABLES.isNumeric = utils.isNumeric;
CABLES.isArray = utils.isArray;
CABLES.float32Concat = utils.float32Concat;
CABLES.uniqueArray = utils.uniqueArray;
CABLES.CGState = CgContext;
CABLES.CgContext = CgContext;

/** @type {Array<Op>} */
CABLES.OPS = [];

Object.assign(
  CABLES,
  CONSTANTS.PORT,
  CONSTANTS.PACO,
  CONSTANTS.ANIM,
  CONSTANTS.OP,
);

CABLES.UI = CABLES.UI || {};
CABLES.GLGUI = CABLES.GLGUI || {};
CABLES.GLUI = CABLES.GLUI || {};
CABLES.UI.OPSELECT = CABLES.UI.OPSELECT || {};
CABLES.GLGUI.CURSOR_NORMAL = 0;
CABLES.GLGUI.CURSOR_HAND = 1;
CABLES.GLGUI.CURSOR_POINTER = 2;

CABLES.UI.userSettings = new UserSettings();

// create "mock" to load dependencies, specific class is set in footer.html
CABLES.PlatformElectron = PlatformElectron;
CABLES.PlatformPatchbay = PlatformPatchbay;
CABLES.PlatformCommunity = PlatformCommunity;
CABLES.platform = new Platform({
  urlCables: "",
  patchVersion: "",
});
// expose global classes
CABLES.GLUI.glUiConfig = gluiconfig; // todo: could be removed, needs workaround in gltf ops
CABLES.UI.TabPortObjectInspect = TabPortObjectInspect;

window.ele = ele;

CABLES.GradientEditor = GradientEditor;
CABLES.UI.Tab = Tab; // needs to stay - is used in ops
CABLES.UI.FindTab = FindTab; // move to command ?

CABLES.UI.DEFAULTOPNAMES = defaultOps.defaultOpNames;

CABLES.UI.DEFAULTOPS = defaultOps;
// expose global objects
CABLES.contextMenu = contextMenu; // TODO: delete when old timeline is replaced
CABLES.UI.Collapsable = Collapsable;

CABLES.UI.TEXTS = text;

CABLES.UI.ModalDialog = ModalDialog; // needs to stay - is used in ops
CABLES.UI.ModalError = ModalError;

// expose global functions

CABLES.DragNDrop = DragNDrop;

CABLES.CMD = CMD;

CABLES.UI.logFilter = new LogFilter();

CABLES.GL_MARKER = OverlayMeshes;
CABLES.UI.OverlayMeshes = OverlayMeshes;

CABLES.UI.paramsHelper = paramsHelper;

CABLES.UI.undo = undo;

CABLES.UI.MODAL = oldModalWrap;
CABLES.UI.Gizmo = Gizmo;
CABLES.UI.ModalSourceCode = ModalSourceCode;
CABLES.UI.showShaderError = showShaderError;
CABLES.UI.showShaderErrorCgp = showShaderErrorCgp;

setHtmlDefaultListeners();

CABLES.Op = UiOp;
CABLES.Patch = UiPatch;

CABLES.UI.startUi = startUi;

// added during webpack build
CABLES.UI.build = window.BUILD_INFO;
