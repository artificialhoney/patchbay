import { Logger } from "@cables/client";
import PatchbayEditor from "./editor.js";
import patchbayCommands from "./cmd.js";

/**
 * frontend class for cablesPatchbay
 * initializes the ui, starts the editor and adds functions custom to this platform
 */
export default class CablesPatchbay {
  constructor(patchbay, editorElement, settings) {
    this._logger = new Logger("patchbay");
    this._patchbay = patchbay;
    // this._importSync = importSync;
    this._editorElement = editorElement;

    this.ipcRenderer = this._patchbay.ipcRenderer; // needed to have ipcRenderer in patchbay_editor.js

    this._loadedModules = {};
    this._settings = settings;
  }

  /**
   * the `gui` object of the current editor, if initialized
   *
   * @type {Gui|null}
   */
  get gui() {
    return this.editorWindow ? this.editorWindow.gui : null;
  }

  /**
   * the current editor window, if initialized
   *
   * @type {{}|null}
   */
  get editorWindow() {
    return this._editorElement.contentWindow;
  }

  /**
   * the CABLES core instance of the current editor window, if initialized
   *
   * @type {{}|null}
   */
  get CABLES() {
    return this.editorWindow ? this.editorWindow.CABLES : null;
  }

  /**
   *
   * @type {Logger}
   */
  get _log() {
    CABLES.UI = this.CABLES.UI;
    return this._logger;
  }

  /**
   * initialize the editor, wait for core and ui to be ready, add
   * custom functionality
   */
  async init() {
    // this._settings =
    //   (await this.ipcRenderer.sendSync("platformSettings")) || {};

    // this._usersettings = this._settings.userSettings;
    // delete this._settings.userSettings;
    // this._config = (await this.ipcRenderer.sendSync("cablesConfig")) || {};
    // this._editorElement = null;

    // this._startUpLogItems =
    //   (await this.ipcRenderer.sendSync("getStartupLog")) || [];

    if (!this._settings.isPackaged)
      window.PATCHBAY_DISABLE_SECURITY_WARNINGS = true;

    let src = this._settings.uiIndexHtml + window.location.search;
    if (window.location.hash) {
      src += window.location.hash;
    }

    this._editorElement.src = src;
    this._editorElement.onload = () => {
      if (this.editorWindow) {
        if (this._settings.uiLoadStart)
          this.editorWindow.CABLESUILOADER.uiLoadStart -=
            this._settings.uiLoadStart;
        // this._startUpLogItems.forEach((logEntry) => {
        //   this._logStartup(logEntry.title);
        // });
        if (this.editorWindow.loadjs) {
          this.editorWindow.loadjs.ready(
            "cables_core",
            async () => await this._coreReady(),
          );
          this.editorWindow.loadjs.ready(
            "cablesuinew",
            async () => await this._uiReady(),
          );
        }
      }
    };

    window.addEventListener(
      "message",
      (event) => {
        if (event.data && event.data.type === "hashchange") {
          window.location.hash = event.data.data;
        }
      },
      false,
    );

    window.addEventListener(
      "hashchange",
      () => {
        if (this.editorWindow) {
          this.editorWindow.postMessage(
            { type: "hashchange", data: window.location.hash },
            "*",
          );
        }
      },
      false,
    );

    this.editor = new PatchbayEditor(
      {
        config: {
          ...this._settings,
        },
      },
      this._editorElement,
      this.ipcRenderer,
    );
  }

  openOpDirsTab() {
    if (this.CABLES) this.CABLES.platform.openOpDirsTab();
  }

  async _coreReady() {
    if (this.CABLES) {
      if (this.CABLES.Op) {
        const cablesPatchbay = this;
        this.CABLES.Op.prototype.require = async function (moduleName) {
          return await cablesPatchbay._opRequire(
            moduleName,
            this,
            cablesPatchbay,
          );
        };
      }
    }
  }

  _uiReady() {
    if (this.CABLES) {
      this.CABLES.UI.DEFAULTOPNAMES.defaultOpFallback =
        this.CABLES.UI.DEFAULTOPNAMES.HttpRequest;
      this.CABLES.CMD.PATCHBAY = patchbayCommands.functions;
      this.CABLES.CMD.commands = this.CABLES.CMD.commands.concat(
        patchbayCommands.commands,
      );
      Object.assign(
        this.CABLES.CMD.PATCH,
        patchbayCommands.functionOverrides.PATCH,
      );
      Object.assign(
        this.CABLES.CMD.RENDERER,
        patchbayCommands.functionOverrides.RENDERER,
      );
      const commandOverrides = patchbayCommands.commandOverrides;
      this.CABLES.CMD.commands.forEach((command) => {
        const commandOverride = commandOverrides.find((override) => {
          return override.cmd === command.cmd;
        });
        if (commandOverride) {
          Object.assign(command, commandOverride);
        }
      });
    }
  }

  async _opRequire(moduleName, op, thisClass) {
    if (op) op.setUiError("oprequire", null);
    if (moduleName === "patchbay") return thisClass._patchbay;
    if (this._loadedModules[moduleName]) return this._loadedModules[moduleName];

    let modulePath = null;
    let moduleFile = null;

    try {
      // load module by directory name
      modulePath = await this._patchbay.ipcRenderer.sendSync("getOpModuleDir", {
        opName: op.objName,
        opId: op.opId,
        moduleName: moduleName,
      });
      this._loadedModules[moduleName] = await import(
        /* @vite-ignore */ modulePath
      );
      return this._loadedModules[moduleName];
    } catch (ePath) {
      try {
        // load module by resolved filename from package.json
        moduleFile = await this._patchbay.ipcRenderer.sendSync(
          "getOpModuleLocation",
          {
            opName: op.objName,
            opId: op.opId,
            moduleName: moduleName,
          },
        );
        this._loadedModules[moduleName] = await import(
          /* @vite-ignore */ moduleFile
        );
        return this._loadedModules[moduleName];
      } catch (eFile) {
        try {
          // load module by module name
          this._loadedModules[moduleName] = await import(
            /* @vite-ignore */ moduleName
          );
          return this._loadedModules[moduleName];
        } catch (eName) {
          try {
            moduleFile = await this._patchbay.ipcRenderer.sendSync(
              "getOpModuleLocation",
              {
                opName: op.objName || op.name,
                opId: op.opId,
                moduleName: moduleName,
              },
            );
            this._loadedModules[moduleName] = await import(
              /* @vite-ignore */ moduleFile
            );
            return this._loadedModules[moduleName];
          } catch (eImport) {
            let errorMessage =
              "failed to load node module: " + moduleName + "\n\n";
            if (op) op.setUiError("oprequire", errorMessage);
            this._log.error(errorMessage, modulePath, moduleFile);
            return {};
          }
        }
      }
    }
  }

  _logStartup(title) {
    if (this.editorWindow && this.editorWindow.logStartup)
      this.editorWindow.logStartup(title);
  }

  _incrementStartup() {
    if (this.editorWindow && this.editorWindow.logStartup)
      this.editorWindow.incrementStartup();
  }
}
