import { Logger, ele } from "@cables/client";
import ModalDialog from "../dialogs/modaldialog.js";
import Gui from "../gui.js";
import { getHandleBarHtml } from "../utils/handlebars.js";
import { notify, notifyError } from "../elements/notification.js";
import AnalyzePatchTab from "../components/tabs/tab_analyze.js";
import Profiler from "../components/tabs/tab_profiler.js";
import OpParampanel from "../components/opparampanel/op_parampanel.js";
import GlOpWatcher from "../components/tabs/tab_glop.js";
import defaultOps from "../defaultops.js";
import subPatchOpUtil from "../subpatchop_util.js";
import gluiconfig from "../glpatch/gluiconfig.js";
import Exporter from "../dialogs/exporter.js";
import opNames from "../opnameutils.js";
import { platform } from "../platform.js";
import { portType } from "../core_constants.js";

const CABLES_CMD_PATCH = {};
const CMD_PATCH_COMMANDS = [];

const log = new Logger("CMD_PATCH");

const patchCommands = {
  commands: CMD_PATCH_COMMANDS,
  functions: CABLES_CMD_PATCH,
};

export default patchCommands;

CABLES_CMD_PATCH.setPatchTitle = () => {
  Gui.gui.patchView.store.showModalTitleDialog();
};

CABLES_CMD_PATCH.openParamsTab = () => {
  const ops = Gui.gui.patchView.getSelectedOps();
  if (!ops.length) return;

  const op = Gui.gui.patchView.getSelectedOps()[0];
  const id = "params" + CABLES.uuid();

  const tab = new CABLES.UI.Tab(op.name, {
    icon: "op",
    infotext: "tab_timeline",
    padding: true,
    singleton: false,
  });
  Gui.gui.mainTabs.addTab(tab, true);
  Gui.gui.maintabPanel.show(true);
  tab.html('<div id="' + id + '"></div<');

  const opParams = new OpParampanel();

  opParams.setParentElementId(id);
  opParams.show(op);
};

CABLES_CMD_PATCH.clearOpTitles = function () {
  let ops = Gui.gui.patchView.getSelectedOps();

  if (ops.length == 0) ops = Gui.gui.corePatch().ops;

  if (!ops || ops.length == 0) return;

  for (let i = 0; i < ops.length; i++) {
    const op = Gui.gui.corePatch().getOpById(ops[i].id);
    op.setTitle("");
  }
};

CABLES_CMD_PATCH.selectChilds = function () {
  const ops = Gui.gui.patchView.getSelectedOps();

  if (!ops || ops.length == 0) return;

  for (let i = 0; i < ops.length; i++) {
    const op = Gui.gui.corePatch().getOpById(ops[i].id);
    op.selectChilds();
  }

  Gui.gui.patchView.showSelectedOpsPanel();
};

CABLES_CMD_PATCH.autoPosSubpatchInputOutputOps = function () {
  const sub = Gui.gui.patchView.getCurrentSubPatch();
  if (!sub) return;
  Gui.gui.patchView.setPositionSubPatchInputOutputOps(sub);
};

CABLES_CMD_PATCH.gotoParentSubpatch = function () {
  const names = Gui.gui.patchView.getSubpatchPathArray(
    Gui.gui.patchView.getCurrentSubPatch(),
  );

  if (names.length == 0) return;
  if (names.length == 1) Gui.gui.patchView.setCurrentSubPatch(0);
  else Gui.gui.patchView.setCurrentSubPatch(names[names.length - 1].id);
};

CABLES_CMD_PATCH.selectAllOps = function () {
  Gui.gui.patchView.selectAllOpsSubPatch(
    Gui.gui.patchView.getCurrentSubPatch(),
  );
};

CABLES_CMD_PATCH.deleteSelectedOps = function () {
  Gui.gui.patchView.deleteSelectedOps();
};

CABLES_CMD_PATCH.reload = function () {
  platform.talkerAPI.send("reload");
};

CABLES_CMD_PATCH.save = function (force, cb) {
  if (Gui.gui.getRestriction() < Gui.gui.RESTRICT_MODE_FULL) {
    notifyError("Not allowed");
    return;
  }
  if (platform.isSaving()) {
    log.log("already saving...");
    return;
  }

  Gui.gui.patchView.store.saveCurrentProject(cb, undefined, undefined, force);

  const ops = Gui.gui.savedState.getUnsavedPatchSubPatchOps();

  for (let i = 0; i < ops.length; i++) {
    const name = ops[i].op.shortName;
    subPatchOpUtil.updateSubPatchOpAttachment(ops[i].op, {
      oldSubId: ops[i].subId,
    });
  }
};

CABLES_CMD_PATCH.saveAs = function () {
  Gui.gui.patchView.store.saveAs();
};

CABLES_CMD_PATCH.createBackup = function () {
  platform.createBackup();
};

CABLES_CMD_PATCH.clear = function () {
  Gui.gui.patchView.clearPatch();
};

CABLES_CMD_PATCH.createAreaFromSelection = function () {
  Gui.gui.patchView.createAreaFromSelection();
};

CABLES_CMD_PATCH.deleteUnusedPatchOps = function () {
  const opdocs = Gui.gui.opDocs.getAll();
  let text = "";
  let ids = [];

  for (let i = 0; i < opdocs.length; i++) {
    if (opdocs[i].name.indexOf("Ops.Patch") == 0) {
      const usedOps = Gui.gui.corePatch().getOpsByOpId(opdocs[i].id);

      if (ids.indexOf(opdocs[i].id) == -1 && usedOps.length == 0) {
        text += "- " + opdocs[i].name + "<br/>";
        ids.push(opdocs[i].id);
        log.log("found patch op", opdocs[i].id);
      }
    }
  }

  if (ids.length === 0) {
    new ModalDialog({
      title: "Unused Patch Ops",
      text: "No unused patch ops found.",
      showOkButton: true,
    });
  } else {
    // this will open an iframe tab an listen to "opsDeleted" that is sent by the iframe
    const idsParam = ids.join(",");
    const url =
      platform.getCablesUrl() + "/op/delete?ids=" + idsParam + "&iframe=true";
    Gui.gui.mainTabs.addIframeTab(
      "Delete Ops",
      url,
      {
        icon: "ops",
        closable: true,
        singleton: true,
        gotoUrl: platform.getCablesUrl() + "/op/delete?ids=" + idsParam,
      },
      true,
    );
  }
};

CABLES_CMD_PATCH.createSubPatchOp = function () {
  if (
    !Gui.gui.project().allowEdit &&
    Gui.gui.patchView.getCurrentSubPatch() == 0
  ) {
    new ModalDialog({
      title: "You don't have write access",
      showOkButton: true,
    });
    return;
  }

  let suggestedNamespace = platform.getPatchOpsNamespace();
  if (Gui.gui.patchView.getCurrentSubPatch() != 0) {
    const subOuter = Gui.gui.patchView.getSubPatchOuterOp(
      Gui.gui.patchView.getCurrentSubPatch(),
    );
    if (subOuter) {
      if (!Gui.gui.opDocs.getOpDocByName(subOuter.objName).allowEdit) {
        new ModalDialog({
          title: "You don't have write access in this subPatchOp",
          showOkButton: true,
        });
        return;
      }

      const parts = subOuter.objName.split(".");

      if (parts.length > 1)
        suggestedNamespace = parts[0] + "." + parts[1] + "." + parts[2] + ".";
    }
  }

  const dialogOptions = {
    title: "Create operator",
    shortName: subPatchOpUtil.getAutoName(true),
    type: "patch",
    suggestedNamespace: suggestedNamespace,
    showReplace: false,
    hasOpDirectories: platform.frontendOptions.hasOpDirectories,
  };

  if (Gui.gui.patchView.getCurrentSubPatch() != 0) {
    const outerOp = Gui.gui.patchView.getSubPatchOuterOp(
      Gui.gui.patchView.getCurrentSubPatch(),
    );
    if (outerOp) {
      const containerName = outerOp.objName;
      dialogOptions.sourceOpName = containerName;
    }
  }

  Gui.gui.serverOps.opNameDialog(
    dialogOptions,
    (newNamespace, newName, options) => {
      Gui.gui.closeModal();
      CABLES_CMD_PATCH.createOpFromSelection({
        newOpName: newName,
        ignoreNsCheck: true,
        ...options,
      });
    },
  );
};

CABLES_CMD_PATCH.centerOpsInSubpatch = function () {
  Gui.gui.patchView.centerSubPatchBounds(
    Gui.gui.patchView.getCurrentSubPatch(),
  );
};

CABLES_CMD_PATCH.createOpFromSelection = function (options = {}) {
  if (!options.ignoreNsCheck) {
    if (Gui.gui.patchView.getCurrentSubPatch() != 0) {
      const subOuter = Gui.gui.patchView.getSubPatchOuterOp(
        Gui.gui.patchView.getCurrentSubPatch(),
      );
      if (subOuter && subOuter.objName.indexOf("Ops.Patch.") != 0) {
        CABLES_CMD_PATCH.createSubPatchOp();
        return;
      }
    }
  }

  const origOpsBounds = Gui.gui.patchView.getSelectionBounds();
  Gui.gui.patchView.patchRenderer.subPatchOpAnimStart(origOpsBounds, () => {
    const selops = Gui.gui.patchView.getSelectedOps();

    let selectedOpIds = Gui.gui.patchView.getSelectedOpsIds();
    const newOpname = options.newOpName || subPatchOpUtil.getAutoName();
    const currentSubpatch = Gui.gui.patchView.getCurrentSubPatch();
    // const loadingModal = Gui.gui.startModalLoading("Create Subpatch");

    for (let i = 0; i < selops.length; i++) {
      if (selops[i].isSubPatchOp()) {
        if (selops[i].storage && selops[i].storage.subPatchVer != 2) {
          new ModalDialog({
            title: "Can not create subPatchOp",
            text: "not possible To create a subpatch op containing old subpatches. ",
            showOkButton: true,
          });

          return;
        }
      }
    }

    Gui.gui.serverOps.create(
      newOpname,
      () => {
        let newselectedOpIds = [];

        for (let i = 0; i < selectedOpIds.length; i++) {
          Gui.gui.patchView.selectOpId(selectedOpIds[i]);

          const op = Gui.gui.corePatch().getOpById(selectedOpIds[i]);
          if (op.isSubPatchOp()) {
            const newops = gui
              .corePatch()
              .getSubPatchOps(op.patchId.get(), false);
            for (let j = 0; j < newops.length; j++)
              newselectedOpIds.push(newops[j].id);
          }
        }

        Gui.gui.patchView.createSubPatchFromSelection(
          2,
          (patchId, OpTempSubpatch) => {
            const portJson = { ports: [] };
            const oldLinks = [];

            // find ops that are crosslinked...
            const ops = Gui.gui.corePatch().getSubPatchOps(patchId);

            let unlink = [];
            for (let i = 0; i < ops.length; i++) {
              const op = ops[i];
              for (let j = 0; j < op.portsIn.length; j++) {
                const portIn = op.portsIn[j];
                let pJson;
                for (let k = 0; k < op.portsIn[j].links.length; k++) {
                  if (portIn.isLinked() && portIn.links[k]) {
                    const p2 = portIn.links[k].getOtherPort(portIn);
                    if (p2.op.uiAttribs.subPatch != op.uiAttribs.subPatch) {
                      if (k == 0) {
                        pJson =
                          subPatchOpUtil.createBlueprintPortJsonElement(portIn);
                        portJson.ports.push(pJson);
                      }

                      op.setUiAttrib({ tempSubOldOpId: op.id });
                      oldLinks.push({
                        pJson: pJson,
                        port: p2,
                        tempSubOldOpId: op.id,
                        origPortName: portIn.name,
                      });
                      unlink.push(portIn.links[k]);
                    }
                  }
                }
              }

              for (let j = 0; j < op.portsOut.length; j++) {
                const portOut = op.portsOut[j];
                if (portOut.isLinked()) {
                  let pJson = null;
                  for (let k = 0; k < portOut.links.length; k++) {
                    const p2 = portOut.links[k].getOtherPort(portOut);
                    if (p2.op.uiAttribs.subPatch != op.uiAttribs.subPatch) {
                      if (k == 0) {
                        pJson =
                          subPatchOpUtil.createBlueprintPortJsonElement(
                            portOut,
                          );
                        portJson.ports.push(pJson);
                      }
                      op.setUiAttrib({ tempSubOldOpId: op.id });
                      oldLinks.push({
                        pJson: pJson,
                        port: p2,
                        tempSubOldOpId: op.id,
                        origPortName: portOut.name,
                      });
                      unlink.push(portOut.links[k]);
                    }
                  }
                }
              }
            }

            unlink.forEach((l) => {
              l.remove();
            });

            Gui.gui.patchView.addOp(newOpname, {
              uiAttribs: {
                translate: { x: origOpsBounds.minX, y: origOpsBounds.minY },
              },
              onOpAdd: (newOp) => {
                subPatchOpUtil.createBlueprint2Op(
                  newOp,
                  OpTempSubpatch,
                  () => {
                    const src =
                      subPatchOpUtil.generatePortsAttachmentJsSrc(portJson);

                    Gui.gui.corePatch().deleteOp(OpTempSubpatch.id);
                    Gui.gui.patchView.setCurrentSubPatch(currentSubpatch);

                    platform.talkerAPI.send(
                      "opUpdate",
                      {
                        opname: newOpname,
                        update: {
                          attachments: {
                            "att_inc_gen_ports.js": src,
                            "att_ports.json": JSON.stringify(portJson),
                          },
                        },
                      },
                      (err, r) => {
                        if (err) {
                          this.showApiError(err);
                          return;
                        }

                        Gui.gui.serverOps.execute(newOpname, (newOps) => {
                          newOp = newOps[0];

                          const subPatchId = newOp.patchId.get();

                          // relink inside ports....
                          const subOps = gui
                            .corePatch()
                            .getSubPatchOps(subPatchId, false);
                          for (let j = 0; j < oldLinks.length; j++) {
                            // outer linking
                            const oldLink = oldLinks[j];

                            if (oldLink.pJson) {
                              newOp.patch.link(
                                newOp,
                                oldLink.pJson.id,
                                oldLink.port.op,
                                oldLink.port.name,
                              );

                              for (let i = 0; i < subOps.length; i++) {
                                const op = subOps[i];
                                if (
                                  op.uiAttribs.tempSubOldOpId ==
                                  oldLink.tempSubOldOpId
                                ) {
                                  let patchInputOP = gui
                                    .corePatch()
                                    .getSubPatch2InnerInputOp(subPatchId);
                                  let l = newOp.patch.link(
                                    patchInputOP,
                                    "innerOut_" + oldLink.pJson.id,
                                    op,
                                    oldLink.origPortName,
                                  );

                                  if (!l) {
                                    let patchOutputOP = gui
                                      .corePatch()
                                      .getSubPatch2InnerOutputOp(subPatchId);
                                    l = newOp.patch.link(
                                      patchOutputOP,
                                      "innerIn_" + oldLink.pJson.id,
                                      op,
                                      oldLink.origPortName,
                                    );
                                  }

                                  if (!l)
                                    log.log(
                                      "could not recreate oldlink",
                                      oldLink,
                                    );
                                }
                              }
                            }
                          }

                          for (let i = 0; i < subOps.length; i++)
                            subOps[i].setUiAttrib({ tempSubOldOpId: null });

                          if (selectedOpIds.length == 0) newOp.setPos(0, 0);
                          else
                            newOp.setPos(
                              origOpsBounds.minX,
                              origOpsBounds.minY,
                            );

                          Gui.gui.patchView.testCollision(newOp);
                          Gui.gui.patchView.setPositionSubPatchInputOutputOps(
                            subPatchId,
                          );

                          if (
                            !Gui.gui.savedState.getStateBlueprint(subPatchId)
                          ) {
                            subPatchOpUtil.updateSubPatchOpAttachment(newOp, {
                              oldSubId: subPatchId,
                              next: () => {
                                /*
                                 * log.log("bp", bp);
                                 * CABLES.CMD.PATCH.save();
                                 */
                              },
                            });
                          }
                          Gui.gui.patchView.patchRenderer.focusOpAnim(newOp.id);
                          Gui.gui.patchView.patchRenderer.subPatchOpAnimEnd(
                            newOp.id,
                          );
                          Gui.gui.emitEvent(
                            "createdSubPatchOp",
                            newOp,
                            subPatchId,
                          );
                        });
                      },
                    );
                  },
                  { doNotExecute: true },
                );
              },
            });
          },
          { translate: { x: 0, y: 0 } },
        );
      },
      false,
      { noLoadOp: true, ...options },
    );
  });
};

/*
 * CABLES_CMD_PATCH.createSubPatchFromSelection = function (version)
 * {
 *     Gui.gui.patchView.createSubPatchFromSelection(version);
 * };
 */

CABLES_CMD_PATCH.findCommentedOps = function () {
  Gui.gui.find(":commented");
};

CABLES_CMD_PATCH.findUnconnectedOps = function () {
  Gui.gui.find(":unconnected");
};

CABLES_CMD_PATCH.findUserOps = function () {
  Gui.gui.find(":user");
};

CABLES_CMD_PATCH.findOpsUsingExternalAssets = function () {
  Gui.gui.find(":extassets");
};

CABLES_CMD_PATCH.createFile = function () {
  Gui.gui.showFileManager(function () {
    Gui.gui.fileManager.createFile();
  });
};

CABLES_CMD_PATCH.uploadFile = function () {
  if (!Gui.gui) return;
  const fileElem = document.getElementById("hiddenfileElem");
  if (fileElem) fileElem.click();
};

CABLES_CMD_PATCH.reuploadFile = function (id, fileName) {
  if (!Gui.gui || !fileName) return;
  CABLES.reuploadName = fileName;
  const fileEle = ele.byId("fileReUpload" + id);
  if (fileEle && fileEle.dataset.filePath)
    CABLES.reuploadName = fileEle.dataset.filePath;
  const uploadEle = ele.byId("hiddenfileElemReupload");
  if (uploadEle) uploadEle.click();
};

CABLES_CMD_PATCH.uploadFileDialog = function () {
  if (!Gui.gui || !Gui.gui.project()) return;
  const fileElem = document.getElementById("uploaddialog");

  if (!fileElem) {
    const html = getHandleBarHtml("dialog_upload", {
      patchId: Gui.gui.project()._id,
    });

    new ModalDialog({ html: html });
  }
};

CABLES_CMD_PATCH.uploadFileTab = () => {
  const url =
    platform.getCablesUrl() +
    "/patch/" +
    Gui.gui.project()._id +
    "/settings/upload?iframe=true";
  Gui.gui.mainTabs.addIframeTab(
    "Upload File",
    url,
    {
      icon: "settings",
      closable: true,
      singleton: true,
    },
    true,
  );
};

CABLES_CMD_PATCH.showBackups = () => {
  const url =
    platform.getCablesUrl() +
    "/patch/" +
    Gui.gui.project()._id +
    "/settings?iframe=true#versions";
  const gotoUrl =
    platform.getCablesUrl() +
    "/patch/" +
    Gui.gui.project()._id +
    "/settings#versions";
  Gui.gui.mainTabs.addIframeTab(
    "Patch Backups",
    url,
    {
      icon: "settings",
      closable: true,
      singleton: true,
      gotoUrl: gotoUrl,
    },
    true,
  );
};

CABLES_CMD_PATCH.export = function (type) {
  const exporter = new Exporter(
    Gui.gui.project(),
    platform.getPatchVersion(),
    type,
  );
  exporter.show();
};

CABLES_CMD_PATCH.newPatch = function () {
  Gui.gui.createProject();
};

CABLES_CMD_PATCH.addOpByName = (name) => {
  new ModalDialog({
    prompt: true,
    title: "Add Op",
    text: "Enter full op name",
    promptValue: name,
    promptOk: (opname) => {
      Gui.gui.serverOps.loadOpDependencies(opname, function () {
        Gui.gui.patchView.addOp(opname, {
          onOpAdd: (op) => {
            op.setUiAttrib({
              translate: {
                x: Gui.gui.patchView.patchRenderer.viewBox.mousePatchX,
                y: Gui.gui.patchView.patchRenderer.viewBox.mousePatchY,
              },
            });
            if (op) {
              Gui.gui.patchView.focusOp(op.id);
            }
          },
        });
      });
    },
  });
};

CABLES_CMD_PATCH.reloadOp = function (x, y) {
  const ops = Gui.gui.patchView.getSelectedOps();
  if (!ops.length) return;

  const op = Gui.gui.patchView.getSelectedOps()[0];

  Gui.gui.serverOps.execute(op.opId, () => {
    notify("reloaded op " + op.objName);
  });
};

CABLES_CMD_PATCH.addOp = function (x, y) {
  Gui.gui.opSelect().show({ x: 0, y: 0 });
};

CABLES_CMD_PATCH.patchWebsite = function () {
  window.open(
    platform.getCablesUrl() + "/p/" + Gui.gui.project().shortId ||
      Gui.gui.project()._id,
  );
};

CABLES_CMD_PATCH.renameVariable = function (oldname) {
  new ModalDialog({
    prompt: true,
    title: "Rename Variable",
    text: "Enter a new name for the variable " + oldname,
    promptValue: oldname,
    promptOk: (newname) => {
      Gui.gui.corePatch().emitEvent("variableRename", oldname, newname);
      Gui.gui.corePatch().deleteVar(oldname);
    },
  });
};

CABLES_CMD_PATCH.createVariable = function (op) {
  new ModalDialog({
    prompt: true,
    title: "New Variable",
    text: "Enter a name for the new variable",
    promptValue: "",
    promptOk: (str) => {
      if (op) {
        op.setTitle(str);
        op.varName.set(str);
        Gui.gui.opParams.show(op);
      }
    },
  });
};

CABLES_CMD_PATCH.createVarNumber = function (next) {
  new ModalDialog({
    prompt: true,
    title: "New Variable",
    text: "Enter a name for the new variable",
    promptValue: "myNewVar",
    promptOk: (str) => {
      const opSetter = Gui.gui.patchView.addOp(
        defaultOps.defaultOpNames.VarSetNumber,
      );
      const opGetter = Gui.gui.patchView.addOp(
        defaultOps.defaultOpNames.VarGetNumber,
      );

      opSetter.varName.set(str);
      opGetter.varName.set(str);
    },
  });
};

CABLES_CMD_PATCH.analyze = function (force) {
  new AnalyzePatchTab();
};

CABLES_CMD_PATCH._createVariable = function (name, p, p2, value, next) {
  const getsetOp = opNames.getVarGetterOpNameByType(p.type, p);

  let portName = getsetOp.portName;
  let portNameOut = getsetOp.portNameOut;
  let opSetterName = getsetOp.setter;
  let opGetterName = getsetOp.getter;

  Gui.gui.patchView.addOp(opSetterName, {
    onOpAdd: (opSetter) => {
      Gui.gui.patchView.addOp(opGetterName, {
        onOpAdd: (opGetter) => {
          opSetter.uiAttr({ subPatch: Gui.gui.patchView.getCurrentSubPatch() });
          opGetter.uiAttr({ subPatch: Gui.gui.patchView.getCurrentSubPatch() });

          if (p.type != portType.trigger)
            opSetter.getPortByName(portName).set(value);

          if (p.direction == CABLES.Port.DIR_IN) {
            p.op.patch.link(opGetter, portName, p.op, p.name);
            if (p2) p2.op.patch.link(opSetter, portNameOut, p2.op, p2.name);
          } else {
            p.op.patch.link(opSetter, portName, p.op, p.name);
            if (p2) p2.op.patch.link(opGetter, portNameOut, p2.op, p2.name);
          }

          opSetter.varName.set(name);
          opGetter.varName.set(name);

          Gui.gui.patchView.setCurrentSubPatch(
            Gui.gui.patchView.getCurrentSubPatch(),
          );

          if (next) next(opSetter, opGetter);

          Gui.gui.closeModal();
        },
      });
    },
  });
};

CABLES_CMD_PATCH.replaceLinkTriggerReceiveExist = function () {
  const link = CABLES.UI.OPSELECT.linkNewLink;
  const p = link.portIn;
  const portOut = link.portOut;
  CABLES.UI.OPSELECT.linkNewLink = null;

  Gui.gui.opSelect().close();
  Gui.gui.closeModal();
  const getsetOp = opNames.getVarGetterOpNameByType(p.type, p);

  Gui.gui.patchView.addOp(getsetOp.getter, {
    onOpAdd: (opGetter) => {
      link.remove();
      p.removeLinks();
      p.op.patch.link(opGetter, getsetOp.portNameOut, p.op, p.name);

      opGetter.uiAttr({
        subPatch: Gui.gui.patchView.getCurrentSubPatch(),
        translate: {
          x: p.op.uiAttribs.translate.x + 20,
          y: p.op.uiAttribs.translate.y - 40,
        },
      });
    },
  });
};

CABLES_CMD_PATCH.createTriggerSendReceiveExist = function () {
  const type = CABLES.UI.OPSELECT.linkNewOpToPort.type;
  const p = CABLES.UI.OPSELECT.linkNewOpToPort;

  Gui.gui.opSelect().close();
  Gui.gui.closeModal();
  const getsetOp = opNames.getVarGetterOpNameByType(type, p);
  CABLES.UI.OPSELECT.linkNewOpToPort = null;

  let getset = getsetOp.setter;
  if (p.direction == CABLES.Port.DIR_IN) getset = getsetOp.getter;

  Gui.gui.patchView.addOp(getset, {
    onOpAdd: (op) => {
      let off = -40;

      if (p.direction == CABLES.Port.DIR_IN) {
        p.op.patch.link(op, getsetOp.portNameOut, p.op, p.name);
      } else {
        p.op.patch.link(op, getsetOp.portName, p.op, p.name);
        off *= -1;
      }

      op.uiAttr({
        subPatch: Gui.gui.patchView.getCurrentSubPatch(),
        translate: {
          x: p.op.uiAttribs.translate.x + 20,
          y: p.op.uiAttribs.translate.y + off,
        },
      });
    },
  });
};

CABLES_CMD_PATCH.replaceLinkVariableExist = function () {
  const link = CABLES.UI.OPSELECT.linkNewLink;
  const p = link.portIn;
  const portOut = link.portOut;
  CABLES.UI.OPSELECT.linkNewLink = null;

  Gui.gui.opSelect().close();
  Gui.gui.closeModal();
  const getsetOp = opNames.getVarGetterOpNameByType(p.type, p);

  Gui.gui.patchView.addOp(getsetOp.getter, {
    onOpAdd: (opGetter) => {
      link.remove();
      p.removeLinks();

      p.op.patch.link(opGetter, getsetOp.portName, p.op, p.name);

      opGetter.uiAttr({
        subPatch: Gui.gui.patchView.getCurrentSubPatch(),
        translate: {
          x: p.op.uiAttribs.translate.x + 20,
          y: p.op.uiAttribs.translate.y - 40,
        },
      });
    },
  });
};

CABLES_CMD_PATCH.addLinkReroute = function () {
  const link = CABLES.UI.OPSELECT.linkNewLink;
  const p = link.portIn;
  const portOut = link.portOut;
  CABLES.UI.OPSELECT.linkNewLink = null;

  Gui.gui.opSelect().close();
  Gui.gui.closeModal();
  const getsetOp = opNames.getRerouteOp(p.type);

  Gui.gui.patchView.addOp(getsetOp, {
    onOpAdd: (opGetter) => {
      const glPatch = Gui.gui.patchView.patchRenderer;
      let x = glPatch._lastMouseX;
      let y = glPatch._lastMouseY;

      opGetter.uiAttr({
        subPatch: Gui.gui.patchView.getCurrentSubPatch(),
      });

      setTimeout(() => {
        x = glPatch.snap.snapX(x);
        y = glPatch.snap.snapY(y);

        Gui.gui.patchView.insertOpInLink(link, opGetter, x, y);
      }, 100);
    },
  });
};

CABLES_CMD_PATCH.createLinkVariableExist = function (createTrigger = false) {
  Gui.gui.opSelect().close();
  const type = CABLES.UI.OPSELECT.linkNewOpToPort.type;
  const p = CABLES.UI.OPSELECT.linkNewOpToPort;

  Gui.gui.closeModal();
  const getsetOp = opNames.getVarGetterOpNameByType(type, p);
  CABLES.UI.OPSELECT.linkNewOpToPort = null;

  let opFunction = getsetOp.getter;
  let newOpX = p.op.uiAttribs.translate.x + 20;
  let newOpY = p.op.uiAttribs.translate.y - 40;
  if (p.direction === CABLES.Port.DIR_OUT) {
    if (createTrigger) {
      opFunction = getsetOp.setTrigger;
    } else {
      opFunction = getsetOp.setter;
    }
    newOpY = p.op.uiAttribs.translate.y + 40;
  }

  Gui.gui.patchView.addOp(opFunction, {
    onOpAdd: (opGetter) => {
      p.removeLinks();
      p.op.patch.link(opGetter, getsetOp.portName, p.op, p.name);

      opGetter.uiAttr({
        subPatch: Gui.gui.patchView.getCurrentSubPatch(),
        translate: {
          x: newOpX,
          y: newOpY,
        },
      });
    },
  });
};

CABLES_CMD_PATCH.replaceLinkVariable = function () {
  Gui.gui.opSelect().close();
  new ModalDialog({
    prompt: true,
    title: "New Variable",
    text: "Enter a name for the new variable",
    promptValue: "",
    promptOk: (str) => {
      const link = CABLES.UI.OPSELECT.linkNewLink;

      const p1 = link.portIn;
      const p2 = link.portOut;
      CABLES.UI.OPSELECT.linkNewLink = null;

      if (p1.direction == CABLES.Port.DIR_IN) p1.removeLinks();
      else p2.removeLinks();

      link.remove();

      CABLES_CMD_PATCH._createVariable(
        str,
        p2,
        p1,
        p2.get(),
        (setter, getter) => {
          getter.uiAttr({
            translate: {
              x: p1.op.uiAttribs.translate.x,
              y: p1.op.uiAttribs.translate.y - 40,
            },
          });

          setter.uiAttr({
            translate: {
              x: p2.op.uiAttribs.translate.x,
              y: p2.op.uiAttribs.translate.y + 40,
            },
          });
        },
      );
    },
  });
};

CABLES_CMD_PATCH.createTriggerSendReceive = () => {
  Gui.gui.opSelect().close();
  const link = CABLES.UI.OPSELECT.linkNewLink;

  new ModalDialog({
    prompt: true,
    title: "New Trigger Send",
    text: "Enter a name for a new wireless trigger",
    promptValue: link.portOut.name,
    promptOk: (str) => {
      const p1 = link.portIn;
      const p2 = link.portOut;
      CABLES.UI.OPSELECT.linkNewLink = null;

      if (p1.direction == CABLES.Port.DIR_IN) p1.removeLinks();
      else p2.removeLinks();

      link.remove();

      CABLES_CMD_PATCH._createVariable(
        str,
        p2,
        p1,
        p2.get(),
        (setter, getter) => {
          getter.uiAttr({
            subPatch: Gui.gui.patchView.getCurrentSubPatch(),
            translate: {
              x: p1.op.uiAttribs.translate.x,
              y: p1.op.uiAttribs.translate.y - 40,
            },
          });

          setter.uiAttr({
            subPatch: Gui.gui.patchView.getCurrentSubPatch(),
            translate: {
              x: p2.op.uiAttribs.translate.x,
              y: p2.op.uiAttribs.translate.y + 40,
            },
          });
        },
      );
    },
  });
};

CABLES_CMD_PATCH.createAutoVariable = function () {
  Gui.gui.opSelect().close();
  const p = CABLES.UI.OPSELECT.linkNewOpToPort;

  new ModalDialog({
    prompt: true,
    title: "New Variable",
    text: "Enter a name for the new variable",
    promptValue: p.name,
    promptOk: (str) => {
      CABLES_CMD_PATCH._createVariable(
        str,
        p,
        null,
        p.get(),
        (setter, getter) => {
          if (!setter.uiAttribs.translate)
            setter.uiAttr({
              subPatch: Gui.gui.patchView.getCurrentSubPatch(),
              translate: {
                x: p.op.uiAttribs.translate.x,
                y: p.op.uiAttribs.translate.y + 40,
              },
            });

          getter.uiAttr({
            subPatch: Gui.gui.patchView.getCurrentSubPatch(),
            translate: {
              x: setter.uiAttribs.translate.x,
              y: setter.uiAttribs.translate.y + 40,
            },
          });
        },
      );
    },
  });
};

CABLES_CMD_PATCH.addSpaceX = () => {
  Gui.gui.patchView.addSpaceBetweenOpsX();
};

CABLES_CMD_PATCH.addSpaceY = () => {
  Gui.gui.patchView.addSpaceBetweenOpsY();
};

CABLES_CMD_PATCH.linkTwoSelectedOps = () => {
  if (Gui.gui.patchView.getSelectedOps().length != 2) {
    log.log("needs 2 selected ops");
    return;
  }

  let a = Gui.gui.patchView.getSelectedOps()[0];
  let b = Gui.gui.patchView.getSelectedOps()[1];

  if (a.uiAttribs.translate.y > b.uiAttribs.translate.y)
    Gui.gui.patchView.suggestionBetweenTwoOps(b, a);
  else Gui.gui.patchView.suggestionBetweenTwoOps(a, b);
};

CABLES_CMD_PATCH.compressOps = () => {
  Gui.gui.patchView.compressSelectedOps(Gui.gui.patchView.getSelectedOps());
};

CABLES_CMD_PATCH.alignOpsLeft = () => {
  Gui.gui.patchView.alignSelectedOpsVert(Gui.gui.patchView.getSelectedOps());
};

CABLES_CMD_PATCH.watchGlOp = function () {
  new GlOpWatcher(Gui.gui.mainTabs);
  Gui.gui.maintabPanel.show(true);
};

CABLES_CMD_PATCH.savePatchScreenshot = function () {
  Gui.gui.patchView.patchRenderer._cgl.saveScreenshot(
    "patchfield_" + performance.now(),
    () => {
      Gui.gui.patchView.patchRenderer._cgl.patch.resume();
    },
  );
};

CABLES_CMD_PATCH.toggleResizable = function () {
  const ops = Gui.gui.patchView.getSelectedOps();

  for (let i = 0; i < ops.length; i++) {
    const op = ops[i];

    op.setUiAttribs({
      stretchPorts: !op.uiAttribs.stretchPorts,
      resizableY: false,
      resizable: !op.uiAttribs.stretchPorts,
    });
  }
};

CABLES_CMD_PATCH.setOpTitle = function () {
  const ops = Gui.gui.patchView.getSelectedOps();

  if (ops.length != 1) {
    log.warn("rename canceled - select one op!");
    return;
  }

  new ModalDialog({
    prompt: true,
    title: "Set Title",
    text: "Enter a title for this op",
    promptValue: ops[0].name,
    promptOk: (name) => {
      Gui.gui.opParams.setCurrentOpTitle(name);
    },
  });
};

CABLES_CMD_PATCH.resume = function () {
  Gui.gui.corePatch().resume();
};

CABLES_CMD_PATCH.pause = function () {
  Gui.gui.corePatch().pause();
};

CABLES_CMD_PATCH.replaceOp = function () {
  new ModalDialog({
    prompt: true,
    title: "Replace Ops",
    text: "Replace selected ops with: Enter full op name",
    promptOk: (opname) => {
      const ops = Gui.gui.patchView.getSelectedOps();
      for (let i = 0; i < ops.length; i++) {
        Gui.gui.patchView.replaceOp(ops[i].id, opname);
      }
    },
  });
};

CABLES_CMD_PATCH.editOpSummary = function (opId, opName, oldSummary = "") {
  if (!platform.frontendOptions.editOpSummary) return;

  new ModalDialog({
    prompt: true,
    title: opName,
    text: "New summary:",
    promptValue: oldSummary,
    promptOk: (summary) => {
      Gui.gui.savingTitleAnimStart("Updating Op...");
      platform.talkerAPI.send(
        "opSetSummary",
        { id: opId, name: opName, summary: summary },
        (err, res) => {
          if (!err) {
            Gui.gui.serverOps.loadOpDependencies(
              opName,
              () => {
                Gui.gui.savingTitleAnimEnd();
                Gui.gui.emitEvent("refreshManageOp", opName);
              },
              true,
            );
          }
        },
      );
    },
  });
};

CABLES_CMD_PATCH.uncollideOps = function (ops) {
  let found = true;
  // while (found)

  for (let i = 0; i < Gui.gui.corePatch().ops.length; i++) {
    const op = Gui.gui.corePatch().ops[i];

    if (!op.uiAttribs.translate) op.uiAttribs.translate = { x: 0, y: 0 };

    for (let j = 0; j < Gui.gui.corePatch().ops.length; j++) {
      const b = Gui.gui.corePatch().ops[j];
      if (b.deleted || b == op) continue;

      while (
        b.uiAttribs.translate &&
        op.uiAttribs.translate &&
        op.uiAttribs.translate.x <= b.uiAttribs.translate.x + 50 &&
        op.uiAttribs.translate.x >= b.uiAttribs.translate.x &&
        op.uiAttribs.translate.y == b.uiAttribs.translate.y
      ) {
        op.setUiAttrib({
          translate: {
            x: b.uiAttribs.translate.x,
            y: b.uiAttribs.translate.y + gluiconfig.newOpDistanceY,
          },
        });
        found = true;
      }
    }
  }
};

CABLES_CMD_PATCH.togglePatchLike = (targetElement = null) => {
  platform.talkerAPI.send("toggleFav", {}, (err, res) => {
    if (!err && res.success && targetElement) {
      if (targetElement.target) targetElement = targetElement.target;
      const icon = targetElement.querySelector(".icon");
      if (icon) {
        if (res.favstate) {
          icon.classList.remove("icon-heart");
          icon.classList.add("icon-heart-fill");
        } else {
          icon.classList.remove("icon-heart-fill");
          icon.classList.add("icon-heart");
        }
      }
    }
  });
};

CABLES_CMD_PATCH.deleteOp = (opName = null) => {
  if (!opName) {
    const ops = Gui.gui.patchView.getSelectedOps();
    if (!ops.length) return;
    const op = Gui.gui.patchView.getSelectedOps()[0];
    opName = op.objName;
  }

  if (platform.frontendOptions.opDeleteInEditor) {
    Gui.gui.serverOps.deleteDialog(opName);
  }
};

CABLES_CMD_PATCH.patchProfiler = () => {
  new Profiler(Gui.gui.mainTabs);
  Gui.gui.maintabPanel.show(true);
};

CMD_PATCH_COMMANDS.push(
  {
    cmd: "Select all ops",
    category: "patch",
    func: CABLES_CMD_PATCH.selectAllOps,
    hotkey: "CMD + a",
  },
  {
    cmd: "Delete selected ops",
    category: "patch",
    func: CABLES_CMD_PATCH.deleteSelectedOps,
    icon: "trash",
    hotkey: "DEL",
  },
  {
    cmd: "Save patch",
    category: "patch",
    func: CABLES_CMD_PATCH.save,
    icon: "save",
    hotkey: "[cmd_ctrl]`S`",
    infotext: "cmd_savepatch",
  },
  {
    cmd: "Save patch as...",
    category: "patch",
    func: CABLES_CMD_PATCH.saveAs,
    icon: "save",
    hotkey: "[cmd_ctrl][shift]`s`",
  },
  {
    cmd: "Upload file dialog",
    category: "patch",
    func: CABLES_CMD_PATCH.uploadFileDialog,
    icon: "file",
    frontendOption: "uploadFiles",
  },
  {
    cmd: "Upload file",
    category: "patch",
    func: CABLES_CMD_PATCH.uploadFile,
    icon: "file",
    frontendOption: "uploadFiles",
  },
  {
    cmd: "Create new file",
    category: "patch",
    func: CABLES_CMD_PATCH.createFile,
    icon: "file",
    frontendOption: "uploadFiles",
  },
  {
    cmd: "Select child ops",
    category: "op",
    func: CABLES_CMD_PATCH.selectChilds,
  },
  {
    cmd: "Clear op titles",
    category: "op",
    func: CABLES_CMD_PATCH.clearOpTitles,
  },

  /*
   * {
   *     "cmd": "Create subpatch",
   *     "category": "patch",
   *     "func": CABLES_CMD_PATCH.createSubPatchFromSelection,
   *     "icon": "subpatch"
   * },
   */
  {
    cmd: "Export static html",
    category: "patch",
    func: CABLES_CMD_PATCH.export,
    icon: "download",
    frontendOption: "showExport",
  },
  {
    cmd: "Show backups",
    category: "patch",
    func: CABLES_CMD_PATCH.showBackups,
    icon: "file",
    frontendOption: "showPatchBackups",
  },
  {
    cmd: "Create new patch",
    category: "patch",
    func: CABLES_CMD_PATCH.newPatch,
    icon: "file",
  },
  {
    cmd: "Reload op",
    category: "patch",
    func: CABLES_CMD_PATCH.reloadOp,
    icon: "op",
    infotext: "cmd_reloadop",
  },
  {
    cmd: "Add op",
    category: "patch",
    func: CABLES_CMD_PATCH.addOp,
    icon: "op",
    infotext: "cmd_addop",
  },
  {
    cmd: "Add op by name",
    category: "patch",
    func: CABLES_CMD_PATCH.addOpByName,
    icon: "op",
  },
  {
    cmd: "Set title",
    category: "op",
    func: CABLES_CMD_PATCH.setOpTitle,
    icon: "edit",
  },
  {
    cmd: "Toggle op resizable",
    category: "op",
    func: CABLES_CMD_PATCH.toggleResizable,
    icon: "op",
  },
  {
    cmd: "Clear patch",
    category: "patch",
    func: CABLES_CMD_PATCH.clear,
  },
  {
    cmd: "Open patch website",
    category: "patch",
    func: CABLES_CMD_PATCH.patchWebsite,
    icon: "link",
    frontendOption: "hasCommunity",
  },
  {
    cmd: "Pause patch execution",
    category: "patch",
    func: CABLES_CMD_PATCH.pause,
  },
  {
    cmd: "Resume patch execution",
    category: "patch",
    func: CABLES_CMD_PATCH.resume,
  },
  {
    cmd: "Replace file path",
    category: "patch",
    func: CABLES_CMD_PATCH.replaceFilePath,
  },
  {
    cmd: "Find unconnected ops",
    category: "patch",
    func: CABLES_CMD_PATCH.findUnconnectedOps,
  },
  {
    cmd: "Find user ops",
    category: "patch",
    func: CABLES_CMD_PATCH.findUserOps,
  },
  {
    cmd: "Find commented ops",
    category: "patch",
    func: CABLES_CMD_PATCH.findCommentedOps,
  },
  {
    cmd: "Find external assets",
    category: "patch",
    func: CABLES_CMD_PATCH.findOpsUsingExternalAssets,
  },
  {
    cmd: "Analyze patch",
    category: "patch",
    func: CABLES_CMD_PATCH.analyze,
  },
  {
    cmd: "Create number variable",
    category: "patch",
    func: CABLES_CMD_PATCH.createVarNumber,
  },
  {
    cmd: "Create backup",
    category: "patch",
    func: CABLES_CMD_PATCH.createBackup,
  },
  {
    cmd: "Align ops left",
    func: CABLES_CMD_PATCH.alignOpsLeft,
    category: "patch",
    icon: "align-left",
  },
  {
    cmd: "Compress ops vertically",
    func: CABLES_CMD_PATCH.compressOps,
    category: "patch",
    icon: "list",
  },
  {
    cmd: "Add space x",
    func: CABLES_CMD_PATCH.addSpaceX,
    category: "patch",
    icon: "list",
  },
  {
    cmd: "Add space y",
    func: CABLES_CMD_PATCH.addSpaceY,
    category: "patch",
    icon: "list",
  },
  {
    cmd: "Save patchfield screenshot",
    func: CABLES_CMD_PATCH.savePatchScreenshot,
    category: "patch",
    icon: "image",
  },
  {
    cmd: "Replace ops",
    func: CABLES_CMD_PATCH.replaceOp,
    category: "patch",
    icon: "op",
  },
  {
    cmd: "Link two selected ops",
    func: CABLES_CMD_PATCH.linkTwoSelectedOps,
    category: "patch",
    icon: "op",
  },

  {
    cmd: "Go to parent subpatch",
    func: CABLES_CMD_PATCH.gotoParentSubpatch,
    category: "patch",
  },
  {
    cmd: "Open params in tab",
    func: CABLES_CMD_PATCH.openParamsTab,
    category: "patch",
    icon: "op",
  },
  {
    cmd: "Show glop information",
    func: CABLES_CMD_PATCH.watchGlOp,
    category: "patch",
    icon: "op",
  },
  {
    cmd: "Uncollide ops",
    func: CABLES_CMD_PATCH.uncollideOps,
    category: "patch",
    icon: "op",
  },
  {
    cmd: "Toggle patch like",
    func: CABLES_CMD_PATCH.togglePatchLike,
    category: "patch",
  },
  {
    cmd: "Create subpatch op",
    func: CABLES_CMD_PATCH.createSubPatchOp,
    category: "patch",
    icon: "op",
  },
  {
    cmd: "Delete unused patch ops",
    func: CABLES_CMD_PATCH.deleteUnusedPatchOps,
    category: "patch",
    icon: "op",
  },
  {
    cmd: "Center ops in subpatch",
    func: CABLES_CMD_PATCH.centerOpsInSubpatch,
    category: "patch",
    icon: "op",
  },
  {
    cmd: "Set patch title",
    func: CABLES_CMD_PATCH.setPatchTitle,
    category: "patch",
    icon: "edit",
  },
  {
    cmd: "Auto position subpatch input output ops",
    func: CABLES_CMD_PATCH.autoPosSubpatchInputOutputOps,
    category: "op",
    icon: "op",
  },
  {
    cmd: "Reload patch",
    category: "patch",
    func: CABLES_CMD_PATCH.reload,
  },
  {
    cmd: "Patch Profiler",
    category: "patch",
    icon: "pie-chart",
    func: CABLES_CMD_PATCH.patchProfiler,
  },
);
