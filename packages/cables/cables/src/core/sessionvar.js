// todo: old... remove this from ops...

/**
 * todo: old... remove this from ops...
 *
 * @class
 */
const Variable = function () {
  let value = null;
  const changedCallbacks = [];

  this.onChanged = function (f) {
    changedCallbacks.push(f);
  };

  this.getValue = function () {
    return value;
  };

  this.setValue = function (v) {
    value = v;
    this.emitChanged();
  };

  this.emitChanged = function () {
    for (let i = 0; i < changedCallbacks.length; i++) {
      changedCallbacks[i]();
    }
  };
};

export { Variable };
