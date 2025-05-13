import ManageOp from "../components/tabs/tab_manage_op.js";
import { notify } from "../elements/notification.js";
import Gui from "../gui.js";
import { platform } from "../platform.js";

const CABLES_CMD_OP = {};
const CMD_OP_COMMANDS = [];

const opCommands = {
  commands: CMD_OP_COMMANDS,
  functions: CABLES_CMD_OP,
};

export default opCommands;

CABLES_CMD_OP.codeNewOp = () => {
  Gui.gui.serverOps.createDialog();
};

CABLES_CMD_OP.downGradeOp = function () {
  const selops = Gui.gui.patchView.getSelectedOps();
  for (let i = 0; i < selops.length; i++) {
    Gui.gui.patchView.downGradeOp(selops[i].id, selops[i].objName);
  }
};

CABLES_CMD_OP.copyNameClipboard = function () {
  let str = "";
  const selops = Gui.gui.patchView.getSelectedOps();

  for (let i = 0; i < selops.length; i++) str += selops[i].objName.endl();

  navigator.clipboard.writeText(str);
  notify("copied " + selops.length + " op names to clipboard ", null, {
    force: true,
  });
};

CABLES_CMD_OP.upGradeOps = function () {
  const selops = Gui.gui.patchView.getSelectedOps();
  for (let i = 0; i < selops.length; i++) {
    const opdoc = Gui.gui.opDocs.getOpDocById(selops[i].opId);
    if (
      opdoc &&
      opdoc.oldVersion &&
      opdoc.newestVersion &&
      opdoc.newestVersion.name
    )
      Gui.gui.patchView.replaceOp(selops[i].id, opdoc.newestVersion.name);
  }
};

CABLES_CMD_OP.reloadChangedOps = function () {
  for (let i in Gui.gui.serverOps.opIdsChangedOnServer) {
    Gui.gui.serverOps.execute(i, () => {
      delete Gui.gui.serverOps.opIdsChangedOnServer[i];
      Gui.gui.opParams.refresh();
    });
  }
  Gui.gui.restriction.hide();
};

CABLES_CMD_OP.cloneSelectedOp = function () {
  const ops = Gui.gui.patchView.getSelectedOps();
  if (ops.length > 0) Gui.gui.serverOps.cloneDialog(ops[0].objName, ops[0]);
};

CABLES_CMD_OP.manageCurrentSubpatchOp = function () {
  const oldSubPatchId = Gui.gui.patchView.getCurrentSubPatch();
  const subOuter = Gui.gui.patchView.getSubPatchOuterOp(oldSubPatchId);

  new ManageOp(Gui.gui.mainTabs, subOuter.opId);
};

CABLES_CMD_OP.manageOp = function (opid) {
  if (!opid) {
    const ops = Gui.gui.patchView.getSelectedOps();
    if (ops.length > 0) opid = ops[0].opId;
  }
  new ManageOp(Gui.gui.mainTabs, opid);
};

CABLES_CMD_OP.cloneSelectedOps = (ops) => {
  if (!ops) {
    ops = Gui.gui.patchView.getSelectedOps();

    for (let i = 0; i < ops.length; i++) {
      const op = ops[i];
      const opname = op.objName;
      let sanitizedOpName = opname.replaceAll(".", "_");

      let newOpname = platform.getPatchOpsNamespace() + sanitizedOpName;
      newOpname = newOpname.replaceAll(".Ops_", ".");

      const newOpnameNoVer = newOpname.replaceAll("_v", "V");

      let count = 0;
      newOpname = newOpnameNoVer;
      while (Gui.gui.opDocs.getOpDocByName(newOpname)) {
        newOpname = newOpnameNoVer + count;
        count++;
      }
      op.renameopto = newOpname;

      console.log("new renameto name:", newOpname);
    }

    if (ops.length == 0) return;
  }

  // loadingModal = loadingModal || Gui.gui.startModalLoading("Cloning ops...");

  if (ops.length == 0) {
    Gui.gui.endModalLoading();
    return;
  }
  const op = ops.pop();
  const opname = op.objName;
  const newOpname = op.renameopto;

  if (Gui.gui.opDocs.getOpDocByName(newOpname)) {
    // that opname was already renamed in list
    Gui.gui.patchView.replaceOp(op.id, newOpname);
    CABLES_CMD_OP.cloneSelectedOps(ops);
  } else {
    Gui.gui.serverOps.clone(
      op.opId,
      newOpname,
      () => {
        Gui.gui.serverOps.loadOpDependencies(opname, function () {
          Gui.gui.patchView.replaceOp(op.id, newOpname);

          notify("created op " + newOpname, null, { force: true });

          CABLES_CMD_OP.cloneSelectedOps(ops);
        });
      },
      { openEditor: false },
    );
  }
};

CABLES_CMD_OP.renameOp = (opName = null) => {
  if (!opName) {
    const ops = Gui.gui.patchView.getSelectedOps();
    if (!ops.length) return;
    const op = Gui.gui.patchView.getSelectedOps()[0];
    opName = op.objName;
  }

  if (platform.frontendOptions.opRenameInEditor) {
    Gui.gui.serverOps.renameDialog(opName);
  } else {
    Gui.gui.serverOps.renameDialogIframe(opName);
  }
};

CABLES_CMD_OP.createVersionSelectedOp = function () {
  const ops = Gui.gui.patchView.getSelectedOps();
  if (ops.length == 0) return;

  const opname = ops[0].objName;
  let newOpname = "";
  if (opname.includes("_v")) {
    const parts = opname.split("_v");
    newOpname = parts[0] + "_v" + (parseFloat(parts[1]) + 1);
  } else newOpname = opname + "_v2";

  Gui.gui.serverOps.clone(ops[0].opId, newOpname, () => {
    Gui.gui.serverOps.loadOpDependencies(opname, function () {
      Gui.gui.patchView.replaceOp(ops[0].id, newOpname);

      notify("created op " + newOpname, null, { force: true });
    });
  });
};

CABLES_CMD_OP.editOp = function (userInteraction = true) {
  const selops = Gui.gui.patchView.getSelectedOps();

  if (selops && selops.length > 0) {
    for (let i = 0; i < selops.length; i++)
      Gui.gui.serverOps.edit(selops[i], false, null, userInteraction);
  }
};

CMD_OP_COMMANDS.push(
  {
    cmd: "Code a new op",
    category: "op",
    icon: "op",
    func: CABLES_CMD_OP.codeNewOp,
  },
  {
    cmd: "Downgrade selected op",
    func: CABLES_CMD_OP.downGradeOp,
    category: "op",
    icon: "op",
  },
  {
    cmd: "Upgrade selected ops",
    func: CABLES_CMD_OP.upGradeOps,
    category: "op",
    icon: "op",
  },
  {
    cmd: "Clone selected op",
    func: CABLES_CMD_OP.cloneSelectedOp,
    category: "op",
    icon: "op",
  },
  {
    cmd: "Clone selected ops to patch ops",
    func: CABLES_CMD_OP.cloneSelectedOps,
    category: "op",
    icon: "op",
  },
  {
    cmd: "Create new version of op",
    func: CABLES_CMD_OP.createVersionSelectedOp,
    category: "op",
    icon: "op",
  },
  {
    cmd: "Manage selected op",
    func: CABLES_CMD_OP.manageOp,
    category: "op",
    icon: "op",
  },
  {
    cmd: "Edit op",
    category: "op",
    func: CABLES_CMD_OP.editOp,
    icon: "edit",
  },
  {
    cmd: "Rename op",
    func: CABLES_CMD_OP.renameOp,
    category: "op",
    icon: "op",
  },
  {
    cmd: "Copy op names to clipboard",
    func: CABLES_CMD_OP.copyNameClipboard,
    category: "op",
    icon: "op",
  },
  {
    cmd: "Reload changed ops",
    func: CABLES_CMD_OP.reloadChangedOps,
    category: "op",
    icon: "op",
  },
);
