import { Logger } from "@cables/client";
import PatchbayEditor from "./editor.js";
import patchbayCommands from "./cmd.js";

/**
 * frontend class for cablesPatchbay
 * initializes the ui, starts the editor and adds functions custom to this platform
 */
export default class CablesPatchbay {
  static cablesPatchbay = null;
  constructor(patchbay, editorElement) {
    CablesPatchbay.cablesPatchbay = this;

    this._logger = new Logger("patchbay");
    this._patchbay = patchbay;
    // this._importSync = importSync;
    this._editorElement = editorElement;

    this.ipcRenderer = this._patchbay.ipcRenderer; // needed to have ipcRenderer in patchbay_editor.js

    this._loadedModules = {};
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
    this._settings =
      (await this.ipcRenderer.sendSync("platformSettings")) || {};

    this._usersettings = this._settings.userSettings;
    delete this._settings.userSettings;
    this._config = (await this.ipcRenderer.sendSync("cablesConfig")) || {};
    // this._editorElement = null;

    this._startUpLogItems =
      (await this.ipcRenderer.sendSync("getStartupLog")) || [];

    if (!this._config.isPackaged)
      window.PATCHBAY_DISABLE_SECURITY_WARNINGS = true;

    let src = this._config.uiIndexHtml + window.location.search;
    if (window.location.hash) {
      src += window.location.hash;
    }

    this._editorElement.src = src;
    this._editorElement.onload = () => {
      if (this.editorWindow) {
        const waitForAce = this.editorWindow.waitForAce;
        this.editorWindow.waitForAce = () => {
          this._logStartup("loading", this._settings.patchFile);

          this._incrementStartup();
          this._logStartup("checking/installing op dependencies...");
          this._patchbay.ipcRenderer
            .invoke("talkerMessage", "installProjectDependencies")
            .then((npmResult) => {
              this.editorWindow.CABLESUILOADER.cfg.patchConfig.onError = (
                ...args
              ) => {
                // npm runtime error...
                if (
                  args &&
                  args[0] === "core_patch" &&
                  args[2] &&
                  args[2].message &&
                  args[2].message.includes(
                    "was compiled against a different Node.js version",
                  )
                ) {
                  const dirParts = args[2].message.split("/");
                  const opNameIndex = dirParts.findIndex((part) => {
                    return part.startsWith("Ops.");
                  });
                  const opName = dirParts[opNameIndex];
                  const packageName = dirParts[opNameIndex + 2];
                  const onClick =
                    "CABLES.CMD.PATCHBAY.openOpDir('', '" + opName + "');";

                  const msg =
                    'try running this <a onclick="' +
                    onClick +
                    '" > in the op dir</a>:';
                  this._log.error(msg);
                  this._log.error(
                    "`npm --prefix ./ install " + packageName + "`",
                  );
                  this._log.error(
                    '`npx "@patchbay/rebuild" -v ' + process.versions.patchbay,
                  );
                }
              };
              waitForAce();

              if (
                npmResult.error &&
                npmResult.data &&
                npmResult.msg !== "UNSAVED_PROJECT"
              ) {
                npmResult.data.forEach((msg) => {
                  const opName = msg.opName ? " for " + msg.opName : "";
                  this._log.error(
                    "failed dependency" + opName + ": " + msg.stderr,
                  );
                });
              } else if (
                npmResult.msg !== "EMPTY" &&
                npmResult.msg !== "UNSAVED_PROJECT"
              ) {
                npmResult.data.forEach((result) => {
                  const npmText = result.stderr || result.stdout;
                  this._logStartup(result.opName + ": " + npmText);
                });
              }

              if (this.gui) {
                this.gui.on("uiloaded", () => {
                  if (this._settings.openFullscreenRenderer)
                    this.gui.cycleFullscreen();
                  // if (this.editor && this.editor.config && !this.editor.config.patchFile) this.gui.setStateUnsaved();
                });
              }
            });
        };
        if (this._settings.uiLoadStart)
          this.editorWindow.CABLESUILOADER.uiLoadStart -=
            this._settings.uiLoadStart;
        this._startUpLogItems.forEach((logEntry) => {
          this._logStartup(logEntry.title);
        });
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
          isTrustedPatch: true,
          platformClass: "PlatformPatchbay",
          urlCables: location.protocol + "//" + location.host,
          urlSandbox: location.protocol + "//" + location.host,
          communityUrl: this._config.communityUrl,
          user: this._settings.currentUser,
          usersettings: { settings: this._usersettings },
          isDevEnv: !this._config.isPackaged,
          env: this._config.env,
          patchId: this._settings.patchId,
          patchVersion: "",
          socketcluster: {},
          remoteClient: false,
          buildInfo: this._settings.buildInfo,
          patchConfig: {
            allowEdit: true,
            prefixAssetPath: this._settings.currentPatchDir,
            assetPath: this._settings.paths.assetPath,
            paths: this._settings.paths,
          },
        },
      },
      this._editorElement,
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
      modulePath = this._patchbay.ipcRenderer.sendSync("getOpModuleDir", {
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
        moduleFile = this._patchbay.ipcRenderer.sendSync(
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
            moduleFile = this._patchbay.ipcRenderer.sendSync(
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
