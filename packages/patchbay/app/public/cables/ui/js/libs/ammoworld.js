'use strict';

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

// https://stackoverflow.com/questions/12251199/re-positioning-a-rigid-body-in-bullet-physics
// https://github.com/InfiniteLee/ammo-debug-drawer

const AmmoWorld = class extends Events
{
    constructor()
    {
        super();
        this.world = null;
        this.bodies = [];
        this._countIndex = 1;
        this._bodymeta = {};
        this.lastTime = performance.now();
        this._collisions = [];
        this.autoRemove = true;

        this.setupWorld();
    }

    setupWorld()
    {
        this.collisionConfiguration = new Ammo.btDefaultCollisionConfiguration();
        this.dispatcher = new Ammo.btCollisionDispatcher(this.collisionConfiguration);
        this.overlappingPairCache = new Ammo.btDbvtBroadphase();
        this.solver = new Ammo.btSequentialImpulseConstraintSolver();

        this.world = new Ammo.btDiscreteDynamicsWorld(this.dispatcher, this.overlappingPairCache, this.solver, this.collisionConfiguration);

        this.world.setGravity(new Ammo.btVector3(0, -9, 0));
    }

    getListBodies()
    {
        const arr = [];
        for (let i in this._bodymeta)
        {
            arr.push(this._bodymeta[i]);
        }
        return arr;
    }

    dispose()
    {
        if (!this.world) return;

        this.emitEvent("dispose");

        for (let i = 0; i < this.bodies.length; i++)
        {
            if (this.bodies[i])
            {
                this.world.removeRigidBody(this.bodies[i]);
                Ammo.destroy(this.bodies[i]);
            }
        }
        this.bodies = [];

        Ammo.destroy(this.world);
        this.world = null;
        Ammo.destroy(this.collisionConfiguration);
        Ammo.destroy(this.dispatcher);
        Ammo.destroy(this.overlappingPairCache);
        Ammo.destroy(this.solver);
    }

    removeRigidBody(b)
    {
        const idx = this.bodies.indexOf(b);
        const metaIdx = b.getUserIndex();
        if (this.world && b)
            this.world.removeRigidBody(b);

        if (idx > -1) this.bodies.splice(idx, 1);

        delete this._bodymeta[metaIdx];
    }

    createRigidBody()
    {

    }

    addRigidBody(body)
    {
        if (!this.world) return;
        body.setUserIndex(++this._countIndex);
        this.world.addRigidBody(body);
        this.bodies.push(body);
    }

    setBodyMeta(body, meta)
    {
        if (body.getUserIndex() == 0)body.setUserIndex(++this._countIndex);
        meta.body = body;
        this._bodymeta[body.getUserIndex()] = meta;
    }

    getBodyMeta(body)
    {
        if (body) return this._bodymeta[body.getUserIndex()];
    }

    pingBody(body)
    {
        const m = this._bodymeta[body.getUserIndex()];
        if (m) m.ping = Math.round(performance.now());
    }

    getBodyByName(n)
    {
        for (let i in this._bodymeta)
        {
            if (this._bodymeta[i].name == n)
            {
                // console.log("found name", i);
                return this._bodymeta[i].body;
            }
        }
    }

    numBodies()
    {
        return this.bodies.length;
    }

    _pingTimeout()
    {
        for (let i in this._bodymeta)
        {
            const b = this._bodymeta[i];
            if (b.ping && performance.now() - b.ping > 50)
            {
                b.removed = true;
                this.removeRigidBody(b.body);
                // console.log("ping timeout", b);
            }
        }
    }

    frame()
    {
        if (!this.world) return;
        let deltaTime = performance.now() - this.lastTime;

        this.world.stepSimulation(deltaTime, 5);

        if (this.autoRemove) this._pingTimeout();
        this._checkCollisions();

        this.lastTime = performance.now();
    }

    activateAllBodies()
    {
        for (let i = 0; i < this.bodies.length; i++)
        {
            this.bodies[i].activate();
        }
    }

    getCollisions()
    {
        return this._collisions;
    }

    _checkCollisions()
    {
        let numManifolds = this.dispatcher.getNumManifolds();

        this._collisions.length = 0;
        for (let i = 0; i < numManifolds; i++)
        {
            let contactManifold = this.dispatcher.getManifoldByIndexInternal(i);
            let numContacts = contactManifold.getNumContacts();

            for (let j = 0; j < numContacts; j++)
            {
                let meta0 = this.getBodyMeta(contactManifold.getBody0());
                let meta1 = this.getBodyMeta(contactManifold.getBody1());

                if (meta0 && meta1)
                {
                    this._collisions.push({
                        "name0": meta0.name,
                        "name1": meta1.name
                    });
                }
            }
        }
    }
};

AmmoWorld._getGeomTriangle = function (geom, i)
{
    const arr = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    if (geom.verticesIndices && geom.verticesIndices.length)
    {
        const i3 = i * 3;
        const i13 = (i + 1) * 3;
        const i23 = (i + 2) * 3;
        arr[0] = geom.vertices[geom.verticesIndices[i3] * 3 + 0];
        arr[1] = geom.vertices[geom.verticesIndices[i3] * 3 + 1];
        arr[2] = geom.vertices[geom.verticesIndices[i3] * 3 + 2];

        arr[3] = geom.vertices[geom.verticesIndices[i13] * 3 + 0];
        arr[4] = geom.vertices[geom.verticesIndices[i13] * 3 + 1];
        arr[5] = geom.vertices[geom.verticesIndices[i13] * 3 + 2];

        arr[6] = geom.vertices[geom.verticesIndices[i23] * 3 + 0];
        arr[7] = geom.vertices[geom.verticesIndices[i23] * 3 + 1];
        arr[8] = geom.vertices[geom.verticesIndices[i23] * 3 + 2];
    }
    else
    {
        arr[0] = geom.vertices[i * 9 + 0];
        arr[1] = geom.vertices[i * 9 + 1];
        arr[2] = geom.vertices[i * 9 + 2];

        arr[3] = geom.vertices[i * 9 + 3];
        arr[4] = geom.vertices[i * 9 + 4];
        arr[5] = geom.vertices[i * 9 + 5];

        arr[6] = geom.vertices[i * 9 + 6];
        arr[7] = geom.vertices[i * 9 + 7];
        arr[8] = geom.vertices[i * 9 + 8];
    }

    return arr;
};

AmmoWorld.createConvexHullFromGeom = function (geom, numTris, scale)
{
    scale = scale || [1, 1, 1];
    const colShape = new Ammo.btConvexHullShape();
    const _vec3_1 = new Ammo.btVector3(0, 0, 0);
    new Ammo.btVector3(0, 0, 0);
    new Ammo.btVector3(0, 0, 0);

    let step = 1;

    if (geom.vertices.length / 3 > numTris && numTris > 0)
    {
        step = Math.floor(geom.vertices.length / 3 / numTris);
    }

    for (let i = 0; i < geom.vertices.length / 3; i += step)
    {
        _vec3_1.setX(geom.vertices[i * 3 + 0] * scale[0]);
        _vec3_1.setY(geom.vertices[i * 3 + 1] * scale[1]);
        _vec3_1.setZ(geom.vertices[i * 3 + 2] * scale[2]);
        colShape.addPoint(_vec3_1, true); // todo: only set true on last vertex
    }

    colShape.initializePolyhedralFeatures();

    // Ammo.destroy(_vec3_1);
    // Ammo.destroy(_vec3_2);
    // Ammo.destroy(_vec3_3);

    return colShape;
};


AmmoWorld.copyCglTransform = function (cgl, transform)
{
    const btOrigin = new Ammo.btVector3(0, 0, 0);
    const btQuat = new Ammo.btQuaternion(0, 0, 0, 1);

    const tmpOrigin = vec3.create();
    const tmpQuat = quat.create();

    mat4.getTranslation(tmpOrigin, cgl.mMatrix);
    mat4.getRotation(tmpQuat, cgl.mMatrix);

    btOrigin.setValue(tmpOrigin[0], tmpOrigin[1], tmpOrigin[2]);
    btQuat.setValue(tmpQuat[0], tmpQuat[1], tmpQuat[2], tmpQuat[3]);

    transform.setOrigin(btOrigin);
    transform.setRotation(btQuat);

    Ammo.destroy(btOrigin);
    Ammo.destroy(btQuat);
};

CABLES.AmmoWorld = AmmoWorld;
//# sourceMappingURL=ammoworld.js.map
