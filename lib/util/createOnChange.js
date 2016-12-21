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
        global.createOnChange = mod.exports;
    }
})(this, function (exports) {
    "use strict";

    exports.__esModule = true;
    exports.default = createOnChange;
    /**
     * @file create onChange handler
     * @author leon <ludafa@outlook.com>
     */

    function createOnChange(change, _ref) {
        var parse = _ref.parse,
            normalize = _ref.normalize;


        return function (name, value) {

            if (parse) {
                value = parse(value);
            }

            if (normalize) {
                value = normalize(value);
            }

            change(name, value);
        };
    }
});
//# sourceMappingURL=createOnChange.js.map
