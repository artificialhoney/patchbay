import CablesPatchbay from "./cables.js";

const CABLES_CMD_PATCHBAY = {};
const CABLES_CMD_PATCHBAY_OVERRIDES = {};
const CMD_PATCHBAY_COMMANDS = [];

CABLES_CMD_PATCHBAY.openOpDir = (opId = null, opName = null) => {
  const gui = CablesPatchbay.cablesPatchbay.gui;
  if (gui) {
    let options = { opId: opId, opName: opName };
    if (!opId && !opName) {
      const ops = gui.patchView.getSelectedOps();
      if (!ops.length) return;
      options = {
        opId: ops[0].opId,
        opName: ops[0].name,
      };
    }
    CablesPatchbay.cablesPatchbay.editor.api(
      "openOpDir",
      options,
      (_err, r) => {},
    );
  }
};

CABLES_CMD_PATCHBAY.openProjectDir = () => {
  CablesPatchbay.cablesPatchbay.editor.api(
    "openProjectDir",
    {},
    (_err, r) => {},
  );
};

CABLES_CMD_PATCHBAY.openFileManager = (url = null) => {
  const data = {};
  if (url) data.url = url;
  CablesPatchbay.cablesPatchbay.editor.api(
    "openFileManager",
    data,
    (_err, r) => {},
  );
};

CABLES_CMD_PATCHBAY.collectAssets = () => {
  const loadingModal =
    CablesPatchbay.cablesPatchbay.gui.startModalLoading("Copying assets...");
  let closeTimeout = 2000;
  CablesPatchbay.cablesPatchbay.editor.api("collectAssets", {}, (_err, r) => {
    if (!_err) {
      const ops = CablesPatchbay.cablesPatchbay.gui.corePatch().ops;
      const oldNew = r.data;
      if (oldNew) {
        const assetPorts = [];
        for (let i = 0; i < ops.length; i++) {
          for (let j = 0; j < ops[i].portsIn.length; j++) {
            if (
              ops[i].portsIn[j].uiAttribs &&
              ops[i].portsIn[j].uiAttribs.display &&
              ops[i].portsIn[j].uiAttribs.display === "file"
            ) {
              assetPorts.push(ops[i].portsIn[j]);
            }
          }
        }
        const oldNames = Object.keys(oldNew);
        if (oldNames.length > 0) {
          oldNames.forEach((srch) => {
            const rplc = oldNew[srch];
            loadingModal.setTask("copied " + srch + " to " + rplc);
            assetPorts.forEach((assetPort) => {
              let v = assetPort.get();
              if (v && v.startsWith(srch)) {
                v = rplc + v.substring(srch.length);
                assetPort.set(v);
              }
            });
          });
          CablesPatchbay.cablesPatchbay.gui.setStateUnsaved();
        } else {
          loadingModal.setTask("nothing to copy");
        }
      } else {
        loadingModal.setTask("nothing to copy");
      }
    } else {
      loadingModal.setTask("failed to copy assets");
      loadingModal.setTask("---");
      loadingModal.setTask(_err);
      closeTimeout = 5000;
    }
    setTimeout(() => {
      CablesPatchbay.cablesPatchbay.gui.endModalLoading();
    }, closeTimeout);
  });
};

CABLES_CMD_PATCHBAY.collectOps = () => {
  const loadingModal =
    CablesPatchbay.cablesPatchbay.gui.startModalLoading("Copying ops...");
  let closeTimeout = 2000;
  CablesPatchbay.cablesPatchbay.editor.api("collectOps", {}, (_err, r) => {
    if (!_err && r && r.data) {
      const oldNames = Object.keys(r.data);
      if (r && oldNames.length > 0) {
        oldNames.forEach((srch) => {
          const rplc = r.data[srch];
          loadingModal.setTask("copied " + srch + " to " + rplc);
        });
      } else {
        loadingModal.setTask("nothing to copy");
      }
      setTimeout(() => {
        CablesPatchbay.cablesPatchbay.gui.endModalLoading();
      }, closeTimeout);
    } else {
      loadingModal.setTask("failed to copy ops");
      loadingModal.setTask("---");
      loadingModal.setTask(_err);
      closeTimeout = 5000;
      setTimeout(() => {
        CablesPatchbay.cablesPatchbay.gui.endModalLoading();
      }, closeTimeout);
    }
  });
};

CABLES_CMD_PATCHBAY.manageOpDirs = () => {
  CablesPatchbay.cablesPatchbay.openOpDirsTab();
};

CABLES_CMD_PATCHBAY.copyOpDirToClipboard = async (opId = null) => {
  const gui = CablesPatchbay.cablesPatchbay.gui;
  if (gui) {
    if (!opId) {
      const ops = gui.patchView.getSelectedOps();
      if (!ops.length) return;
      opId = ops[0].opId;
    }
    const modulePath = await window.ipcRenderer.sendSync("getOpDir", {
      opId: opId,
    });
    if (modulePath) {
      navigator.clipboard.writeText(modulePath);
      CablesPatchbay.cablesPatchbay.editor.notify(
        "Op path copied to clipboard",
      );
    }
  }
};

CABLES_CMD_PATCHBAY_OVERRIDES.PATCH = {};
CABLES_CMD_PATCHBAY_OVERRIDES.PATCH.saveAs = () => {
  let patchName = CablesPatchbay.cablesPatchbay.gui.project()
    ? CablesPatchbay.cablesPatchbay.gui.project().name
    : null;
  CablesPatchbay.cablesPatchbay.editor.api(
    "saveProjectAs",
    { name: patchName },
    (_err, r) => {},
  );
};
CABLES_CMD_PATCHBAY_OVERRIDES.PATCH.uploadFileDialog = () => {
  CablesPatchbay.cablesPatchbay.editor.api(
    "selectFile",
    {},
    (_err, filepath) => {
      if (!_err && filepath) {
        const gui = CablesPatchbay.cablesPatchbay.gui;
        if (gui) gui.patchView.addAssetOpAuto(filepath);
      }
    },
  );
};
CABLES_CMD_PATCHBAY_OVERRIDES.PATCH.newPatch = () => {
  CablesPatchbay.cablesPatchbay.editor.api("newPatch", {}, (_err, r) => {});
};

CABLES_CMD_PATCHBAY_OVERRIDES.PATCH.renameOp = (opName = null) => {
  const gui = CablesPatchbay.cablesPatchbay.gui;
  if (gui) {
    if (!opName) {
      const ops = gui.patchView.getSelectedOps();
      if (!ops.length) return;

      const op = ops[0];
      opName = op.objName;
    }

    gui.serverOps.renameDialog(opName);
  }
};

CABLES_CMD_PATCHBAY_OVERRIDES.RENDERER = {};
CABLES_CMD_PATCHBAY_OVERRIDES.RENDERER.fullscreen = () => {
  CablesPatchbay.cablesPatchbay.editor.api(
    "cycleFullscreen",
    {},
    (_err, r) => {},
  );
};

const CABLES_CMD_COMMAND_OVERRIDES = [
  {
    cmd: "save patch as...",
    func: CABLES_CMD_PATCHBAY_OVERRIDES.PATCH.saveAs,
  },
  {
    cmd: "upload file dialog",
    func: CABLES_CMD_PATCHBAY_OVERRIDES.PATCH.uploadFileDialog,
  },
  {
    cmd: "create new patch",
    func: CABLES_CMD_PATCHBAY_OVERRIDES.PATCH.newPatch,
  },
  {
    cmd: "rename op",
    func: CABLES_CMD_PATCHBAY_OVERRIDES.PATCH.renameOp,
  },
];

CMD_PATCHBAY_COMMANDS.push(
  {
    cmd: "collect assets into patch dir",
    category: "patch",
    func: CABLES_CMD_PATCHBAY.collectAssets,
    icon: "file",
  },
  {
    cmd: "collect ops into patch dir",
    category: "ops",
    func: CABLES_CMD_PATCHBAY.collectOps,
    icon: "op",
  },
  {
    cmd: "manage op directories",
    category: "ops",
    func: CABLES_CMD_PATCHBAY.manageOpDirs,
    icon: "folder",
  },
  {
    cmd: "install ops from package.json",
    category: "ops",
    func: CABLES_CMD_PATCHBAY.addOpPackage,
    icon: "op",
  },
  {
    cmd: "copy op dir to clipboard",
    category: "ops",
    func: CABLES_CMD_PATCHBAY.copyOpDirToClipboard,
    icon: "op",
  },
  {
    cmd: "open op directory",
    category: "ops",
    func: CABLES_CMD_PATCHBAY.openOpDir,
    icon: "folder",
  },
  {
    cmd: "open project directory",
    category: "patch",
    func: CABLES_CMD_PATCHBAY.openProjectDir,
    icon: "folder",
  },
  {
    cmd: "open os file manager",
    category: "cables",
    func: CABLES_CMD_PATCHBAY.openFileManager,
    icon: "folder",
  },
);

export default {
  commands: CMD_PATCHBAY_COMMANDS,
  functions: CABLES_CMD_PATCHBAY,
  functionOverrides: CABLES_CMD_PATCHBAY_OVERRIDES,
  commandOverrides: CABLES_CMD_COMMAND_OVERRIDES,
};
