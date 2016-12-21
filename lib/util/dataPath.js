(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'lodash/get', 'lodash/toPath'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('lodash/get'), require('lodash/toPath'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.get, global.toPath);
        global.dataPath = mod.exports;
    }
})(this, function (exports, _get, _toPath) {
    'use strict';

    exports.__esModule = true;
    exports.getIn = undefined;
    exports.setIn = setIn;
    exports.deleteIn = deleteIn;
    exports.compilePath = compilePath;
    exports.walk = walk;

    var _get2 = _interopRequireDefault(_get);

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

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
    } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };

    var getIn = exports.getIn = _get2['default'];

    function setInWithPath(state, value, first) {
        var _extends2;

        if (first === void 0) {
            return value;
        }

        for (var _len = arguments.length, paths = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
            paths[_key - 3] = arguments[_key];
        }

        var next = setInWithPath.apply(undefined, [state && state[first], value].concat(paths));

        if ((typeof state === 'undefined' ? 'undefined' : _typeof(state)) !== 'object') {
            state = isNaN(+first) ? {} : [];
        }

        if (Array.isArray(state)) {
            var copy = state.slice();
            copy[first] = next;
            return copy;
        }

        return _extends({}, state, (_extends2 = {}, _extends2[first] = next, _extends2));
    }

    function setIn(state, path, value) {
        return setInWithPath.apply(undefined, [state, value].concat((0, _toPath2['default'])(path)));
    }

    function deleteInWithPath(state, first) {

        if (first == null || state == null) {
            return void 0;
        }

        for (var _len2 = arguments.length, paths = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
            paths[_key2 - 2] = arguments[_key2];
        }

        var next = deleteInWithPath.apply(undefined, [state && state[first]].concat(paths));

        if ((typeof state === 'undefined' ? 'undefined' : _typeof(state)) !== 'object') {
            state = isNaN(+first) ? {} : [];
        }

        if (Array.isArray(state)) {

            var copy = state.slice();

            if (next !== void 0) {
                copy[first] = next;
                return copy;
            }

            return [].concat(copy.slice(0, first), copy.slice(first + 1));
        }

        if (next !== void 0) {
            var _extends3;

            return _extends({}, state, (_extends3 = {}, _extends3[first] = next, _extends3));
        }

        var nextState = Object.keys(state).reduce(function (nextState, name) {

            if (name !== first) {
                nextState[name] = state[name];
            }

            return nextState;
        }, {});

        return nextState;
    }

    function deleteIn(state, path) {
        return deleteInWithPath.apply(undefined, [state].concat((0, _toPath2['default'])(path)));
    }

    var ARRAY_LIKE_REG = /^\d+$/;

    function compilePath(tokens) {

        if (!tokens || !tokens.length) {
            return '';
        }

        var pathString = tokens.map(function (token, index) {
            return ARRAY_LIKE_REG.test(token) ? '[' + token + ']' : '.' + token;
        }).join('');

        return pathString[0] === '.' ? pathString.slice(1) : pathString;
    }

    function walk(obj, iterator) {

        var tokens = [];

        function next(cur) {

            var isCurrentArray = Array.isArray(cur);

            Object.keys(cur).forEach(function (key) {

                var value = cur[key];

                tokens.push(key);

                if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
                    next(value, iterator);
                } else {
                    iterator(compilePath(tokens), value, isCurrentArray);
                }

                tokens.pop();
            });
        }

        next(obj);
    }
});
//# sourceMappingURL=dataPath.js.map
