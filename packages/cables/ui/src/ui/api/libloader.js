import { Logger } from "@cables/client";
import Gui from "../gui.js";
import { platform } from "../platform.js";

export default class LibLoader {
  constructor(dependencies, cb, options = {}) {
    this._log = new Logger("libloader");

    this._libsToLoad = dependencies.slice(0);
    this._cb = cb;
    this.id = options.id || "loadlibs";
    this.title = options.title || "loading libs";
    this._list = options.list || [];

    if (dependencies.length > 0) {
      Gui.gui.jobs().start({
        id: this.id,
        title: this.title,
      });

      for (const i in dependencies) {
        this.loadLib(dependencies[i]);
      }
    } else {
      if (this._cb) this._cb();
    }
  }

  checkAllLoaded() {
    if (this._libsToLoad.length === 0) {
      if (this._cb) this._cb();
      Gui.gui.jobs().finish(this.id);
    }
  }

  loadLib(module) {
    const libName = module.src;
    let libType = module.type;
    const moduleExport = module.export;

    // loading npms is done by electron
    const doLoadLib = libType !== "npm" && !this._list.includes(libName);
    if (doLoadLib) {
      if (!loadjs.isDefined(libName)) {
        let scriptSrc = "";

        // backwards compatibility...
        if (Array.isArray(module.src)) module.src = module.src[0] || "";

        if (!module || !module.src || !module.type) {
          const i = this._libsToLoad.indexOf(libName);
          this._libsToLoad.splice(i, 1);
          this.checkAllLoaded();
          if (Gui.gui) Gui.gui.emitEvent("libLoadError", libName);
          return;
        }

        if (module.src.startsWith("/assets")) {
          if (
            Gui.gui &&
            Gui.gui.corePatch() &&
            Gui.gui.corePatch().config.prefixAssetPath
          ) {
            scriptSrc = (
              Gui.gui.corePatch().config.prefixAssetPath + libName
            ).replace("//", "/");
          } else {
            scriptSrc += module.src;
          }
        } else if (module.src.startsWith("http")) {
          scriptSrc = module.src;
        } else if (module.src.startsWith("./")) {
          scriptSrc =
            platform.getSandboxUrl() +
            "/api/oplib/" +
            module.op +
            module.src.replace(".", "");
        } else {
          const basePath =
            module.type === "corelib"
              ? "/api/cables/corelib/"
              : "/api/cables/lib/";
          scriptSrc = platform.getSandboxUrl() + basePath + module.src;
        }

        if (libType === "module") {
          import(/* @vite-ignore */ scriptSrc)
            .then((importedModule) => {
              if (moduleExport) {
                if (!window.hasOwnProperty(moduleExport))
                  window[moduleExport] = importedModule;
              }
              const i = this._libsToLoad.indexOf(libName);
              this._libsToLoad.splice(i, 1);
              this._list.push(libName);
              this.checkAllLoaded();
            })
            .catch((e) => {
              const i = this._libsToLoad.indexOf(libName);
              this._libsToLoad.splice(i, 1);
              this.checkAllLoaded();
              this._log.error(e);
              if (Gui.gui) Gui.gui.emitEvent("libLoadError", libName);
            });
        } else if (libType === "op") {
          Gui.gui.serverOps.loadOpDependencies(
            module.src,
            () => {
              const i = this._libsToLoad.indexOf(libName);
              this._libsToLoad.splice(i, 1);
              this._list.push(libName);
              this.checkAllLoaded();
            },
            true,
          );
        } else {
          loadjs(scriptSrc, libName, {
            returnPromise: true,
            async: true,
            before: (path, scriptEl) => {
              if (libType === "module") scriptEl.setAttribute("type", "module");
            },
          })
            .then(() => {
              const i = this._libsToLoad.indexOf(libName);
              this._libsToLoad.splice(i, 1);
              this._list.push(libName);
              this.checkAllLoaded();
            })
            .catch((e) => {
              const i = this._libsToLoad.indexOf(libName);
              this._libsToLoad.splice(i, 1);
              this.checkAllLoaded();
              this._log.error(e);
              if (Gui.gui) Gui.gui.emitEvent("libLoadError", libName);
            });
        }
      } else {
        const i = this._libsToLoad.indexOf(libName);
        this._libsToLoad.splice(i, 1);
        this._list.push(libName);
        this.checkAllLoaded();
      }
    } else {
      const i = this._libsToLoad.indexOf(libName);
      this._libsToLoad.splice(i, 1);
      this.checkAllLoaded();
    }
  }
}
