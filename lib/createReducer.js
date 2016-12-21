(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './actionTypes', './reducers/index'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./actionTypes'), require('./reducers/index'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.actionTypes, global.index);
        global.createReducer = mod.exports;
    }
})(this, function (exports, _actionTypes, _index) {
    'use strict';

    exports.__esModule = true;
    exports.default = createReducer;

    var actionTypes = _interopRequireWildcard(_actionTypes);

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

    var _MAP;

    var MAP = (_MAP = {}, _MAP[actionTypes.FOCUS] = reducers.focus, _MAP[actionTypes.CHANGE] = reducers.change, _MAP[actionTypes.TOUCH] = reducers.touch, _MAP[actionTypes.TOUCH_ALL] = reducers.touchAll, _MAP[actionTypes.BLUR] = reducers.blur, _MAP[actionTypes.ARRAY_SWAP] = reducers.arraySwap, _MAP[actionTypes.ARRAY_PUSH] = reducers.arrayPush, _MAP[actionTypes.ARRAY_POP] = reducers.arrayPop, _MAP[actionTypes.ARRAY_SHIFT] = reducers.arrayShift, _MAP[actionTypes.ARRAY_UNSHIFT] = reducers.arrayUnshift, _MAP[actionTypes.ARRAY_SPLICE] = reducers.arraySplice, _MAP[actionTypes.INITIALIZE] = reducers.initialize, _MAP[actionTypes.RESET] = reducers.reset, _MAP[actionTypes.VALIDITY_UPDATE] = reducers.updateValidity, _MAP[actionTypes.ASYNC_VALIDATE_START] = reducers.setValidateStart, _MAP[actionTypes.ASYNC_VALIDATE_SUCCEED] = reducers.setValidateSucceed, _MAP[actionTypes.ASYNC_VALIDATE_FAILED] = reducers.setValidateFailed, _MAP[actionTypes.REGISTER] = reducers.register, _MAP[actionTypes.UNREGISTER] = reducers.unregister, _MAP[actionTypes.PENDING_START] = reducers.startPending, _MAP[actionTypes.PENDING_STOP] = reducers.stopPending, _MAP);

    function createReducer(model) {
        var initialValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var customReducers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};


        function getModel(action) {
            return typeof model === 'function' ? model(action) : model;
        }

        return function () {
            var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { value: initialValue, meta: {} };
            var action = arguments[1];
            var type = action.type,
                payload = action.payload;


            var embedReducer = MAP[type];
            var customReducer = customReducers[type];

            // 跳过
            if (
            // 不是当前绑定域
            payload && payload.model !== getModel(action)
            // 或者无 reducer 绑定
            || !embedReducer && !customReducer) {
                return state;
            }

            return customReducer
            // 优先使用自定义 reducer
            ? customReducer(state, action, embedReducer) : embedReducer(state, action);
        };
    }
});
//# sourceMappingURL=createReducer.js.map
