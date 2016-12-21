(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react-addons-update', 'lodash/mapValues', '../util/dataPathMap', '../constants'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react-addons-update'), require('lodash/mapValues'), require('../util/dataPathMap'), require('../constants'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.reactAddonsUpdate, global.mapValues, global.dataPathMap, global.constants);
        global.form = mod.exports;
    }
})(this, function (exports, _reactAddonsUpdate, _mapValues, _dataPathMap, _constants) {
    'use strict';

    exports.__esModule = true;
    exports.initialize = initialize;
    exports.reset = reset;
    exports.touchAll = touchAll;

    var _reactAddonsUpdate2 = _interopRequireDefault(_reactAddonsUpdate);

    var _mapValues2 = _interopRequireDefault(_mapValues);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }

        return target;
    };

    function initialize(state, action) {

        var value = action.payload.value;

        return (0, _reactAddonsUpdate2['default'])(state, {
            value: {
                $set: value
            },
            meta: {
                $set: (0, _mapValues2['default'])((0, _dataPathMap.make)(value), function () {
                    return _constants.DEFAULT_META;
                })
            }
        });
    }

    function reset(state, action) {
        // TODO
    }

    function touchAll(state) {

        return (0, _reactAddonsUpdate2['default'])(state, {
            meta: {
                $apply: function $apply(meta) {

                    var hasChanged = false;
                    var nextMeta = {};

                    /* eslint-disable fecs-use-for-of */
                    for (var key in meta) {
                        if (meta.hasOwnProperty(key)) {

                            if (meta[key].touched) {
                                nextMeta[key] = meta[key];
                            } else {
                                nextMeta[key] = _extends({}, meta[key], {
                                    touched: true
                                });
                                hasChanged = true;
                            }
                        }
                    }
                    /* eslint-enable fecs-use-for-of */

                    return hasChanged ? nextMeta : meta;
                }
            }
        });
    }
});
//# sourceMappingURL=form.js.map
