'use strict';

class ShaderGraphOp
{
    constructor(op, src)
    {
        op.sgOp = this;
        this._op = op;
        this._inPorts = [];
        this._outPorts = [];
        this._defines = [];
        this.enabled = true;
        this.info = null;

        if (src)
            this.parseCode(src);

        this._op.on("onLinkChanged", this.updateGraph.bind(this));
        this.addPortWatcher();
    }

    addPortWatcher()
    {
        for (let i = 0; i < this._op.portsIn.length; i++)
        {
            if (this._op.portsIn[i].type != CABLES.OP_PORT_TYPE_OBJECT) continue;

            if (this._op.portsIn[i].uiAttribs.objType && this._op.portsIn[i].uiAttribs.objType.indexOf("sg_") == 0) this._op.portsIn[i].setUiAttribs({ "display": "sg_vec" });

            this._op.portsIn[i].on("change", this.updateGraph.bind(this));
        }
    }

    updateGraph()
    {
        for (let i = 0; i < this._op.portsOut.length; i++)
        {
            if (this._op.portsOut[i].type != CABLES.OP_PORT_TYPE_OBJECT) continue;
            // this._op.portsOut[i].setRef(null);
            this._op.portsOut[i].setRef({});
        }
    }

    isTypeDef(str)
    {
        return str == "void" || str == "float" || str == "sampler2D" || str == "vec2" || str == "vec3" || str == "vec4" || str == "void" || str == "mat4" || str == "mat3" || str == "mat2" || str == "out";
    }

    parseCode(_code)
    {
        let code = _code;
        let info = { "functions": [], "uniforms": [] };

        const origLines = code.split("\n");
        const prelines = code.split("\n");

        for (let i = 0; i < prelines.length; i++)
            prelines[i] += "###line:" + i + ":###";

        code = prelines.join("\n");

        code = code.replaceAll("{{", ""); // remove spaces before brackets
        code = code.replaceAll("}}", ""); // remove spaces before brackets

        // code = code.replaceAll(/\/\*[\s\S]*?\*\/|\/\/.*/g, ""); // remove comments
        // code = code.replaceAll(/{[^{}]*}/g, "{}"); // remove function content
        code = code.replaceAll("\n{", "{");
        code = code.replaceAll(";", " ;"); // add spaces for better splitting
        // code = code.replaceAll("{", "{"); // remove spaces before brackets
        code = code.replaceAll("(", " ( "); // add spaces for better splitting
        code = code.replaceAll(")", " ) "); // add spaces for better splitting
        code = code.replaceAll(",", " , "); // add spaces for better splitting
        code = code.replace(/ +(?= )/g, ""); // remove double whitespaces

        // console.log(origLines);

        const lines = code.split("\n");

        // console.log(lines);

        for (let i = 0; i < lines.length; i++)
        {
            // identify function
            if (lines[i].indexOf("{") > 0 && lines[i].indexOf("(") > 0 && lines[i].indexOf(")") > 0)
            {
                const words = lines[i].split(" ");

                if (this.isTypeDef(words[0])) // function header start with return typedef
                {
                    // merge all the remaining lines to be able to search for the end of the function ...
                    let remainingcode = "";
                    for (let j = i; j < lines.length; j++) remainingcode += lines[j];

                    // search for all {} and find the end of the function body...
                    const startPos = remainingcode.indexOf("{");
                    let count = 0;
                    let cc = 0;
                    for (cc = startPos; cc < remainingcode.length; cc++)
                    {
                        if (remainingcode.charAt(cc) == "{") count++;
                        if (remainingcode.charAt(cc) == "}") count--;
                        if (count == 0) break;
                    }

                    // console.log("remainingcode", remainingcode);
                    // parse the first and last line numbers
                    let functioncode = remainingcode.substring(0, cc + 1);
                    const linenums = functioncode.split("###line:");

                    // console.log("functioncode", functioncode);
                    // console.log("linenums", linenums);

                    let lineNumStart = i, lineNumEnd = i - 1;
                    if (linenums.length > 1)
                    {
                        lineNumStart = parseInt(linenums[1].split(":")[0]);
                        lineNumEnd = parseInt(linenums[linenums.length - 1].split(":")[0]);
                    }

                    functioncode = "";

                    // concat the whole function
                    for (let j = lineNumStart; j <= lineNumEnd + 1; j++)
                        if (origLines[j])functioncode += origLines[j] + "\n";

                    const infoFunc = { "name": words[1], "type": words[0], "params": [], "src": functioncode };
                    infoFunc.uniqueName = words[0] + "_" + words[1];

                    // analyze function head and read all parameters
                    words.length = words.indexOf(")") + 1;
                    for (let j = 3; j < words.length - 2; j += 3)
                    {
                        infoFunc.params.push({ "name": words[j + 1], "type": words[j] });
                        infoFunc.uniqueName += "_" + words[j + 0] + "_" + words[j + 1];
                    }

                    info.functions.push(infoFunc);
                }
            }

            if (lines[i].indexOf("UNI") == 0 || lines[i].indexOf("uniform") == 0)
            {
                const words = lines[i].split(" ");
                if (this.isTypeDef(words[1])) info.uniforms.push({ "name": words[2], "type": words[1] });
            }
        }

        info.src = _code;
        // if (this._op.uiAttribs.comment)_code = "//" + this._op.uiAttribs.comment + "\n" + _code;

        this.info = info;
        this.updatePorts(this.info);

        return info;
    }

    updatePorts(info)
    {
        const foundPortInNames = {};
        this._op.shaderSrc = info.src;

        if (info.functions.length > 0)
        {
            const f = info.functions[info.functions.length - 1];
            this._op.setTitle(f.name);
            this._op.shaderFunc = f.name;

            for (let p = 0; p < f.params.length; p++)
            {
                const port = this._op.getPort(f.params[p].name) || this._op.inObject(f.params[p].name);

                // let changed = false;
                // if (port.uiAttribs.objType != f.params[p].type) changed = true;
                port.setUiAttribs({ "objType": "sg_" + f.params[p].type, "ignoreObjTypeErrors": true });
                // if (changed) port.setRef(port.get());

                this._inPorts.push(port);

                foundPortInNames[f.params[p].name] = true;
            }

            let port = this._op.getPort("Result");
            if (!port)
            {
                port = this._op.outObject("Result");
                this._outPorts.push(port);
            }

            // let changed = false;
            // if (port.uiAttribs.objType != f.type) changed = true;
            port.setUiAttribs({ "objType": "sg_" + f.type });
            // if (changed) port.setRef(port.get());
        }

        for (let i = 0; i < this._inPorts.length; i++) if (!foundPortInNames[this._inPorts[i].name]) this._inPorts[i].remove();

        this.addPortWatcher();
        this._op.refreshParams();
    }

    /**
 * add a define to a shader, e.g.  #define DO_THIS_THAT 1
 * @function define
 * @memberof Shader
 * @instance
 * @param {String} name
 * @param {Any} value (can be empty)
 */
    define(name, value)
    {
        if (value === null || value === undefined) value = "";

        if (typeof (value) == "object") // port
        {
            value.removeEventListener("change", value.onDefineChange);
            value.onDefineChange = (v) =>
            {
                this.define(name, v);
            };
            value.on("change", value.onDefineChange);

            value = value.get();
        }

        for (let i = 0; i < this._defines.length; i++)
        {
            if (this._defines[i][0] == name && this._defines[i][1] == value) return;
            if (this._defines[i][0] == name)
            {
                this._defines[i][1] = value;
                // this.setWhyCompile("define " + name + " " + value);

                // this._needsRecompile = true;
                return;
            }
        }
        // this.setWhyCompile("define " + name + " " + value);
        // this._needsRecompile = true;
        this._defines.push([name, value]);
        this.updateGraph();
    }

    getDefines()
    {
        return this._defines;
    }

    getDefine(name)
    {
        for (let i = 0; i < this._defines.length; i++)
            if (this._defines[i][0] == name) return this._defines[i][1];
        return null;
    }

    /**
  * return true if shader has define
  * @function hasDefine
  * @memberof Shader
  * @instance
  * @param {String} name
  * @return {Boolean}
  */
    hasDefine(name)
    {
        for (let i = 0; i < this._defines.length; i++)
            if (this._defines[i][0] == name) return true;
    }

    /**
  * remove a define from a shader
  * @param {name} name
  * @function removeDefine
  * @memberof Shader
  * @instance
  */
    removeDefine(name)
    {
        for (let i = 0; i < this._defines.length; i++)
        {
            if (this._defines[i][0] == name)
            {
                this._defines.splice(i, 1);
                // this._needsRecompile = true;

                // this.setWhyCompile("define removed:" + name);
                this.updateGraph();
                return;
            }
        }
    }

    toggleDefine(name, enabled)
    {
        if (enabled) this.define(name);
        else this.removeDefine(name);
        this.updateGraph();
    }
}

ShaderGraphOp.getMaxGenTypeFromPorts = (ports, portsSetType) =>
{
    const types = ["sg_float", "sg_vec2", "sg_vec3", "sg_vec4"];
    let typeIdx = 0;

    for (let j = 0; j < ports.length; j++)
        for (let i = 0; i < ports[j].links.length; i++)
        {
            const t = types.indexOf(ports[j].links[i].getOtherPort(ports[j]).uiAttribs.objType);
            typeIdx = Math.max(typeIdx, t);
        }

    const t = types[typeIdx];

    if (portsSetType)
        for (let i = 0; i < portsSetType.length; i++)
            portsSetType[i].setUiAttribs({ "objType": t });

    return t;
};

/**
 * Shared helper methods for cables uis
 */
class Helper {
  constructor() {
    this._simpleIdCounter = 0;
  }

  /**
   * generate a random v4 uuid
   *
   * @return {string}
   */
  uuid() {
    let d = new Date().getTime();
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
  }

  /**
   * checks value for !isNan and isFinite
   *
   * @param {string} n
   * @return {boolean}
   */
  isNumeric(n) {
    const nn = parseFloat(n);
    return !isNaN(nn) && isFinite(nn);
  }

  /**
   * generate a simple ID using an internal counter
   *
   * @return {Number} new id
   * @static
   */
  simpleId() {
    this._simpleIdCounter++;
    return this._simpleIdCounter;
  }

  pathLookup(obj, path) {
    const parts = path.split(".");
    if (parts.length == 1) {
      return obj[parts[0]];
    }
    return this.pathLookup(obj[parts[0]], parts.slice(1).join("."));
  }
}
var helper = new Helper();

class Logger {
  /**
   * @param {any} initiator
   * @param {Object} options
   */
  constructor(initiator, options) {
    this.initiator = initiator;
    this._options = options;
  }

  /**
   * @param {string} t
   */
  stack(t) {
    console.info("[" + this.initiator + "] ", t);
    console.log(new Error().stack);
  }

  /**
   * @param {string} t
   */
  groupCollapsed(t) {
    if (
      (CABLES.UI &&
        CABLES.UI.logFilter.filterLog(
          { initiator: this.initiator, level: 0 },
          ...arguments,
        )) ||
      !CABLES.logSilent
    )
      console.log("[" + this.initiator + "]", ...arguments);

    console.groupCollapsed("[" + this.initiator + "] " + t);
  }

  /**
   * @param {any[][]} t
   */
  table(t) {
    console.table(t);
  }

  groupEnd() {
    console.groupEnd();
  }

  error() {
    if (
      (CABLES.UI &&
        CABLES.UI.logFilter.filterLog(
          { initiator: this.initiator, level: 2 },
          ...arguments,
        )) ||
      !CABLES.UI
    ) {
      console.error("[" + this.initiator + "]", ...arguments);
    }

    if (this._options && this._options.onError) {
      this._options.onError(this.initiator, ...arguments);
      // console.log("emitevent onerror...");
      // CABLES.patch.emitEvent("onError", this.initiator, ...arguments);
      // CABLES.logErrorConsole("[" + this.initiator + "]", ...arguments);
    }
  }

  errorGui() {
    if (CABLES.UI)
      CABLES.UI.logFilter.filterLog(
        { initiator: this.initiator, level: 2 },
        ...arguments,
      );
  }

  warn() {
    if (
      (CABLES.UI &&
        CABLES.UI.logFilter.filterLog(
          { initiator: this.initiator, level: 1 },
          ...arguments,
        )) ||
      !CABLES.logSilent
    )
      console.warn("[" + this.initiator + "]", ...arguments);
  }

  verbose() {
    if (
      (CABLES.UI &&
        CABLES.UI.logFilter.filterLog(
          { initiator: this.initiator, level: 0 },
          ...arguments,
        )) ||
      !CABLES.logSilent
    )
      console.log("[" + this.initiator + "]", ...arguments);
  }

  info() {
    if (
      (CABLES.UI &&
        CABLES.UI.logFilter.filterLog(
          { initiator: this.initiator, level: 0 },
          ...arguments,
        )) ||
      !CABLES.logSilent
    )
      console.info("[" + this.initiator + "]", ...arguments);
  }

  log() {
    if (
      (CABLES.UI &&
        CABLES.UI.logFilter.filterLog(
          { initiator: this.initiator, level: 0 },
          ...arguments,
        )) ||
      !CABLES.logSilent
    )
      console.log("[" + this.initiator + "]", ...arguments);
  }

  logGui() {
    if (CABLES.UI)
      CABLES.UI.logFilter.filterLog(
        { initiator: this.initiator, level: 0 },
        ...arguments,
      );
  }

  userInteraction(text) {
    // this.log({ "initiator": "userinteraction", "text": text });
  }
}

/**
 * add eventlistener functionality to classes
 */
class Events {
  #eventLog;
  constructor() {
    this.#eventLog = new Logger("eventtarget");
    this._eventCallbacks = {};
    this._logName = "";
    this._logEvents = false;
    this._listeners = {};

    this._countErrorUnknowns = 0;
  }

  /**
   * add event listener
   * @param {string} which event name
   * @param {function} cb callback
   * @param {string} idPrefix prefix for id, default empty
   * @return {string} event id
   */
  on(which, cb, idPrefix = "") {
    const event = {
      id: (idPrefix || "") + helper.simpleId(),
      name: which,
      cb: cb,
    };
    if (!this._eventCallbacks[which]) this._eventCallbacks[which] = [event];
    else this._eventCallbacks[which].push(event);

    this._listeners[event.id] = event;

    return event.id;
  }

  /** @deprecated */
  addEventListener(which, cb, idPrefix = "") {
    return this.on(which, cb, idPrefix);
  }

  /**
   * check event listener registration
   * @param {string} id event id
   * @param {function} cb callback - deprecated
   * @return {boolean}
   */
  hasEventListener(id, cb = null) {
    if (id && !cb) {
      // check by id
      return !!this._listeners[id];
    } else {
      this.#eventLog.warn("old eventtarget function haseventlistener!");
      if (id && cb) {
        if (this._eventCallbacks[id]) {
          const idx = this._eventCallbacks[id].indexOf(cb);
          return idx !== -1;
        }
      }
    }
  }

  /**
   * check event listener by name
   * @param eventName event name
   * @return {boolean}
   */
  hasListenerForEventName(eventName) {
    return (
      this._eventCallbacks[eventName] &&
      this._eventCallbacks[eventName].length > 0
    );
  }

  /** @deprecated */
  removeEventListener(id) {
    return this.off(id);
  }

  /**
   * remove event listener registration
   * @param {string} id event id
   * @return
   */
  off(id) {
    if (id === null || id === undefined) {
      this.#eventLog.warn("removeEventListener id null", id);
      return;
    }

    if (typeof id == "string") {
      // new style, remove by id, not by name/callback
      const event = this._listeners[id];
      if (!event) {
        if (this._countErrorUnknowns == 20)
          this.#eventLog.warn("stopped reporting unknown events");
        if (this._countErrorUnknowns < 20)
          this.#eventLog.warn("could not find event...", id);
        this._countErrorUnknowns++;
        return;
      }

      let removeCount = 0;

      let found = true;
      while (found) {
        found = false;
        let index = -1;
        for (let i = 0; i < this._eventCallbacks[event.name].length; i++) {
          if (this._eventCallbacks[event.name][i].id.indexOf(id) === 0) {
            // this._eventCallbacks[event.name][i].id == which ||
            found = true;
            index = i;
          }
        }

        if (index !== -1) {
          this._eventCallbacks[event.name].splice(index, 1);
          delete this._listeners[id];
          removeCount++;
        }
      }

      if (removeCount == 0) console.log("no events removed", event.name, id);

      return;
    } else {
      console.log(
        "old function signature: removeEventListener! use listener id",
      );
    }
  }

  /**
   * enable/disable logging of events for the class
   *
   * @param {boolean} enabled
   * @param {string} logName
   */
  logEvents(enabled, logName) {
    this._logEvents = enabled;
    this._logName = logName;
  }

  /**
   * emit event
   *
   * @param {string} which event name
   * @param {*} param1
   * @param {*} param2
   * @param {*} param3
   * @param {*} param4
   * @param {*} param5
   * @param {*} param6
   */
  emitEvent(
    which,
    param1 = null,
    param2 = null,
    param3 = null,
    param4 = null,
    param5 = null,
    param6 = null,
    param7 = null,
    param8 = null,
  ) {
    if (this._logEvents)
      this.#eventLog.log(
        "[event] ",
        this._logName,
        which,
        this._eventCallbacks,
      );

    if (this._eventCallbacks[which]) {
      for (let i = 0; i < this._eventCallbacks[which].length; i++) {
        if (this._eventCallbacks[which][i]) {
          this._eventCallbacks[which][i].cb(
            param1,
            param2,
            param3,
            param4,
            param5,
            param6,
            param7,
            param8,
          );
        }
      }
    } else {
      if (this._logEvents)
        this.#eventLog.log(
          "[event] has no event callback",
          which,
          this._eventCallbacks,
        );
    }
  }
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function commonjsRequire(path) {
	throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}

var es6Promise$1 = {exports: {}};

/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   v4.2.8+1e68dce6
 */
var es6Promise = es6Promise$1.exports;

var hasRequiredEs6Promise;

function requireEs6Promise () {
	if (hasRequiredEs6Promise) return es6Promise$1.exports;
	hasRequiredEs6Promise = 1;
	(function (module, exports) {
		(function (global, factory) {
			module.exports = factory() ;
		}(es6Promise, (function () {
		function objectOrFunction(x) {
		  var type = typeof x;
		  return x !== null && (type === 'object' || type === 'function');
		}

		function isFunction(x) {
		  return typeof x === 'function';
		}



		var _isArray = void 0;
		if (Array.isArray) {
		  _isArray = Array.isArray;
		} else {
		  _isArray = function (x) {
		    return Object.prototype.toString.call(x) === '[object Array]';
		  };
		}

		var isArray = _isArray;

		var len = 0;
		var vertxNext = void 0;
		var customSchedulerFn = void 0;

		var asap = function asap(callback, arg) {
		  queue[len] = callback;
		  queue[len + 1] = arg;
		  len += 2;
		  if (len === 2) {
		    // If len is 2, that means that we need to schedule an async flush.
		    // If additional callbacks are queued before the queue is flushed, they
		    // will be processed by this flush that we are scheduling.
		    if (customSchedulerFn) {
		      customSchedulerFn(flush);
		    } else {
		      scheduleFlush();
		    }
		  }
		};

		function setScheduler(scheduleFn) {
		  customSchedulerFn = scheduleFn;
		}

		function setAsap(asapFn) {
		  asap = asapFn;
		}

		var browserWindow = typeof window !== 'undefined' ? window : undefined;
		var browserGlobal = browserWindow || {};
		var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
		var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

		// test for web worker but not in IE10
		var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

		// node
		function useNextTick() {
		  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
		  // see https://github.com/cujojs/when/issues/410 for details
		  return function () {
		    return process.nextTick(flush);
		  };
		}

		// vertx
		function useVertxTimer() {
		  if (typeof vertxNext !== 'undefined') {
		    return function () {
		      vertxNext(flush);
		    };
		  }

		  return useSetTimeout();
		}

		function useMutationObserver() {
		  var iterations = 0;
		  var observer = new BrowserMutationObserver(flush);
		  var node = document.createTextNode('');
		  observer.observe(node, { characterData: true });

		  return function () {
		    node.data = iterations = ++iterations % 2;
		  };
		}

		// web worker
		function useMessageChannel() {
		  var channel = new MessageChannel();
		  channel.port1.onmessage = flush;
		  return function () {
		    return channel.port2.postMessage(0);
		  };
		}

		function useSetTimeout() {
		  // Store setTimeout reference so es6-promise will be unaffected by
		  // other code modifying setTimeout (like sinon.useFakeTimers())
		  var globalSetTimeout = setTimeout;
		  return function () {
		    return globalSetTimeout(flush, 1);
		  };
		}

		var queue = new Array(1000);
		function flush() {
		  for (var i = 0; i < len; i += 2) {
		    var callback = queue[i];
		    var arg = queue[i + 1];

		    callback(arg);

		    queue[i] = undefined;
		    queue[i + 1] = undefined;
		  }

		  len = 0;
		}

		function attemptVertx() {
		  try {
		    var vertx = Function('return this')().require('vertx');
		    vertxNext = vertx.runOnLoop || vertx.runOnContext;
		    return useVertxTimer();
		  } catch (e) {
		    return useSetTimeout();
		  }
		}

		var scheduleFlush = void 0;
		// Decide what async method to use to triggering processing of queued callbacks:
		if (isNode) {
		  scheduleFlush = useNextTick();
		} else if (BrowserMutationObserver) {
		  scheduleFlush = useMutationObserver();
		} else if (isWorker) {
		  scheduleFlush = useMessageChannel();
		} else if (browserWindow === undefined && typeof commonjsRequire === 'function') {
		  scheduleFlush = attemptVertx();
		} else {
		  scheduleFlush = useSetTimeout();
		}

		function then(onFulfillment, onRejection) {
		  var parent = this;

		  var child = new this.constructor(noop);

		  if (child[PROMISE_ID] === undefined) {
		    makePromise(child);
		  }

		  var _state = parent._state;


		  if (_state) {
		    var callback = arguments[_state - 1];
		    asap(function () {
		      return invokeCallback(_state, child, callback, parent._result);
		    });
		  } else {
		    subscribe(parent, child, onFulfillment, onRejection);
		  }

		  return child;
		}

		/**
		  `Promise.resolve` returns a promise that will become resolved with the
		  passed `value`. It is shorthand for the following:

		  ```javascript
		  let promise = new Promise(function(resolve, reject){
		    resolve(1);
		  });

		  promise.then(function(value){
		    // value === 1
		  });
		  ```

		  Instead of writing the above, your code now simply becomes the following:

		  ```javascript
		  let promise = Promise.resolve(1);

		  promise.then(function(value){
		    // value === 1
		  });
		  ```

		  @method resolve
		  @static
		  @param {Any} value value that the returned promise will be resolved with
		  Useful for tooling.
		  @return {Promise} a promise that will become fulfilled with the given
		  `value`
		*/
		function resolve$1(object) {
		  /*jshint validthis:true */
		  var Constructor = this;

		  if (object && typeof object === 'object' && object.constructor === Constructor) {
		    return object;
		  }

		  var promise = new Constructor(noop);
		  resolve(promise, object);
		  return promise;
		}

		var PROMISE_ID = Math.random().toString(36).substring(2);

		function noop() {}

		var PENDING = void 0;
		var FULFILLED = 1;
		var REJECTED = 2;

		function selfFulfillment() {
		  return new TypeError("You cannot resolve a promise with itself");
		}

		function cannotReturnOwn() {
		  return new TypeError('A promises callback cannot return that same promise.');
		}

		function tryThen(then$$1, value, fulfillmentHandler, rejectionHandler) {
		  try {
		    then$$1.call(value, fulfillmentHandler, rejectionHandler);
		  } catch (e) {
		    return e;
		  }
		}

		function handleForeignThenable(promise, thenable, then$$1) {
		  asap(function (promise) {
		    var sealed = false;
		    var error = tryThen(then$$1, thenable, function (value) {
		      if (sealed) {
		        return;
		      }
		      sealed = true;
		      if (thenable !== value) {
		        resolve(promise, value);
		      } else {
		        fulfill(promise, value);
		      }
		    }, function (reason) {
		      if (sealed) {
		        return;
		      }
		      sealed = true;

		      reject(promise, reason);
		    }, 'Settle: ' + (promise._label || ' unknown promise'));

		    if (!sealed && error) {
		      sealed = true;
		      reject(promise, error);
		    }
		  }, promise);
		}

		function handleOwnThenable(promise, thenable) {
		  if (thenable._state === FULFILLED) {
		    fulfill(promise, thenable._result);
		  } else if (thenable._state === REJECTED) {
		    reject(promise, thenable._result);
		  } else {
		    subscribe(thenable, undefined, function (value) {
		      return resolve(promise, value);
		    }, function (reason) {
		      return reject(promise, reason);
		    });
		  }
		}

		function handleMaybeThenable(promise, maybeThenable, then$$1) {
		  if (maybeThenable.constructor === promise.constructor && then$$1 === then && maybeThenable.constructor.resolve === resolve$1) {
		    handleOwnThenable(promise, maybeThenable);
		  } else {
		    if (then$$1 === undefined) {
		      fulfill(promise, maybeThenable);
		    } else if (isFunction(then$$1)) {
		      handleForeignThenable(promise, maybeThenable, then$$1);
		    } else {
		      fulfill(promise, maybeThenable);
		    }
		  }
		}

		function resolve(promise, value) {
		  if (promise === value) {
		    reject(promise, selfFulfillment());
		  } else if (objectOrFunction(value)) {
		    var then$$1 = void 0;
		    try {
		      then$$1 = value.then;
		    } catch (error) {
		      reject(promise, error);
		      return;
		    }
		    handleMaybeThenable(promise, value, then$$1);
		  } else {
		    fulfill(promise, value);
		  }
		}

		function publishRejection(promise) {
		  if (promise._onerror) {
		    promise._onerror(promise._result);
		  }

		  publish(promise);
		}

		function fulfill(promise, value) {
		  if (promise._state !== PENDING) {
		    return;
		  }

		  promise._result = value;
		  promise._state = FULFILLED;

		  if (promise._subscribers.length !== 0) {
		    asap(publish, promise);
		  }
		}

		function reject(promise, reason) {
		  if (promise._state !== PENDING) {
		    return;
		  }
		  promise._state = REJECTED;
		  promise._result = reason;

		  asap(publishRejection, promise);
		}

		function subscribe(parent, child, onFulfillment, onRejection) {
		  var _subscribers = parent._subscribers;
		  var length = _subscribers.length;


		  parent._onerror = null;

		  _subscribers[length] = child;
		  _subscribers[length + FULFILLED] = onFulfillment;
		  _subscribers[length + REJECTED] = onRejection;

		  if (length === 0 && parent._state) {
		    asap(publish, parent);
		  }
		}

		function publish(promise) {
		  var subscribers = promise._subscribers;
		  var settled = promise._state;

		  if (subscribers.length === 0) {
		    return;
		  }

		  var child = void 0,
		      callback = void 0,
		      detail = promise._result;

		  for (var i = 0; i < subscribers.length; i += 3) {
		    child = subscribers[i];
		    callback = subscribers[i + settled];

		    if (child) {
		      invokeCallback(settled, child, callback, detail);
		    } else {
		      callback(detail);
		    }
		  }

		  promise._subscribers.length = 0;
		}

		function invokeCallback(settled, promise, callback, detail) {
		  var hasCallback = isFunction(callback),
		      value = void 0,
		      error = void 0,
		      succeeded = true;

		  if (hasCallback) {
		    try {
		      value = callback(detail);
		    } catch (e) {
		      succeeded = false;
		      error = e;
		    }

		    if (promise === value) {
		      reject(promise, cannotReturnOwn());
		      return;
		    }
		  } else {
		    value = detail;
		  }

		  if (promise._state !== PENDING) ; else if (hasCallback && succeeded) {
		    resolve(promise, value);
		  } else if (succeeded === false) {
		    reject(promise, error);
		  } else if (settled === FULFILLED) {
		    fulfill(promise, value);
		  } else if (settled === REJECTED) {
		    reject(promise, value);
		  }
		}

		function initializePromise(promise, resolver) {
		  try {
		    resolver(function resolvePromise(value) {
		      resolve(promise, value);
		    }, function rejectPromise(reason) {
		      reject(promise, reason);
		    });
		  } catch (e) {
		    reject(promise, e);
		  }
		}

		var id = 0;
		function nextId() {
		  return id++;
		}

		function makePromise(promise) {
		  promise[PROMISE_ID] = id++;
		  promise._state = undefined;
		  promise._result = undefined;
		  promise._subscribers = [];
		}

		function validationError() {
		  return new Error('Array Methods must be provided an Array');
		}

		var Enumerator = function () {
		  function Enumerator(Constructor, input) {
		    this._instanceConstructor = Constructor;
		    this.promise = new Constructor(noop);

		    if (!this.promise[PROMISE_ID]) {
		      makePromise(this.promise);
		    }

		    if (isArray(input)) {
		      this.length = input.length;
		      this._remaining = input.length;

		      this._result = new Array(this.length);

		      if (this.length === 0) {
		        fulfill(this.promise, this._result);
		      } else {
		        this.length = this.length || 0;
		        this._enumerate(input);
		        if (this._remaining === 0) {
		          fulfill(this.promise, this._result);
		        }
		      }
		    } else {
		      reject(this.promise, validationError());
		    }
		  }

		  Enumerator.prototype._enumerate = function _enumerate(input) {
		    for (var i = 0; this._state === PENDING && i < input.length; i++) {
		      this._eachEntry(input[i], i);
		    }
		  };

		  Enumerator.prototype._eachEntry = function _eachEntry(entry, i) {
		    var c = this._instanceConstructor;
		    var resolve$$1 = c.resolve;


		    if (resolve$$1 === resolve$1) {
		      var _then = void 0;
		      var error = void 0;
		      var didError = false;
		      try {
		        _then = entry.then;
		      } catch (e) {
		        didError = true;
		        error = e;
		      }

		      if (_then === then && entry._state !== PENDING) {
		        this._settledAt(entry._state, i, entry._result);
		      } else if (typeof _then !== 'function') {
		        this._remaining--;
		        this._result[i] = entry;
		      } else if (c === Promise$1) {
		        var promise = new c(noop);
		        if (didError) {
		          reject(promise, error);
		        } else {
		          handleMaybeThenable(promise, entry, _then);
		        }
		        this._willSettleAt(promise, i);
		      } else {
		        this._willSettleAt(new c(function (resolve$$1) {
		          return resolve$$1(entry);
		        }), i);
		      }
		    } else {
		      this._willSettleAt(resolve$$1(entry), i);
		    }
		  };

		  Enumerator.prototype._settledAt = function _settledAt(state, i, value) {
		    var promise = this.promise;


		    if (promise._state === PENDING) {
		      this._remaining--;

		      if (state === REJECTED) {
		        reject(promise, value);
		      } else {
		        this._result[i] = value;
		      }
		    }

		    if (this._remaining === 0) {
		      fulfill(promise, this._result);
		    }
		  };

		  Enumerator.prototype._willSettleAt = function _willSettleAt(promise, i) {
		    var enumerator = this;

		    subscribe(promise, undefined, function (value) {
		      return enumerator._settledAt(FULFILLED, i, value);
		    }, function (reason) {
		      return enumerator._settledAt(REJECTED, i, reason);
		    });
		  };

		  return Enumerator;
		}();

		/**
		  `Promise.all` accepts an array of promises, and returns a new promise which
		  is fulfilled with an array of fulfillment values for the passed promises, or
		  rejected with the reason of the first passed promise to be rejected. It casts all
		  elements of the passed iterable to promises as it runs this algorithm.

		  Example:

		  ```javascript
		  let promise1 = resolve(1);
		  let promise2 = resolve(2);
		  let promise3 = resolve(3);
		  let promises = [ promise1, promise2, promise3 ];

		  Promise.all(promises).then(function(array){
		    // The array here would be [ 1, 2, 3 ];
		  });
		  ```

		  If any of the `promises` given to `all` are rejected, the first promise
		  that is rejected will be given as an argument to the returned promises's
		  rejection handler. For example:

		  Example:

		  ```javascript
		  let promise1 = resolve(1);
		  let promise2 = reject(new Error("2"));
		  let promise3 = reject(new Error("3"));
		  let promises = [ promise1, promise2, promise3 ];

		  Promise.all(promises).then(function(array){
		    // Code here never runs because there are rejected promises!
		  }, function(error) {
		    // error.message === "2"
		  });
		  ```

		  @method all
		  @static
		  @param {Array} entries array of promises
		  @param {String} label optional string for labeling the promise.
		  Useful for tooling.
		  @return {Promise} promise that is fulfilled when all `promises` have been
		  fulfilled, or rejected if any of them become rejected.
		  @static
		*/
		function all(entries) {
		  return new Enumerator(this, entries).promise;
		}

		/**
		  `Promise.race` returns a new promise which is settled in the same way as the
		  first passed promise to settle.

		  Example:

		  ```javascript
		  let promise1 = new Promise(function(resolve, reject){
		    setTimeout(function(){
		      resolve('promise 1');
		    }, 200);
		  });

		  let promise2 = new Promise(function(resolve, reject){
		    setTimeout(function(){
		      resolve('promise 2');
		    }, 100);
		  });

		  Promise.race([promise1, promise2]).then(function(result){
		    // result === 'promise 2' because it was resolved before promise1
		    // was resolved.
		  });
		  ```

		  `Promise.race` is deterministic in that only the state of the first
		  settled promise matters. For example, even if other promises given to the
		  `promises` array argument are resolved, but the first settled promise has
		  become rejected before the other promises became fulfilled, the returned
		  promise will become rejected:

		  ```javascript
		  let promise1 = new Promise(function(resolve, reject){
		    setTimeout(function(){
		      resolve('promise 1');
		    }, 200);
		  });

		  let promise2 = new Promise(function(resolve, reject){
		    setTimeout(function(){
		      reject(new Error('promise 2'));
		    }, 100);
		  });

		  Promise.race([promise1, promise2]).then(function(result){
		    // Code here never runs
		  }, function(reason){
		    // reason.message === 'promise 2' because promise 2 became rejected before
		    // promise 1 became fulfilled
		  });
		  ```

		  An example real-world use case is implementing timeouts:

		  ```javascript
		  Promise.race([ajax('foo.json'), timeout(5000)])
		  ```

		  @method race
		  @static
		  @param {Array} promises array of promises to observe
		  Useful for tooling.
		  @return {Promise} a promise which settles in the same way as the first passed
		  promise to settle.
		*/
		function race(entries) {
		  /*jshint validthis:true */
		  var Constructor = this;

		  if (!isArray(entries)) {
		    return new Constructor(function (_, reject) {
		      return reject(new TypeError('You must pass an array to race.'));
		    });
		  } else {
		    return new Constructor(function (resolve, reject) {
		      var length = entries.length;
		      for (var i = 0; i < length; i++) {
		        Constructor.resolve(entries[i]).then(resolve, reject);
		      }
		    });
		  }
		}

		/**
		  `Promise.reject` returns a promise rejected with the passed `reason`.
		  It is shorthand for the following:

		  ```javascript
		  let promise = new Promise(function(resolve, reject){
		    reject(new Error('WHOOPS'));
		  });

		  promise.then(function(value){
		    // Code here doesn't run because the promise is rejected!
		  }, function(reason){
		    // reason.message === 'WHOOPS'
		  });
		  ```

		  Instead of writing the above, your code now simply becomes the following:

		  ```javascript
		  let promise = Promise.reject(new Error('WHOOPS'));

		  promise.then(function(value){
		    // Code here doesn't run because the promise is rejected!
		  }, function(reason){
		    // reason.message === 'WHOOPS'
		  });
		  ```

		  @method reject
		  @static
		  @param {Any} reason value that the returned promise will be rejected with.
		  Useful for tooling.
		  @return {Promise} a promise rejected with the given `reason`.
		*/
		function reject$1(reason) {
		  /*jshint validthis:true */
		  var Constructor = this;
		  var promise = new Constructor(noop);
		  reject(promise, reason);
		  return promise;
		}

		function needsResolver() {
		  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
		}

		function needsNew() {
		  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
		}

		/**
		  Promise objects represent the eventual result of an asynchronous operation. The
		  primary way of interacting with a promise is through its `then` method, which
		  registers callbacks to receive either a promise's eventual value or the reason
		  why the promise cannot be fulfilled.

		  Terminology
		  -----------

		  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
		  - `thenable` is an object or function that defines a `then` method.
		  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
		  - `exception` is a value that is thrown using the throw statement.
		  - `reason` is a value that indicates why a promise was rejected.
		  - `settled` the final resting state of a promise, fulfilled or rejected.

		  A promise can be in one of three states: pending, fulfilled, or rejected.

		  Promises that are fulfilled have a fulfillment value and are in the fulfilled
		  state.  Promises that are rejected have a rejection reason and are in the
		  rejected state.  A fulfillment value is never a thenable.

		  Promises can also be said to *resolve* a value.  If this value is also a
		  promise, then the original promise's settled state will match the value's
		  settled state.  So a promise that *resolves* a promise that rejects will
		  itself reject, and a promise that *resolves* a promise that fulfills will
		  itself fulfill.


		  Basic Usage:
		  ------------

		  ```js
		  let promise = new Promise(function(resolve, reject) {
		    // on success
		    resolve(value);

		    // on failure
		    reject(reason);
		  });

		  promise.then(function(value) {
		    // on fulfillment
		  }, function(reason) {
		    // on rejection
		  });
		  ```

		  Advanced Usage:
		  ---------------

		  Promises shine when abstracting away asynchronous interactions such as
		  `XMLHttpRequest`s.

		  ```js
		  function getJSON(url) {
		    return new Promise(function(resolve, reject){
		      let xhr = new XMLHttpRequest();

		      xhr.open('GET', url);
		      xhr.onreadystatechange = handler;
		      xhr.responseType = 'json';
		      xhr.setRequestHeader('Accept', 'application/json');
		      xhr.send();

		      function handler() {
		        if (this.readyState === this.DONE) {
		          if (this.status === 200) {
		            resolve(this.response);
		          } else {
		            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
		          }
		        }
		      };
		    });
		  }

		  getJSON('/posts.json').then(function(json) {
		    // on fulfillment
		  }, function(reason) {
		    // on rejection
		  });
		  ```

		  Unlike callbacks, promises are great composable primitives.

		  ```js
		  Promise.all([
		    getJSON('/posts'),
		    getJSON('/comments')
		  ]).then(function(values){
		    values[0] // => postsJSON
		    values[1] // => commentsJSON

		    return values;
		  });
		  ```

		  @class Promise
		  @param {Function} resolver
		  Useful for tooling.
		  @constructor
		*/

		var Promise$1 = function () {
		  function Promise(resolver) {
		    this[PROMISE_ID] = nextId();
		    this._result = this._state = undefined;
		    this._subscribers = [];

		    if (noop !== resolver) {
		      typeof resolver !== 'function' && needsResolver();
		      this instanceof Promise ? initializePromise(this, resolver) : needsNew();
		    }
		  }

		  /**
		  The primary way of interacting with a promise is through its `then` method,
		  which registers callbacks to receive either a promise's eventual value or the
		  reason why the promise cannot be fulfilled.
		   ```js
		  findUser().then(function(user){
		    // user is available
		  }, function(reason){
		    // user is unavailable, and you are given the reason why
		  });
		  ```
		   Chaining
		  --------
		   The return value of `then` is itself a promise.  This second, 'downstream'
		  promise is resolved with the return value of the first promise's fulfillment
		  or rejection handler, or rejected if the handler throws an exception.
		   ```js
		  findUser().then(function (user) {
		    return user.name;
		  }, function (reason) {
		    return 'default name';
		  }).then(function (userName) {
		    // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
		    // will be `'default name'`
		  });
		   findUser().then(function (user) {
		    throw new Error('Found user, but still unhappy');
		  }, function (reason) {
		    throw new Error('`findUser` rejected and we're unhappy');
		  }).then(function (value) {
		    // never reached
		  }, function (reason) {
		    // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
		    // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
		  });
		  ```
		  If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
		   ```js
		  findUser().then(function (user) {
		    throw new PedagogicalException('Upstream error');
		  }).then(function (value) {
		    // never reached
		  }).then(function (value) {
		    // never reached
		  }, function (reason) {
		    // The `PedgagocialException` is propagated all the way down to here
		  });
		  ```
		   Assimilation
		  ------------
		   Sometimes the value you want to propagate to a downstream promise can only be
		  retrieved asynchronously. This can be achieved by returning a promise in the
		  fulfillment or rejection handler. The downstream promise will then be pending
		  until the returned promise is settled. This is called *assimilation*.
		   ```js
		  findUser().then(function (user) {
		    return findCommentsByAuthor(user);
		  }).then(function (comments) {
		    // The user's comments are now available
		  });
		  ```
		   If the assimliated promise rejects, then the downstream promise will also reject.
		   ```js
		  findUser().then(function (user) {
		    return findCommentsByAuthor(user);
		  }).then(function (comments) {
		    // If `findCommentsByAuthor` fulfills, we'll have the value here
		  }, function (reason) {
		    // If `findCommentsByAuthor` rejects, we'll have the reason here
		  });
		  ```
		   Simple Example
		  --------------
		   Synchronous Example
		   ```javascript
		  let result;
		   try {
		    result = findResult();
		    // success
		  } catch(reason) {
		    // failure
		  }
		  ```
		   Errback Example
		   ```js
		  findResult(function(result, err){
		    if (err) {
		      // failure
		    } else {
		      // success
		    }
		  });
		  ```
		   Promise Example;
		   ```javascript
		  findResult().then(function(result){
		    // success
		  }, function(reason){
		    // failure
		  });
		  ```
		   Advanced Example
		  --------------
		   Synchronous Example
		   ```javascript
		  let author, books;
		   try {
		    author = findAuthor();
		    books  = findBooksByAuthor(author);
		    // success
		  } catch(reason) {
		    // failure
		  }
		  ```
		   Errback Example
		   ```js
		   function foundBooks(books) {
		   }
		   function failure(reason) {
		   }
		   findAuthor(function(author, err){
		    if (err) {
		      failure(err);
		      // failure
		    } else {
		      try {
		        findBoooksByAuthor(author, function(books, err) {
		          if (err) {
		            failure(err);
		          } else {
		            try {
		              foundBooks(books);
		            } catch(reason) {
		              failure(reason);
		            }
		          }
		        });
		      } catch(error) {
		        failure(err);
		      }
		      // success
		    }
		  });
		  ```
		   Promise Example;
		   ```javascript
		  findAuthor().
		    then(findBooksByAuthor).
		    then(function(books){
		      // found books
		  }).catch(function(reason){
		    // something went wrong
		  });
		  ```
		   @method then
		  @param {Function} onFulfilled
		  @param {Function} onRejected
		  Useful for tooling.
		  @return {Promise}
		  */

		  /**
		  `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
		  as the catch block of a try/catch statement.
		  ```js
		  function findAuthor(){
		  throw new Error('couldn't find that author');
		  }
		  // synchronous
		  try {
		  findAuthor();
		  } catch(reason) {
		  // something went wrong
		  }
		  // async with promises
		  findAuthor().catch(function(reason){
		  // something went wrong
		  });
		  ```
		  @method catch
		  @param {Function} onRejection
		  Useful for tooling.
		  @return {Promise}
		  */


		  Promise.prototype.catch = function _catch(onRejection) {
		    return this.then(null, onRejection);
		  };

		  /**
		    `finally` will be invoked regardless of the promise's fate just as native
		    try/catch/finally behaves
		  
		    Synchronous example:
		  
		    ```js
		    findAuthor() {
		      if (Math.random() > 0.5) {
		        throw new Error();
		      }
		      return new Author();
		    }
		  
		    try {
		      return findAuthor(); // succeed or fail
		    } catch(error) {
		      return findOtherAuther();
		    } finally {
		      // always runs
		      // doesn't affect the return value
		    }
		    ```
		  
		    Asynchronous example:
		  
		    ```js
		    findAuthor().catch(function(reason){
		      return findOtherAuther();
		    }).finally(function(){
		      // author was either found, or not
		    });
		    ```
		  
		    @method finally
		    @param {Function} callback
		    @return {Promise}
		  */


		  Promise.prototype.finally = function _finally(callback) {
		    var promise = this;
		    var constructor = promise.constructor;

		    if (isFunction(callback)) {
		      return promise.then(function (value) {
		        return constructor.resolve(callback()).then(function () {
		          return value;
		        });
		      }, function (reason) {
		        return constructor.resolve(callback()).then(function () {
		          throw reason;
		        });
		      });
		    }

		    return promise.then(callback, callback);
		  };

		  return Promise;
		}();

		Promise$1.prototype.then = then;
		Promise$1.all = all;
		Promise$1.race = race;
		Promise$1.resolve = resolve$1;
		Promise$1.reject = reject$1;
		Promise$1._setScheduler = setScheduler;
		Promise$1._setAsap = setAsap;
		Promise$1._asap = asap;

		/*global self*/
		function polyfill() {
		  var local = void 0;

		  if (typeof commonjsGlobal !== 'undefined') {
		    local = commonjsGlobal;
		  } else if (typeof self !== 'undefined') {
		    local = self;
		  } else {
		    try {
		      local = Function('return this')();
		    } catch (e) {
		      throw new Error('polyfill failed because global object is unavailable in this environment');
		    }
		  }

		  var P = local.Promise;

		  if (P) {
		    var promiseToString = null;
		    try {
		      promiseToString = Object.prototype.toString.call(P.resolve());
		    } catch (e) {
		      // silently ignored
		    }

		    if (promiseToString === '[object Promise]' && !P.cast) {
		      return;
		    }
		  }

		  local.Promise = Promise$1;
		}

		// Strange compat..
		Promise$1.polyfill = polyfill;
		Promise$1.Promise = Promise$1;

		return Promise$1;

		})));



		
	} (es6Promise$1));
	return es6Promise$1.exports;
}

requireEs6Promise();

var TALKER_CONTENT_TYPE = "application/x-talkerjs-v1+json";

var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Message = /** @class */ (function () {
    function Message(
    /*
     * @property talker - A {@link Talker} instance that will be used to send responses
     */
    talker, 
    /*
     * @property namespace - A namespace to with which to categorize messages
     */
    namespace, data, responseToId) {
        if (responseToId === void 0) { responseToId = null; }
        this.talker = talker;
        this.namespace = namespace;
        this.data = data;
        this.responseToId = responseToId;
        this.type = TALKER_CONTENT_TYPE;
    }
    return Message;
}());
// Consuming applications will almost never interact with this class.
/** @class */ ((function (_super) {
    __extends(OutgoingMessage, _super);
    /**
     * @param talker
     * @param namespace
     * @param data
     * @param responseToId - If this is a response to a previous message, its ID.
     */
    function OutgoingMessage(talker, namespace, data, responseToId) {
        if (responseToId === void 0) { responseToId = null; }
        var _this = _super.call(this, talker, namespace, data, responseToId) || this;
        _this.talker = talker;
        _this.namespace = namespace;
        _this.data = data;
        _this.responseToId = responseToId;
        _this.id = _this.talker.nextId();
        return _this;
    }
    OutgoingMessage.prototype.toJSON = function () {
        var _a = this, id = _a.id, responseToId = _a.responseToId, namespace = _a.namespace, data = _a.data, type = _a.type;
        return {
            id: id,
            responseToId: responseToId || undefined,
            namespace: namespace,
            data: data,
            type: type
        };
    };
    return OutgoingMessage;
})(Message));
// Consuming applications will interact with this class, but will almost never manually create an instance.
/** @class */ ((function (_super) {
    __extends(IncomingMessage, _super);
    function IncomingMessage(talker, namespace, data, 
    // The ID of the message received from the remoteWindow
    id) {
        if (namespace === void 0) { namespace = ""; }
        if (data === void 0) { data = {}; }
        if (id === void 0) { id = 0; }
        var _this = _super.call(this, talker, namespace, data) || this;
        _this.talker = talker;
        _this.namespace = namespace;
        _this.data = data;
        _this.id = id;
        return _this;
    }
    /**
     * Please note that this response message will use the same timeout as Talker#send.
     */
    IncomingMessage.prototype.respond = function (data) {
        return this.talker.send(this.namespace, data, this.id);
    };
    return IncomingMessage;
})(Message));

const ShaderGraphProgram = class extends Events
{
    constructor(op, port, type)
    {
        super();
        this._type = type;
        this._op = op;
        this._port = port;
        this.uniforms = [];

        this._opIdsHeadFuncSrc = {};
        this._opIdsFuncCallSrc = {};
        this._functionIdInHead = {};

        this._headFuncSrc = "";
        this._headUniSrc = "";
        this._callFuncStack = [];
        this.finalSrc = "";
    }

    setOpShaderId(op)
    {
        if (!op.shaderId) op.shaderId = CGL.ShaderGraph.getNewId();
    }

    replaceId(op, txt)
    {
        this.setOpShaderId(op);
        return txt.replaceAll("_ID", "_" + op.shaderId);
    }

    addOpShaderFuncCode(op)
    {
        if (!op.sgOp)
        {
            console.warn("HAS NO SGOP!", op);
            return;
        }

        if (this._opIdsHeadFuncSrc[op.id])
        {
            return;
        }
        this._opIdsHeadFuncSrc[op.id] = true;

        if (op.sgOp && op.sgOp._defines)
            for (let i = 0; i < op.sgOp._defines.length; i++)
                this._headFuncSrc += "#define " + op.sgOp._defines[i][0] + "\n";

        // if (op.shaderSrc)
        // {
        //     let src = op.shaderSrc.endl();// +"/* "+op.id+" */".endl();;
        //     src = this.replaceId(op, src);
        //     this._headFuncSrc += src;
        // }

        if (op.sgOp.info)
        {
            // console.log(op.sgOp.info.name, op.sgOp.info.functions);
            for (let i = 0; i < op.sgOp.info.functions.length; i++)
            {
                const f = op.sgOp.info.functions[i];
                // console.log("ADD FUNCTION CODE", f.name, f.uniqueName, this._functionIdInHead[f.uniqueName]);
                if (this._functionIdInHead[f.uniqueName]) continue;
                if (!f.name.includes("_ID")) this._functionIdInHead[f.uniqueName] = true;
                let src = f.src;
                // console.log("src", src);
                src = this.replaceId(op, src);
                this._headFuncSrc += src;
            }
        }

        if (op.shaderUniforms)
        {
            for (let i = 0; i < op.shaderUniforms.length; i++)
            {
                const uni = op.shaderUniforms[i];
                if (!uni.static)
                {
                    this._headUniSrc += "uniform " + CGL.Uniform.glslTypeString(uni.type) + " " + uni.name + ";".endl();
                    this.uniforms.push(uni);
                }
                else
                    this._headUniSrc += this.uniformAsStaticVar(uni);
            }
        }
    }

    uniformAsStaticVar(uni)
    {
        const typeStr = CGL.Uniform.glslTypeString(uni.type);
        let str = "";

        if (typeStr == "float")
        {
            let floatStr = String(uni.ports[0].get());
            if (!floatStr.includes("."))floatStr += ".";
            str = typeStr + " " + uni.name + " = " + floatStr + ";".endl();
        }
        else
        {
            str = typeStr + " " + uni.name + "=" + typeStr + "(";

            for (let i = 0; i < uni.ports.length; i++)
            {
                str += uni.ports[i].get();
                if (i != uni.ports.length - 1)str += ",";
            }

            str += ");".endl();
        }
        return str;
    }

    callFunc(op, convertTo)
    {
        this.setOpShaderId(op);
        let callstr = "  ";

        const varname = "var_" + op.getTitle() + "_" + op.shaderId;
        if (convertTo)callstr += ShaderGraph.typeConv(convertTo) + " " + varname + " = ";

        if (this._opIdsFuncCallSrc[op.shaderId])
        {
            if (varname) return varname;
            return;
        }
        this._opIdsFuncCallSrc[op.shaderId] = true;

        callstr += this.replaceId(op, op.shaderFunc || "") + "(";

        this.addOpShaderFuncCode(op);

        const numObjectPorts = this.countObjectInputPorts(op);
        let count = 0;
        for (let i = 0; i < op.portsIn.length; i++)
        {
            let paramStr = "";
            const p = op.portsIn[i];
            if (p.uiAttribs.objType == "sg_void") continue;
            if (p.type != CABLES.OP_PORT_TYPE_OBJECT) continue;

            // parameters...
            if (p.isLinked())
            {
                for (let j = 0; j < p.links.length; j++)
                {
                    const otherPort = p.links[j].getOtherPort(p);
                    paramStr = this._getPortParamStr(otherPort, p.uiAttribs.objType);

                    // console.log("objtype", p.uiAttribs.objType);
                    this.addOpShaderFuncCode(otherPort.op);
                }
            }
            else
            {
                this.addOpShaderFuncCode(p.op);
                // if (p.uiAttribs.objType == "sg_sampler2D")
                // {
                //     // callstr = "vec4(1.0)";
                //     // break;
                //     // paramStr = "null";
                //     // break;
                // }
                // else
                // {
                paramStr = ShaderGraph.getDefaultParameter(p.uiAttribs.objType);
                // }
            }

            if (p.op.shaderCodeOperator)
            {
                callstr += paramStr;
                if (count < numObjectPorts - 1) callstr += " " + p.op.shaderCodeOperator + " ";
            }
            else
            if (paramStr)
            {
                callstr += paramStr;
                if (count < numObjectPorts - 1) callstr += ", ";
            }
            count++;
        }

        callstr += ");";

        this._callFuncStack.push(callstr);

        return varname;
    }

    countObjectInputPorts(op)
    {
        let count = 0;
        for (let i = 0; i < op.portsIn.length; i++)
            if (op.portsIn[i].type == CABLES.OP_PORT_TYPE_OBJECT)
                count++;
        return count;
    }

    _getPortParamStr(p, convertTo)
    {
        let paramStr = "";

        if (p.op.shaderVar)
        {
            paramStr = p.op.shaderVar;
        }
        else
        if (p.direction == CABLES.PORT_DIR_OUT)
        {
            paramStr += this.callFunc(p.op, p.uiAttribs.objType);
        }

        if (convertTo && convertTo != p.uiAttribs.objType)
        {
            paramStr = ShaderGraph.convertTypes(convertTo, p.uiAttribs.objType, paramStr);
        }

        return paramStr;
    }

    compile()
    {
        const port = this._port;
        const l = port.links;

        this.uniforms = [];
        this._callFuncStack = [];
        this._functionIdInHead = {};
        this._opIdsFuncCallSrc = {};
        this._opIdsHeadFuncSrc = {};
        this._headFuncSrc = "";
        this._headUniSrc = "";
        let callSrc = "";

        for (let i = 0; i < l.length; i++)
        {
            const lnk = l[i];
            callSrc += this.callFunc(lnk.getOtherPort(port).op) + ";".endl();
        }

        callSrc = this._callFuncStack.join("\n");

        let src = "".endl() + "{{MODULES_HEAD}}".endl().endl();

        // console.log("COMPILE", this._type);
        // todo use shader attrib system...

        if (this._type == "frag") src += "IN vec2 texCoord;".endl().endl();
        if (this._type == "vert") src += "IN vec3 vPosition;".endl() +
                "IN vec2 attrTexCoord;".endl() +
                "OUT vec2 texCoord;".endl().endl();

        if (this._type == "vert")src += "".endl() +
                "UNI mat4 projMatrix;".endl().endl() +
                "UNI mat4 viewMatrix;".endl().endl() +
                "UNI mat4 modelMatrix;".endl().endl();

        src +=
            this._headUniSrc.endl().endl() +
            this._headFuncSrc.endl().endl() +
            "void main()".endl() +
            "{".endl();

        if (this._type == "frag")src += "  {{MODULE_BEGIN_FRAG}}".endl();
        if (this._type == "vert")src += "  {{MODULE_BEGIN_VERTEX}}".endl();

        src += callSrc.endl() +
            "}".endl();

        this.finalSrc = src;

        this.emitEvent("compiled");
    }
};

const ShaderGraph = class extends Events
{
    constructor(op, portFrag, portVert)
    {
        super();
        this._op = op;
        this._portFrag = portFrag;
        this._portVert = portVert;

        this.progFrag = new ShaderGraphProgram(op, portFrag, "frag");
        this.progVert = new ShaderGraphProgram(op, portVert, "vert");

        this.progFrag.on("compiled", () => { this.emitEvent("compiled"); });
        this.progVert.on("compiled", () => { this.emitEvent("compiled"); });

        portFrag.on("change", () =>
        {
            this.progFrag.compile();
        });
        portVert.on("change", this.updateVertex.bind(this));
        portVert.on("onLinkChanged", this.updateVertex.bind(this));
    }

    getUniforms()
    {
        const arr = [];

        for (let i = 0; i < this.progFrag.uniforms.length; i++) arr.push(this.progFrag.uniforms[i]);
        for (let i = 0; i < this.progVert.uniforms.length; i++) arr.push(this.progVert.uniforms[i]);
        return arr;
    }

    updateVertex()
    {
        console.log("update vertex", this._portVert.isLinked());

        if (this._portVert.isLinked()) this.progVert.compile();
        else
        {
            this.progVert.finalSrc = CGL.Shader.getDefaultVertexShader();
            this.emitEvent("compiled");
        }
    }

    getSrcFrag() { return this.progFrag.finalSrc; }

    getSrcVert() { return this.progVert.finalSrc || CGL.Shader.getDefaultVertexShader(); }
};

ShaderGraph.convertTypes = function (typeTo, typeFrom, paramStr)
{
    // console.log(typeFrom, " to ", typeTo);

    if (typeTo == "sg_genType") return paramStr;


    if (typeFrom == "sg_texture" && typeTo == "sg_vec3") return paramStr + ".xyz";

    if (typeFrom == "sg_vec4" && typeTo == "sg_vec3") return paramStr + ".xyz";
    if (typeFrom == "sg_vec4" && typeTo == "sg_vec2") return paramStr + ".xy";
    if (typeFrom == "sg_vec4" && typeTo == "sg_float") return paramStr + ".x";

    if (typeFrom == "sg_vec3" && typeTo == "sg_vec2") return paramStr + ".xy";
    if (typeFrom == "sg_vec3" && typeTo == "sg_float") return paramStr + ".x";

    if (typeFrom == "sg_vec2" && typeTo == "sg_float") return paramStr + ".x";

    if (typeFrom == "sg_vec3" && typeTo == "sg_vec4") return "vec4(" + paramStr + ", 0.)";

    if (typeFrom == "sg_vec2" && typeTo == "sg_vec3") return "vec3(" + paramStr + ", 0.)";
    if (typeFrom == "sg_vec2" && typeTo == "sg_vec4") return "vec4(" + paramStr + ", 0., 0.)";

    if (typeFrom == "sg_float" && typeTo == "sg_vec2") return "vec2(" + paramStr + "," + paramStr + ")";
    if (typeFrom == "sg_float" && typeTo == "sg_vec3") return "vec3(" + paramStr + "," + paramStr + "," + paramStr + ")";
    if (typeFrom == "sg_float" && typeTo == "sg_vec4") return "vec4(" + paramStr + "," + paramStr + "," + paramStr + ", 0.0)";

    return "/* conversionfail: " + typeFrom + "->" + typeTo + " */";
};

ShaderGraph.getDefaultParameter = function (t)
{
    if (t == "sg_vec4") return "vec4(0., 0., 0., 0.)";
    if (t == "sg_vec3") return "vec3(0., 0., 0.)";
    if (t == "sg_vec2") return "vec2(0., 0.)";
    if (t == "sg_float") return "0.";
    if (t == "sg_genType") return "0.";
    return "/* no default: " + t + "*/";
};

ShaderGraph.typeConv = function (sgtype)
{
    return sgtype.substr(3);
};


ShaderGraph.shaderIdCounter = ShaderGraph.shaderIdCounter || 1;
ShaderGraph.getNewId = () =>
{
    return ++ShaderGraph.shaderIdCounter;
};

CGL.ShaderGraphOp = ShaderGraphOp;
CGL.ShaderGraph = ShaderGraph;
CGL.ShaderGraphProgram = ShaderGraphProgram;
//# sourceMappingURL=cgl_shadergraph.js.map
