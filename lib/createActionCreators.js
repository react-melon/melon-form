(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './actionTypes', './util/validity', './selectors'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./actionTypes'), require('./util/validity'), require('./selectors'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.actionTypes, global.validity, global.selectors);
        global.createActionCreators = mod.exports;
    }
})(this, function (exports, _actionTypes, _validity, _selectors) {
    'use strict';

    exports.__esModule = true;

    var types = _interopRequireWildcard(_actionTypes);

    var selectors = _interopRequireWildcard(_selectors);

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

    function createEventMeta(name, type) {

        return {
            event: {
                handler: type,
                getEvent: function getEvent(state) {
                    return {
                        name: name,
                        value: state.value
                    };
                }
            }
        };
    }

    exports['default'] = function () {

        var memoizedActions = void 0;
        var memoizedProps = void 0;

        return function (props) {

            if (memoizedActions && props === memoizedProps) {
                return memoizedActions;
            }

            var model = props.model;

            function initialize(value) {
                return {
                    type: types.INITIALIZE,
                    payload: {
                        value: value,
                        model: model
                    }
                };
            }

            function updateValidity(validity) {
                return {
                    type: types.VALIDITY_UPDATE,
                    payload: { validity: validity, model: model }
                };
            }

            function validate(origin) {

                return function (dispatch, getState) {

                    var validate = props.validate;

                    if (props.noValidate || !validate) {
                        return;
                    }

                    var store = getState();

                    var validity = validate(selectors.getModel(store, model), props, origin);

                    // 找出所有的异步校验
                    var tasks = (0, _validity.resolveAsyncTasks)(validity);

                    // 如果没有异步校验任务，那么就直接更新校验数据即可
                    if (!tasks.length) {
                        dispatch(updateValidity(validity));
                        return validity;
                    }

                    // 找到所有的 async validate task
                    // 对每个 task 做处理
                    // 1. 立即触发 async_validate_start
                    // 2. 绑定执行完成处理 async_validate_succeed / failed

                    var promises = tasks.map(function (_ref) {
                        var name = _ref.name,
                            task = _ref.task;


                        dispatch({
                            type: types.ASYNC_VALIDATE_START,
                            payload: { name: name, model: model }
                        });

                        return task.then(function () {
                            dispatch({
                                type: types.ASYNC_VALIDATE_SUCCEED,
                                payload: {
                                    name: name,
                                    model: model
                                }
                            });
                        }, function (error) {
                            dispatch({
                                type: types.ASYNC_VALIDATE_FAILED,
                                payload: {
                                    name: name,
                                    error: error,
                                    model: model
                                }
                            });
                        });
                    });

                    return Promise.all(promises).then(function (results) {
                        return results.reduce(function (validity, result, index) {
                            validity[tasks[index].name] = null;
                            return validity;
                        }, _extends({}, validity));
                    }, function (errors) {
                        return errors.reduce(function (validity, result, index) {
                            validity[tasks[index].name] = result;
                            return validity;
                        }, _extends({}, validity));
                    });
                };
            }

            function touchAll() {
                return {
                    type: types.TOUCH_ALL,
                    payload: { model: model }
                };
            }

            function submit(callback) {

                return function (dispatch, getState) {

                    var state = getState();

                    function onValidateFinish(validity) {

                        if ((0, _validity.isValid)(validity)) {
                            callback && callback(selectors.getValue(state, model));
                        }
                    }

                    dispatch(touchAll());

                    var validity = dispatch(validate());

                    validity instanceof Promise ? validity.then(onValidateFinish) : onValidateFinish(validity);
                };
            }

            function reset() {
                return {
                    type: types.RESET,
                    payload: { model: model }
                };
            }

            function focus(name) {
                return {
                    type: types.FOCUS,
                    payload: { name: name, model: model }
                };
            }

            function change(name, value) {
                return {
                    type: types.CHANGE,
                    payload: {
                        name: name,
                        value: value,
                        model: model
                    },
                    meta: createEventMeta(name, 'onFieldChange')
                };
            }

            function blur(name) {

                return function (dispatch, getState) {

                    dispatch({
                        type: types.BLUR,
                        payload: { name: name, model: model }
                    });

                    return dispatch(validate(name));
                };
            }

            function touch(name) {
                return {
                    type: types.TOUCH,
                    payload: { name: name, model: model }
                };
            }

            function arrayPush(name) {
                for (var _len = arguments.length, elements = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                    elements[_key - 1] = arguments[_key];
                }

                return {
                    type: types.ARRAY_PUSH,
                    payload: {
                        name: name,
                        elements: elements,
                        model: model
                    },
                    meta: createEventMeta(name, 'onFieldChange')
                };
            }

            function arraySplice(name, start, deleteCount) {
                for (var _len2 = arguments.length, replacements = Array(_len2 > 3 ? _len2 - 3 : 0), _key2 = 3; _key2 < _len2; _key2++) {
                    replacements[_key2 - 3] = arguments[_key2];
                }

                return {
                    type: types.ARRAY_SPLICE,
                    payload: {
                        name: name,
                        start: start,
                        deleteCount: deleteCount,
                        replacements: replacements,
                        model: model
                    },
                    meta: createEventMeta(name, 'onFieldChange')
                };
            }

            function arraySwap(name, from, to) {

                return {
                    type: types.ARRAY_SWAP,
                    payload: {
                        from: from,
                        to: to,
                        name: name,
                        model: model
                    },
                    meta: createEventMeta(name, 'onFieldChange')
                };
            }

            function register(name) {
                return {
                    type: types.REGISTER,
                    payload: { name: name, model: model }
                };
            }

            function unregister(name) {
                return {
                    type: types.UNREGISTER,
                    payload: { name: name, model: model }
                };
            }

            function startPending(name) {
                return {
                    type: types.PENDING_START,
                    payload: { name: name, model: model }
                };
            }

            function stopPending(name) {
                return {
                    type: types.PENDING_STOP,
                    payload: { name: name, model: model }
                };
            }

            memoizedActions = {

                // form
                initialize: initialize,
                submit: submit,
                reset: reset,
                touchAll: touchAll,

                // form & field
                validate: validate,

                // field
                register: register,
                unregister: unregister,
                focus: focus,
                change: change,
                blur: blur,
                touch: touch,
                startPending: startPending,
                stopPending: stopPending,

                // array field
                arrayPush: arrayPush,
                arraySplice: arraySplice,
                arraySwap: arraySwap
            };

            return memoizedActions;
        };
    }();
});
//# sourceMappingURL=createActionCreators.js.map
