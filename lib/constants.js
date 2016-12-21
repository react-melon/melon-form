(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.constants = mod.exports;
    }
})(this, function (exports) {
    "use strict";

    exports.__esModule = true;
    /**
     * @file constants
     * @author leon <ludafa@outlook.com>
     */

    var DEFAULT_META = exports.DEFAULT_META = {
        touched: false,
        submitting: false,
        focus: false,
        dirty: false,
        error: null
    };
});
//# sourceMappingURL=constants.js.map
