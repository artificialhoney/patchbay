import { portType } from "../../core_constants.js";
import Gui from "../../gui.js";
import namespace from "../../namespaceutils.js";
import opNames from "../../opnameutils.js";
import { platform } from "../../platform.js";
import text from "../../text.js";
import { handleBarPrecompiled } from "../../utils/handlebars.js";
import UserSettings from "../usersettings.js";

class PortHtmlGenerator {
  constructor(panelId) {
    this._panelId = panelId;
    this._templateHead = handleBarPrecompiled("params_op_head");
    this._templatePortGeneral = handleBarPrecompiled("params_port_general");
    this._templatePortGeneralEnd = handleBarPrecompiled(
      "params_port_general_end",
    );
    this._templatePortInput = handleBarPrecompiled("params_port_input");
    this._templatePortOutput = handleBarPrecompiled("params_port_output");
    this._templatePortsHead = handleBarPrecompiled("params_ports_head");
  }

  getHtmlOpHeader(op) {
    let isBookmarked = false;
    let oldversion = false;
    let newestVersion = false;
    let hasExample = false;
    let doc = null;

    if (op) isBookmarked = Gui.gui.bookmarks.hasBookmarkWithId(op.id);

    const canEditOp = Gui.gui.serverOps.canEditOp(Gui.gui.user, op.objName);
    if (namespace.isDeprecatedOp(op.objName)) {
      op.isDeprecated = true;
      const notDeprecatedName = op.objName.replace("Deprecated.", "");
      const alt = CABLES.Patch.getOpClass(notDeprecatedName);
      if (alt) op.isDeprecatedAlternative = notDeprecatedName;
    }
    if (namespace.isDevOp(op.objName)) op.isExperimental = true;

    if (Gui.gui.opDocs) {
      op.summary = Gui.gui.opDocs.getSummary(op.objName);
      doc = Gui.gui.opDocs.getOpDocByName(op.objName);
    }

    if (doc) {
      hasExample = doc.hasExample;
      if (doc.oldVersion) oldversion = doc.oldVersion;
      newestVersion = doc.newestVersion;
    }

    let opChanged = false;
    if (Gui.gui.serverOps.opIdsChangedOnServer[op.opId]) opChanged = true;

    const o = {
      op: op,
      panelid: this._panelId,
      frontendOptions: platform.frontendOptions,
      isBookmarked: isBookmarked,
      colorClass: opNames.getNamespaceClassName(op.objName),
      texts: text,
      user: Gui.gui.user,
      optitle: op.getTitle(),
      canEditOp: canEditOp,
      opChanged: opChanged,
      oldVersion: oldversion,
      minified: UserSettings.userSettings.get("minifiedOpHead"),
      newestVersion: newestVersion,
      cablesUrl: platform.getCablesUrl(),
      hasExample: hasExample,
    };

    o.cablesDocsUrl = platform.getCablesDocsUrl();

    return this._templateHead(o, {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    });
  }

  /**
   * @param {string} dir
   * @param {string} title
   */
  getHtmlHeaderPorts(dir, title) {
    return this._templatePortsHead(
      {
        dirStr: dir,
        title: title,
        texts: text,
      },
      { allowProtoPropertiesByDefault: true, allowProtoMethodsByDefault: true },
    );
  }

  /**
   * @param {Array<Port>} ports
   * @returns {string}
   */
  getHtmlInputPorts(ports) {
    let html = "";
    let lastGroup = null;

    for (let i = 0; i < ports.length; i++) {
      const opGroup = ports[i].uiAttribs.group;
      let startGroup = null;
      let groupSpacer = false;

      if (!ports[i].uiAttribs.hideParam) {
        if (lastGroup != opGroup && !opGroup) groupSpacer = true;

        if (lastGroup != opGroup) {
          groupSpacer = true;
          lastGroup = opGroup;
          startGroup = lastGroup;
        }
      }

      ports[i].watchId = "in_" + i;

      const tmplData = {
        port: ports[i],
        panelid: this._panelId,
        startGroup: startGroup,
        groupSpacer: groupSpacer,
        dirStr: "in",
        cablesUrl: platform.getCablesUrl(),
        openLocalFiles: platform.frontendOptions.openLocalFiles,
        portnum: i,
        isInput: true,
        op: ports[i].op,
        texts: text,
        vars: ports[i].op.patch.getVars(ports[i].type),
      };

      html += this._templatePortGeneral(tmplData, {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
      });
      html += this._templatePortInput(tmplData, {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
      });
      html += this._templatePortGeneralEnd(tmplData, {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
      });
    }
    return html;
  }

  /**
   * @param {Array<Port>} ports
   * @returns {string}
   */
  getHtmlOutputPorts(ports) {
    let lastGroup = null;
    let html = "";
    for (const i in ports) {
      if (
        ports[i].getType() == portType.number ||
        ports[i].getType() == portType.array ||
        ports[i].getType() == portType.string ||
        ports[i].getType() == portType.object
      )
        ports[i].watchId = "out_" + i;

      let startGroup = null;
      let groupSpacer = false;

      const opGroup = ports[i].uiAttribs.group;

      if (lastGroup != opGroup && !opGroup) groupSpacer = true;
      if (lastGroup != opGroup) {
        groupSpacer = true;
        lastGroup = opGroup;
        startGroup = lastGroup;
      }

      const tmplData = {
        port: ports[i],
        dirStr: "out",
        panelid: this._panelId,
        groupSpacer: groupSpacer,
        startGroup: startGroup,
        portnum: i,
        isInput: false,
        op: ports[i].op,
      };
      html += this._templatePortGeneral(tmplData, {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
      });
      html += this._templatePortOutput(tmplData, {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
      });
      html += this._templatePortGeneralEnd(tmplData, {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
      });
    }

    return html;
  }
}

export { PortHtmlGenerator };
