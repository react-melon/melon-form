(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './array', './field', './form'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./array'), require('./field'), require('./form'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.array, global.field, global.form);
    global.index = mod.exports;
  }
})(this, function (exports, _array, _field, _form) {
  'use strict';

  exports.__esModule = true;
  Object.keys(_array).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _array[key];
      }
    });
  });
  Object.keys(_field).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _field[key];
      }
    });
  });
  Object.keys(_form).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _form[key];
      }
    });
  });
});
//# sourceMappingURL=index.js.map
