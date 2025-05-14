import { SharedDocUtil } from "@cables/api";
import fs from "fs";
import path from "path";
import jsonfile from "jsonfile";
import opsUtilFactory from "./ops_util.js";
import helperFactory from "./helper_util.js";

export default class DocUtil extends SharedDocUtil {
  constructor(utilProvider) {
    super(utilProvider);
  }
  getDocForOp(opName, docs = null) {
    if (!opName) return null;
    if (!this._opsUtil.isOpNameValid(opName)) return null;
    return this.buildOpDocs(opName);
  }

  getOpDocsInDir(opDir) {
    const opDocs = [];
    if (fs.existsSync(opDir)) {
      const opJsons = helperFactory(this._app).getFilesRecursive(
        opDir,
        ".json",
      );
      for (let jsonPath in opJsons) {
        const opName = path.basename(jsonPath, ".json");
        if (opsUtil.isOpNameValid(opName)) {
          try {
            const opDoc = jsonfile.readFileSync(path.join(opDir, jsonPath));
            opDoc.name = opName;
            opDocs[jsonPath] = opDoc;
          } catch (e) {
            this._log.warn(
              "failed to parse opdocs for",
              opName,
              "from",
              jsonPath,
            );
          }
        }
      }
    }
    return opDocs;
  }

  makeReadable(opDocs) {
    const readables = super.makeReadable(opDocs);
    const opsUtil = opsUtilFactory(this._app);
    readables.forEach((opDoc) => {
      const relativeDir = opsUtil.getOpSourceDir(opDoc.name, true);
      const absolute = opsUtil.getOpSourceDir(opDoc.name);
      const opDir = absolute.replace(relativeDir, "");
      if (opDir !== this._app.getOpsPath()) {
        opDoc.opDir = opDir;
      }
      opDoc.opDirFull = absolute;
    });
    return readables;
  }
}
