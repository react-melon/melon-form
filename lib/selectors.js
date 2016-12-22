(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './util/dataPath', './constants'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./util/dataPath'), require('./constants'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.dataPath, global.constants);
        global.selectors = mod.exports;
    }
})(this, function (exports, _dataPath, _constants) {
    'use strict';

    exports.__esModule = true;
    exports.getModel = getModel;
    exports.getValue = getValue;
    exports.getMeta = getMeta;
    exports.getFieldData = getFieldData;
    /**
     * @file selectors
     * @author leon <ludafa@outlook.com>
     */

    function getModel(state, model) {
        return (0, _dataPath.getIn)(state, model);
    }

    function getValue(store, model) {
        return getModel(store, model).value;
    }

    function getMeta(store, model) {
        return getModel(store, model).meta;
    }

    function getFieldData(store, model, name) {

        var formData = getValue(store, model);
        var meta = getMeta(store, model);

        var data = {
            value: (0, _dataPath.getIn)(formData, name),
            meta: meta[name] || _constants.DEFAULT_META
        };

        return data;
    }
});
//# sourceMappingURL=selectors.js.map
