(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react-addons-update', 'lodash/mapValues', '../constants', '../util/dataPathMap', '../util/dataPath'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react-addons-update'), require('lodash/mapValues'), require('../constants'), require('../util/dataPathMap'), require('../util/dataPath'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.reactAddonsUpdate, global.mapValues, global.constants, global.dataPathMap, global.dataPath);
        global.array = mod.exports;
    }
})(this, function (exports, _reactAddonsUpdate, _mapValues, _constants, _dataPathMap, _dataPath) {
    'use strict';

    exports.__esModule = true;
    exports.arraySwap = arraySwap;
    exports.arrayPush = arrayPush;
    exports.arrayPop = arrayPop;
    exports.arrayShift = arrayShift;
    exports.arrayUnshift = arrayUnshift;
    exports.arraySplice = arraySplice;

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

    function arraySwap(state, action) {
        var _action$payload = action.payload,
            name = _action$payload.name,
            from = _action$payload.from,
            to = _action$payload.to;


        if (from === to) {
            return state;
        }

        return (0, _reactAddonsUpdate2['default'])(state, {
            value: {
                $apply: function $apply(value) {
                    if (from > to) {
                        var _ref = [to, from];
                        from = _ref[0];
                        to = _ref[1];
                    }

                    var currentValue = (0, _dataPath.getIn)(value, name);

                    return (0, _dataPath.setIn)(value, name, [].concat(currentValue.slice(0, from), [currentValue[to]], currentValue.slice(from + 1, to), [currentValue[from]], currentValue.slice(to + 1)));
                }
            },
            meta: {
                $apply: function $apply(meta) {
                    return (0, _dataPathMap.setInWithPath)((0, _dataPathMap.swap)(meta, name, from, to), name, function (data) {
                        return _extends({}, data, { touched: true });
                    });
                }
            }
        });
    }

    function arrayPush(state, action) {
        var _action$payload2 = action.payload,
            name = _action$payload2.name,
            elements = _action$payload2.elements;
        var value = state.value,
            meta = state.meta;


        var currentValue = (0, _dataPath.getIn)(value, name) || [];
        var currentLength = currentValue.length;
        var nextValue = (0, _dataPath.setIn)(value, name, [].concat(currentValue, elements));

        return (0, _reactAddonsUpdate2['default'])(state, {
            value: {
                $set: nextValue
            },
            meta: {
                $set: elements.reduce(function (meta, element, i) {

                    return _extends({}, meta, (0, _mapValues2['default'])((0, _dataPathMap.make)(element, name + '[' + (currentLength + i) + ']'), function () {
                        return _constants.DEFAULT_META;
                    }));
                }, meta)
            }
        });
    }

    function arrayPop(state, action) {

        var name = action.payload.name;

        var value = state.value,
            meta = state.meta;


        var currentValue = (0, _dataPath.getIn)(value, name);
        var nextValue = (0, _dataPath.setIn)(value, name, currentValue.slice(0, -1));

        return (0, _reactAddonsUpdate2['default'])(state, {
            value: {
                $set: nextValue
            },
            meta: {
                $set: (0, _dataPathMap.remove)(meta, name + '[' + (currentValue.length - 1) + ']')
            }
        });
    }

    function arrayShift(state, action) {

        var name = action.payload.name;

        var value = state.value,
            meta = state.meta;


        var currentValue = (0, _dataPath.getIn)(value, name);
        var nextValue = (0, _dataPath.setIn)(value, name, currentValue.slice(1));

        return (0, _reactAddonsUpdate2['default'])(state, {
            value: {
                $set: nextValue
            },
            meta: {
                $set: (0, _dataPathMap.splice)(meta, name, currentValue, 0, 1, [])
            }
        });
    }

    function arrayUnshift(state, action) {
        var _action$payload3 = action.payload,
            name = _action$payload3.name,
            elements = _action$payload3.elements;
        var value = state.value,
            meta = state.meta;


        var currentValue = (0, _dataPath.getIn)(value, name);
        var nextValue = (0, _dataPath.setIn)(value, name, [].concat(elements, currentValue));

        return (0, _reactAddonsUpdate2['default'])(state, {
            value: {
                $set: nextValue
            },
            meta: {
                $set: (0, _dataPathMap.splice)(meta, name, currentValue, 0, 0, elements)
            }
        });
    }

    function arraySplice(state, action) {
        var _action$payload4 = action.payload,
            name = _action$payload4.name,
            start = _action$payload4.start,
            deleteCount = _action$payload4.deleteCount,
            replacements = _action$payload4.replacements;
        var value = state.value,
            meta = state.meta;


        var currentValue = (0, _dataPath.getIn)(value, name);
        var nextValue = (0, _dataPath.setIn)(value, name, [].concat(currentValue.slice(0, start), replacements, currentValue.slice(start + deleteCount)));

        return (0, _reactAddonsUpdate2['default'])(state, {
            value: {
                $set: nextValue
            },
            meta: {
                $set: (0, _dataPathMap.splice)(meta, name, currentValue, start, deleteCount, replacements)
            }
        });
    }
});
//# sourceMappingURL=array.js.map
