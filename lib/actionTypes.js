(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.actionTypes = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  exports.__esModule = true;
  /**
   * @file action types
   * @author leon <ludafa@outlook.com>
   */

  var PREFIX = 'melon_form';

  var INITIALIZE = exports.INITIALIZE = PREFIX + '/INITIALIZE';
  var RESET = exports.RESET = PREFIX + '/RESET';

  var FOCUS = exports.FOCUS = PREFIX + '/FOCUS';
  var CHANGE = exports.CHANGE = PREFIX + '/CHANGE';
  var TOUCH = exports.TOUCH = PREFIX + '/TOUCH';
  var TOUCH_ALL = exports.TOUCH_ALL = PREFIX + '/TOUCH_ALL';
  var BLUR = exports.BLUR = PREFIX + '/BLUR';

  var FILL_META = exports.FILL_META = PREFIX + '/FILL_META';

  var ARRAY_SWAP = exports.ARRAY_SWAP = PREFIX + '/ARRAY_SWAP';
  var ARRAY_PUSH = exports.ARRAY_PUSH = PREFIX + '/ARRAY_PUSH';
  var ARRAY_POP = exports.ARRAY_POP = PREFIX + '/ARRAY_POP';
  var ARRAY_SHIFT = exports.ARRAY_SHIFT = PREFIX + '/ARRAY_SHIFT';
  var ARRAY_UNSHIFT = exports.ARRAY_UNSHIFT = PREFIX + '/ARRAY_UNSHIFT';
  var ARRAY_SPLICE = exports.ARRAY_SPLICE = PREFIX + '/ARRAY_SPLICE';

  var VALIDITY_UPDATE = exports.VALIDITY_UPDATE = PREFIX + '/VALIDITY_UPDATE';
  var ASYNC_VALIDATE_START = exports.ASYNC_VALIDATE_START = PREFIX + '/ASYNC_VALIDITY_START';
  var ASYNC_VALIDATE_SUCCEED = exports.ASYNC_VALIDATE_SUCCEED = PREFIX + '/ASYNC_VALIDITY_SUCCEED';
  var ASYNC_VALIDATE_FAILED = exports.ASYNC_VALIDATE_FAILED = PREFIX + '/ASYNC_VALIDITY_FAILED';

  var REGISTER = exports.REGISTER = PREFIX + '/REGISTER';
  var UNREGISTER = exports.UNREGISTER = PREFIX + '/UNREGISTER';

  var PENDING_START = exports.PENDING_START = PREFIX + '/PENDING_START';
  var PENDING_STOP = exports.PENDING_STOP = PREFIX + '/PENDING_STOP';
});
//# sourceMappingURL=actionTypes.js.map
