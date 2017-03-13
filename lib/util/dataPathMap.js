(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './dataPath', 'lodash/startsWith', 'lodash/toPath', 'lodash/mapValues', '../constants'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./dataPath'), require('lodash/startsWith'), require('lodash/toPath'), require('lodash/mapValues'), require('../constants'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.dataPath, global.startsWith, global.toPath, global.mapValues, global.constants);
        global.dataPathMap = mod.exports;
    }
})(this, function (exports, _dataPath, _startsWith, _toPath, _mapValues, _constants) {
    'use strict';

    exports.__esModule = true;
    exports.make = make;
    exports.remove = remove;
    exports.move = move;
    exports.splice = splice;
    exports.swap = swap;
    exports.setInWithPath = setInWithPath;

    var _startsWith2 = _interopRequireDefault(_startsWith);

    var _toPath2 = _interopRequireDefault(_toPath);

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

    /**
     * 生成 meta 对象
     *
     * @param  {Object|Array} target         目标对象
     * @param  {string}       [prefix='']    生成的 meta 对象的 key 值前缀
     * @param  {number}       [startIndex=0] 若 target 是一个数组，那么还可以额外指定 key 值的起始下标；
     *                                       但只对第一层级起效
     * @return {Object}
     */
    function make(target) {
        var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
        var startIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;


        var map = {};

        var isRootArray = Array.isArray(target);

        (0, _dataPath.walk)(target, function (dataPath, value, isArray, tokens) {

            if (isRootArray) {

                // 只对第一层进行处理
                if (startIndex) {

                    var firstToken = tokens[0];
                    var numbericFirstToken = parseInt(firstToken, 10);

                    if (!isNaN(numbericFirstToken)) {
                        dataPath = (0, _dataPath.compilePath)([numbericFirstToken + startIndex].concat(tokens.slice(1)));
                    }
                }
            }

            if (prefix) {
                dataPath = '' + prefix + (isRootArray ? '' : '.') + dataPath;
            }

            map[dataPath] = value;
        });

        return map;
    }

    function remove(map, prefix) {

        return Object.keys(map).reduce(function (nextMap, key) {

            if (!(0, _startsWith2['default'])(key, prefix)) {
                nextMap[key] = map[key];
            }

            return nextMap;
        }, {});
    }

    function move(map, from, to) {

        return Object.keys(map).reduce(function (nextMap, key) {

            if ((0, _startsWith2['default'])(key, from)) {
                nextMap[key.replace(from, to)] = map[key];
            } else {
                nextMap[key] = map[key];
            }

            return nextMap;
        }, {});
    }

    function splice(map, pointer, arr, start, deleteCount, replacements) {

        var replaceCount = replacements.length;

        // 删除
        for (var i = 0; i < deleteCount; i++) {
            map = remove(map, pointer + '[' + (start + i) + ']');
        }

        // 移动
        if (deleteCount < replaceCount) {
            for (var _i = arr.length - start - deleteCount - 1; _i >= 0; _i--) {
                var from = start + deleteCount + _i;
                var to = start + replacements.length + _i;
                map = move(map, pointer + '[' + from + ']', pointer + '[' + to + ']');
            }
        } else if (deleteCount > replaceCount) {
            for (var _i2 = 0, len = arr.length - start - deleteCount; _i2 < len; _i2++) {
                var _from = start + deleteCount + _i2;
                var _to = start + replacements.length + _i2;
                map = move(map, pointer + '[' + _from + ']', pointer + '[' + _to + ']');
            }
        }

        // 添加
        map = _extends({}, map, (0, _mapValues2['default'])(make(replacements, pointer, start), function () {
            return _constants.DEFAULT_META;
        }));

        return map;
    }

    function swap(map, dataPath, from, to) {

        return Object.keys(map).reduce(function (nextMap, key) {

            var fromKey = dataPath + '[' + from + ']';
            var toKey = dataPath + '[' + to + ']';

            if ((0, _startsWith2['default'])(key, fromKey)) {
                nextMap[key] = map[key.replace(fromKey, toKey)];
            } else if ((0, _startsWith2['default'])(key, toKey)) {
                nextMap[key] = map[key.replace(toKey, fromKey)];
            } else {
                nextMap[key] = map[key];
            }

            return nextMap;
        }, {});
    }

    function setInWithPath(map, dataPath, callback) {

        var path = (0, _toPath2['default'])(dataPath);
        var toModifyKeyMap = path.reduce(function (nextMap, item, index, path) {

            var currentPath = path.slice(0, index + 1);
            var currentDataPath = (0, _dataPath.compilePath)(currentPath);

            nextMap[currentDataPath] = typeof callback === 'function' ? callback(map[currentDataPath], currentDataPath) : callback;

            return nextMap;
        }, {});

        return Object.keys(map).reduce(function (nextMap, key) {
            nextMap[key] = key in toModifyKeyMap ? toModifyKeyMap[key] : map[key];
            return nextMap;
        }, {});
    }
});
//# sourceMappingURL=dataPathMap.js.map
