import { SharedHelperUtil } from "@cables/api";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

export default class HelperUtil extends SharedHelperUtil {
  constructor(utilProvider) {
    super(utilProvider);
  }

  fileURLToPath(url, convertRelativeToProject = false) {
    if (!url || url === "0") return "";
    if (url.includes("://") && !url.startsWith("file://")) {
      return "";
    }

    let fileUrl = decodeURI(url);
    let filePath = fileUrl;

    const uiDistPath = this._cables.getUiDistPath();
    filePath = filePath.replace("file://" + uiDistPath, "");
    if (
      convertRelativeToProject &&
      !filePath.startsWith("file:") &&
      !path.isAbsolute(filePath)
    ) {
      filePath = path.join(this._cables.getAssetPath(), filePath);
      try {
        fileUrl = pathToFileURL(filePath);
      } catch (e) {
        this._log.error("failed to convert to project path", url, filePath, e);
        return "";
      }
    }
    try {
      return fileURLToPath(fileUrl);
    } catch (e) {
      this._log.info(
        "failed to create path from url",
        convertRelativeToProject,
        fileUrl,
        url,
        e,
      );
      return "";
    }
  }

  pathToFileURL(thePath, convertRelativeToProject = false) {
    if (thePath && thePath.startsWith("file:")) return thePath;
    if (convertRelativeToProject && !path.isAbsolute(thePath)) {
      return pathToFileURL(path.join(this._cables.getAssetPath(), thePath))
        .href;
    } else {
      return thePath ? pathToFileURL(thePath).href : null;
    }
  }

  isLocalAssetPath(thePath) {
    const currentProjectDir = this._cables.settings.getCurrentProjectDir();
    return currentProjectDir && thePath.startsWith(currentProjectDir);
  }
}
