(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './util/validity', './createActionCreators', './createReducer', './createField', './Form', './actionTypes', './selectors', './util/dataPath', './reducers/index'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./util/validity'), require('./createActionCreators'), require('./createReducer'), require('./createField'), require('./Form'), require('./actionTypes'), require('./selectors'), require('./util/dataPath'), require('./reducers/index'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.validity, global.createActionCreators, global.createReducer, global.createField, global.Form, global.actionTypes, global.selectors, global.dataPath, global.index);
        global.index = mod.exports;
    }
})(this, function (exports, _validity, _createActionCreators, _createReducer, _createField, _Form, _actionTypes, _selectors, _dataPath, _index) {
    'use strict';

    exports.__esModule = true;
    exports.reducers = exports.dataPath = exports.createField = exports.Form = exports.createReducer = exports.selectors = exports.actionTypes = exports.createActionCreators = exports.Field = undefined;
    Object.keys(_validity).forEach(function (key) {
        if (key === "default" || key === "__esModule") return;
        Object.defineProperty(exports, key, {
            enumerable: true,
            get: function () {
                return _validity[key];
            }
        });
    });

    var _createActionCreators2 = _interopRequireDefault(_createActionCreators);

    var _createReducer2 = _interopRequireDefault(_createReducer);

    var _createField2 = _interopRequireDefault(_createField);

    var _Form2 = _interopRequireDefault(_Form);

    var actionTypes = _interopRequireWildcard(_actionTypes);

    var selectors = _interopRequireWildcard(_selectors);

    var dataPath = _interopRequireWildcard(_dataPath);

    var reducers = _interopRequireWildcard(_index);

    function _interopRequireWildcard(obj) {
        if (obj && obj.__esModule) {
            return obj;
        } else {
            var newObj = {};

            if (obj != null) {
                for (var key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                }
            }

            newObj.default = obj;
            return newObj;
        }
    }

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var Field = exports.Field = (0, _createField2['default'])(); /**
                                                                  * @file melon-form
                                                                  * @author leon <ludafa@outlook.com>
                                                                  */

    exports.createActionCreators = _createActionCreators2['default'];
    exports.actionTypes = actionTypes;
    exports.selectors = selectors;
    exports.createReducer = _createReducer2['default'];
    exports.Form = _Form2['default'];
    exports.createField = _createField2['default'];
    exports.dataPath = dataPath;
    exports.reducers = reducers;
});
//# sourceMappingURL=index.js.map
