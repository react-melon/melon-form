(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './dataPath', 'lodash/startsWith', 'lodash/toPath'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./dataPath'), require('lodash/startsWith'), require('lodash/toPath'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.dataPath, global.startsWith, global.toPath);
        global.dataPathMap = mod.exports;
    }
})(this, function (exports, _dataPath, _startsWith, _toPath) {
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

    function make(obj) {
        var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';


        var map = {};

        (0, _dataPath.walk)(obj, function (dataPath, value, isArray) {

            if (isArray) {
                dataPath = '' + prefix + dataPath;
            } else if (prefix) {
                dataPath = prefix + '.' + dataPath;
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

    function add(map, prefix) {
        for (var _len = arguments.length, nodes = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
            nodes[_key - 2] = arguments[_key];
        }

        return nodes.reduce(function (map, node) {

            return _extends({}, map, make(node, prefix));
        }, map);
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
        for (var _i3 = 0, _len2 = replacements.length; _i3 < _len2; _i3++) {
            map = add(map, pointer + '[' + (start + _i3) + ']', replacements[_i3]);
        }

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
