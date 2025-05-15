import fs from "fs";
import path from "path";
import mime from "mime";

import { UtilProvider } from "@cables/api";

export default class PatchbayEndpoint {
  constructor(utilProvider, app) {
    this._log = utilProvider.getUtil(UtilProvider.LOGGER);
    this._opsUtil = utilProvider.getUtil(UtilProvider.OPS_UTIL);
    this._helperUtil = utilProvider.getUtil(UtilProvider.HELPER_UTIL);
    this._docsUtil = utilProvider.getUtil(UtilProvider.DOCS_UTIL);
    this._subPatchOpUtil = utilProvider.getUtil(UtilProvider.SUBPATCH_OP_UTIL);
    this._projectsUtil = utilProvider.getUtil(UtilProvider.PROJECTS_UTIL);
    this._app = app;
    this._settings = app.settings;
  }

  // init() {
  // const partition = this._settings.SESSION_PARTITION;
  // const ses = session.fromPartition(partition, { cache: false });
  // ses.protocol.handle("file", async (request) => {
  //   let urlFile = request.url;
  //   let absoluteFile = this._helperUtil.fileURLToPath(urlFile, false);
  //   let projectFile = this._helperUtil.fileURLToPath(urlFile, true);
  //   if (fs.existsSync(absoluteFile)) {
  //     Object.defineProperty(request, "url", {
  //       value: this._helperUtil.pathToFileURL(absoluteFile),
  //     });
  //     const response = await net.fetch(request, {
  //       bypassCustomProtocolHandlers: true,
  //     });
  //     this._addDefaultHeaders(request, response, absoluteFile);
  //     return response;
  //   } else if (fs.existsSync(projectFile)) {
  //     Object.defineProperty(request, "url", {
  //       value: this._helperUtil.pathToFileURL(projectFile),
  //     });
  //     const response = await net.fetch(request, {
  //       bypassCustomProtocolHandlers: true,
  //     });
  //     this._addDefaultHeaders(request, response, projectFile);
  //     return response;
  //   } else {
  //     try {
  //       if (projectFile.includes("?")) {
  //         projectFile = projectFile.split("?")[0];
  //       }
  //       if (fs.existsSync(projectFile)) {
  //         const response = await net.fetch(
  //           this._helperUtil.pathToFileURL(projectFile),
  //           { bypassCustomProtocolHandlers: true },
  //         );
  //         this._addDefaultHeaders(request, response, projectFile);
  //         return response;
  //       } else {
  //         return new Response(null, { headers: { status: 404 } });
  //       }
  //     } catch (e) {
  //       return net.fetch(request.url, { bypassCustomProtocolHandlers: true });
  //     }
  //   }
  // });
  // }

  async handle(request) {
    const url = request.url;
    const urlPath = url.replace("cables/", "");
    const queryParams = new URLSearchParams(url.split("?")[1]);
    const params = {};
    const req = request;
    req.params = params;
    req.query = {};
    for (let key in queryParams) {
      req.query[key] = queryParams.get(key);
    }
    if (urlPath.startsWith("/api/corelib/")) {
      req.params.name = urlPath.split("/", 4)[3];
      const libCode = this.apiGetCoreLibs(req);
      if (libCode) {
        return new Response(libCode, {
          headers: { "content-type": "application/javascript" },
        });
      } else {
        return new Response(libCode, {
          headers: { "content-type": "application/javascript" },
          status: 500,
        });
      }
    } else if (urlPath.startsWith("/api/lib/")) {
      req.params.name = urlPath.split("/", 4)[3];
      const libCode = this.apiGetLibs(req);
      if (libCode) {
        return new Response(libCode, {
          headers: { "content-type": "application/javascript" },
        });
      } else {
        return new Response(libCode, {
          headers: { "content-type": "application/javascript" },
          status: 500,
        });
      }
    } else if (urlPath.startsWith("/api/oplib/")) {
      const parts = urlPath.split("/", 5);
      let opName = parts[3];
      let libName = parts[4];
      if (this._opsUtil.isOpId(opName)) {
        opName = this._opsUtil.getOpNameById(opName);
      }
      if (opName) {
        const opPath = this._opsUtil.getOpAbsolutePath(opName);
        const libPath = path.join(opPath, libName);
        const libUrl = this._helperUtil.pathToFileURL(libPath);
        const response = await net.fetch(libUrl, {
          bypassCustomProtocolHandlers: true,
        });
        this._addDefaultHeaders(request, response, libPath);
        return response;
      } else {
        return new Response("", {
          headers: { "content-type": "application/javascript" },
          status: 404,
        });
      }
    } else if (urlPath === "/api/changelog") {
      return new Response(JSON.stringify(this.apiGetChangelog(req)), {
        headers: { "content-type": "application/json" },
      });
    } else if (urlPath.startsWith("/api/ops/code/project")) {
      const code = this.apiGetProjectOpsCode(req);
      return new Response(code, {
        headers: { "content-type": "application/javascript" },
      });
    } else if (urlPath.startsWith("/api/ops/code")) {
      const code = this.apiGetCoreOpsCode(req);
      if (code) {
        return new Response(code, {
          headers: { "content-type": "application/javascript" },
        });
      } else {
        return new Response(code, {
          headers: { "content-type": "application/javascript" },
          status: 500,
        });
      }
    } else if (urlPath.startsWith("/api/op/layout/")) {
      let opName = urlPath.split("/", 5)[4];
      if (this._opsUtil.isOpId(opName)) {
        opName = this._opsUtil.getOpNameById(opName);
      }
      req.params.opName = opName;
      const layoutSvg = this.apiOpLayout(req);
      if (layoutSvg) {
        return new Response(layoutSvg, {
          headers: { "content-type": "image/svg+xml" },
        });
      } else {
        return new Response("", {
          headers: { "content-type": "image/svg+xml" },
          status: 500,
        });
      }
    } else if (urlPath.startsWith("/api/op/")) {
      let opName = urlPath.split("/", 4)[3];
      if (this._opsUtil.isOpId(opName)) {
        opName = this._opsUtil.getOpNameById(opName);
      }
      if (opName) {
        req.params.opName = opName;
        const opCode = this.apiGetOpCode(req);
        if (opCode) {
          return new Response(opCode, {
            headers: { "content-type": "application/javascript" },
          });
        } else {
          return new Response(opCode, {
            headers: { "content-type": "application/javascript" },
            status: 500,
          });
        }
      } else {
        return new Response("", {
          headers: { "content-type": "application/javascript" },
          status: 404,
        });
      }
    } else if (urlPath.startsWith("/op/screenshot")) {
      let opName = urlPath.split("/", 4)[3];
      if (opName) opName = opName.replace(/.png$/, "");
      const absoluteFile = this._opsUtil.getOpAbsolutePath(opName);
      const file = path.join(absoluteFile, "screenshot.png");
      const response = await net.fetch(this._helperUtil.pathToFileURL(file), {
        bypassCustomProtocolHandlers: true,
      });
      this._addDefaultHeaders(request, response, file);
      return response;
    } else if (urlPath.startsWith("/edit/")) {
      let patchId = urlPath.split("/", 3)[2];
      let projectFile = null;
      if (patchId) {
        projectFile = this._settings.getRecentProjectFile(patchId);
      }
      if (projectFile) {
        // await this._patchbayApp.openPatch(projectFile, true);
      } else {
        // await this._patchbayApp.pickProjectFileDialog();
      }
      return new Response(null, { status: 302 });
    } else if (urlPath.startsWith("/openDir/")) {
      // let dir = urlPath.replace("/openDir/", "");
      // await this._shell.showItemInFolder(dir);
      return new Response(null, { status: 404 });
    } else {
      return new Response("", {
        headers: { "content-type": "application/javascript" },
        status: 404,
      });
    }
  }

  apiGetCoreOpsCode(req) {
    const preview = req.query.preview;
    const opDocs = this._docsUtil.getOpDocs();
    const code = this._opsUtil.buildCode(
      this._app.getCoreOpsPath(),
      null,
      true,
      true,
      opDocs,
      preview,
    );
    if (!code)
      this._log.warn(
        "FAILED TO GET CODE FOR COREOPS FROM",
        this._app.getCoreOpsPath(),
      );
    return code;
  }

  apiGetProjectOpsCode() {
    // const preview = req.query.preview;
    const project = this._settings.getCurrentProject();

    let code = "";
    let missingOps = [];
    if (project) {
      let opDocs = this._docsUtil.getOpDocs(true, true);
      let allOps = [];
      if (project.ops)
        allOps = project.ops.filter((op) => {
          return !opDocs.some((d) => {
            return d.id === op.opId;
          });
        });
      const opsInProjectDir =
        this._projectsUtil.getOpDocsInProjectDirs(project);
      const opsInSubPatches =
        this._subPatchOpUtil.getOpsUsedInSubPatches(project);
      allOps = allOps.concat(opsInProjectDir);
      allOps = allOps.concat(opsInSubPatches);
      missingOps = allOps.filter((op) => {
        return !opDocs.some((d) => {
          return d.id === op.opId || d.id === op.id;
        });
      });
    }

    const opsWithCode = [];
    let codeNamespaces = [];

    missingOps.forEach((missingOp) => {
      const opId = missingOp.opId || missingOp.id;
      const opName = missingOp.name || this._opsUtil.getOpNameById(opId);
      if (opId && opName) {
        if (!opsWithCode.includes(opName)) {
          const parts = opName.split(".");
          for (let k = 1; k < parts.length; k++) {
            let partPartname = "";
            for (let j = 0; j < k; j++) partPartname += parts[j] + ".";

            partPartname = partPartname.substr(0, partPartname.length - 1);
            codeNamespaces.push(partPartname + "=" + partPartname + " || {};");
          }
          const fn = this._opsUtil.getOpAbsoluteFileName(opName);
          if (fn) {
            code += this._opsUtil.getOpFullCode(fn, opName, opId);
            opsWithCode.push(opName);
          }
        }
        this._docsUtil.addOpToLookup(opId, opName);
      }
    });

    codeNamespaces = this._helperUtil.sortAndReduce(codeNamespaces);
    let fullCode = this._opsUtil.OPS_CODE_PREFIX;
    if (codeNamespaces && codeNamespaces.length > 0) {
      codeNamespaces[0] = "var " + codeNamespaces[0];
      fullCode += codeNamespaces.join("\n") + "\n\n";
    }

    fullCode += code;
    return fullCode;
  }

  apiGetOpCode(req) {
    const preview = !!req.query.preview;
    const opName = req.params.opName;
    let code = "";
    const currentProject = this._settings.getCurrentProject();
    try {
      const attachmentOps = this._opsUtil.getSubPatchOpAttachment(opName);
      const bpOps = this._subPatchOpUtil.getOpsUsedInSubPatches(attachmentOps);

      if (!bpOps) {
        return code;
      } else {
        let opNames = [];
        for (let i = 0; i < bpOps.length; i++) {
          const bpOp = bpOps[i];
          const bpOpName = this._opsUtil.getOpNameById(bpOp.opId);
          if (
            this._opsUtil.isCoreOp(bpOpName) &&
            !this._opsUtil.isOpOldVersion(bpOpName) &&
            !this._opsUtil.isDeprecated(bpOpName)
          )
            continue;
          if (
            currentProject &&
            currentProject.ops &&
            currentProject.ops.some((projectOp) => {
              return projectOp.opId === bpOp.opId;
            })
          )
            continue;
          opNames.push(bpOpName);
        }

        if (
          this._opsUtil.isExtension(opName) ||
          this._opsUtil.isTeamNamespace(opName)
        ) {
          const collectionName = this._opsUtil.getCollectionNamespace(opName);
          opNames = opNames.concat(
            this._opsUtil.getCollectionOpNames(collectionName),
          );
          opNames.push(opName);
        } else {
          opNames.push(opName);
        }

        const ops = [];
        opNames.forEach((name) => {
          ops.push({
            objName: name,
            opId: this._opsUtil.getOpIdByObjName(name),
          });
        });

        code = preview
          ? this._opsUtil.buildPreviewCode(ops)
          : this._opsUtil.buildFullCode(ops, "none");
        return code;
      }
    } catch (e) {
      this._log.error("FAILED TO BUILD OPCODE FOR", opName, e);
      return code;
    }
  }

  apiGetCoreLibs(req) {
    const name = req.params.name;
    const fn = path.join(this._app.getCoreLibsPath(), name + ".js");

    if (fs.existsSync(fn)) {
      return fs.readFileSync(fn);
    } else {
      this._log.error("COULD NOT FIND CORELIB FILE AT", fn);
      return "";
    }
  }

  apiGetLibs(req) {
    const name = req.params.name;
    const fn = path.join(this._app.getLibsPath(), name);
    if (fs.existsSync(fn)) {
      return fs.readFileSync(fn);
    } else {
      this._log.error("COULD NOT FIND LIB FILE AT", fn);
      return "";
    }
  }

  apiGetChangelog() {
    return {
      ts: Date.now(),
      items: [],
    };
  }

  apiOpLayout(req) {
    const opName = req.params.opName;
    return this._opsUtil.getOpSVG(opName);
  }

  _addDefaultHeaders(request, response, existingFile) {
    try {
      const stats = fs.statSync(existingFile);
      if (stats) {
        response.headers.append("Accept-Ranges", "bytes");
        response.headers.append("Last-Modified", stats.mtime.toUTCString());

        // large mp4 and range headers cause problems somehow...
        // https://github.com/laurent22/joplin/blob/e607a7376f8403082e87087a3e07f37cb2e1ce76/packages/app-desktop/utils/customProtocols/handleCustomProtocols.ts#L106
        const rangeHeader = request.headers.get("Range");
        const startByte = Number(rangeHeader.match(/(\d+)-/)?.[1] || "0");
        const endByte = Number(
          rangeHeader.match(/-(\d+)/)?.[1] || stats.size - 1,
        );
        response.headers.append(
          "Content-Range",
          "bytes 0-" + stats.size + "/" + (stats.size + 1),
        );
        response.headers.append("Content-Length", endByte + 1 - startByte);
      }
      let mimeType = mime.getType(existingFile);
      if (mimeType) {
        if (mimeType === "application/node") mimeType = "text/javascript";
        response.headers.set("Content-Type", mimeType);
      }
    } catch (e) {
      // ignore
    }
    return response;
  }
}
