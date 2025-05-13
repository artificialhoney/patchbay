import { editorSession } from "../elements/tabpanel/editor_session.js";
import Gui from "../gui.js";
import { platform } from "../platform.js";
import EditorTab from "./tabs/tab_editor.js";

/**
 * edit text files directly from the filemanager
 *
 * @export
 * @class FileManagerEditor
 */
export default class FileManagerEditor {
  constructor() {
    editorSession.addListener("editAssetFile", (name, data) => {
      this.editAssetTextFile(data.filename, data.syntax, data.patchId);
    });
  }

  editAssetTextFile(filename, syntax, patchId) {
    patchId = patchId || Gui.gui.project()._id;
    let url = filename;
    if (!filename.startsWith("file:")) {
      url = platform.getSandboxUrl() + "/assets/" + patchId + "/" + filename;
    }

    if (!syntax) syntax = "text";
    if (syntax == "javascript") syntax = "js";
    if (syntax == "shader") syntax = "glsl";

    CABLES.ajax(url, (err2, _data, xhr2) => {
      const name = filename;

      const editorObj = editorSession.rememberOpenEditor(
        "editAssetFile",
        name,
        { filename: filename, patchId: patchId, syntax: syntax },
        true,
      );

      new EditorTab({
        title: name,
        content: _data,
        editorObj: editorObj,
        syntax: syntax.toLowerCase(),
        onClose: function (which) {
          if (editorSession)
            editorSession.remove(editorObj.type, editorObj.name);
        },
        onSave: function (setStatus, content) {
          Gui.gui.jobs().start({
            id: "saveeditorcontent" + filename,
            title: "saving file " + filename,
          });

          platform.talkerAPI.send(
            "updateFile",
            {
              fileName: filename,
              content: content,
            },
            (err3, res3) => {
              Gui.gui.savedState.setSaved("editorOnChangeFile");
              Gui.gui.jobs().finish("saveeditorcontent" + filename);
              setStatus("saved");
            },
          );
        },
        onChange: function (ev) {
          Gui.gui.savedState.setUnSaved("editorOnChangeFile");
        },
        onFinished: () => {
          // Gui.gui.mainTabs.activateTabByName(name);
        },
      });
    });
  }
}
