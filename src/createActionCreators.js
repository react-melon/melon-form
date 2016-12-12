/**
 * @file action creators factory
 * @author leon <ludafa@outlook.com>
 */

import * as types from './actionTypes';
import {isValid, resolveAsyncTasks} from './util/validity';
import * as selectors from './selectors';

export default function createActionCreators(options) {

    return props => {

        function createEventMeta(name, type) {

            return {
                event: {
                    handler: type,
                    getEvent(state) {
                        return {
                            name,
                            value: state.value
                        };
                    }
                }
            };

        }

        function initialize(value, schema, validator) {
            return {
                type: types.INITIALIZE,
                payload: {
                    value,
                    schema,
                    validator
                }
            };
        }

        function updateValidity(validity) {
            return {
                type: types.VALIDITY_UPDATE,
                payload: validity
            };
        }

        function validate(origin) {

            return (dispatch, getState) => {

                const {
                    model,
                    validate
                } = options;

                if (props.noValidate || !validate) {
                    return;
                }

                let store = getState();

                let validity = validate(
                    model ? store[model] : store,
                    props,
                    origin
                );

                // 找出所有的异步校验
                let tasks = resolveAsyncTasks(validity);

                // 如果没有异步校验任务，那么就直接更新校验数据即可
                if (!tasks.length) {
                    dispatch(updateValidity(validity));
                    return validity;
                }

                // 找到所有的 async validate task
                // 对每个 task 做处理
                // 1. 立即触发 async_validate_start
                // 2. 绑定执行完成处理 async_validate_succeed / failed

                let promises = tasks
                    .map(({name, task}) => {

                        dispatch({
                            type: types.ASYNC_VALIDATE_START,
                            payload: name
                        });

                        return task.then(
                            () => {
                                dispatch({
                                    type: types.ASYNC_VALIDATE_SUCCEED,
                                    payload: {
                                        name
                                    }
                                });
                            },
                            error => {
                                dispatch({
                                    type: types.ASYNC_VALIDATE_FAILED,
                                    payload: {
                                        name,
                                        error
                                    }
                                });
                            }
                        );

                    });

                return Promise.all(promises).then(
                    results => results.reduce(
                        (validity, result, index) => {
                            validity[tasks[index].name] = null;
                            return validity;
                        },
                        {
                            ...validity
                        }
                    ),
                    errors => errors.reduce(
                        (validity, result, index) => {
                            validity[tasks[index].name] = result;
                            return validity;
                        },
                        {
                            ...validity
                        }
                    )
                );

            };


        }

        function touchAll() {
            return {
                type: types.TOUCH_ALL
            };
        }

        function submit(callback) {

            return (dispatch, getState) => {

                let state = getState()[options.model];

                function onValidateFinish(validity) {

                    if (isValid(validity)) {
                        callback && callback(selectors.getFormData(state));
                    }

                }

                dispatch(touchAll());

                let validity = dispatch(validate());

                validity instanceof Promise
                    ? validity.then(onValidateFinish)
                    : onValidateFinish(validity);

            };

        }

        function reset() {
            return {
                type: types.RESET
            };
        }

        function focus(name) {
            return {
                type: types.FOCUS,
                payload: name
            };
        }

        function change(name, value) {
            return {
                type: types.CHANGE,
                payload: {
                    name,
                    value
                },
                meta: createEventMeta(name, 'onFieldChange')
            };
        }

        function blur(name) {

            return (dispatch, getState) => {

                dispatch({
                    type: types.BLUR,
                    payload: name
                });

                return dispatch(validate(name));

            };

        }

        function touch(name) {
            return {
                type: types.TOUCH,
                payload: name
            };
        }

        function arrayPush(name, ...elements) {

            return dispatch => {

                dispatch({
                    type: types.ARRAY_PUSH,
                    payload: {
                        name,
                        elements
                    },
                    meta: createEventMeta(name, 'onFieldChange')
                });

                dispatch(validate(name));

            };

        }

        function arraySplice(
            name,
            start,
            deleteCount,
            ...replacements
        ) {

            return dispatch => {

                dispatch({
                    type: types.ARRAY_SPLICE,
                    payload: {
                        name,
                        start,
                        deleteCount,
                        replacements
                    },
                    meta: createEventMeta(name, 'onFieldChange')
                });

                dispatch(validate(name));

            };

        }

        function arraySwap(name, from, to) {

            return dispatch => {

                dispatch({
                    type: types.ARRAY_SWAP,
                    payload: {
                        from,
                        to,
                        name
                    },
                    meta: createEventMeta(name, 'onFieldChange')
                });

                dispatch(validate(name));

            };

        }

        function register(name) {
            return {
                type: types.REGISTER,
                payload: name
            };
        }

        function unregister(name) {
            return {
                type: types.UNREGISTER,
                payload: name
            };
        }

        return {

            // form
            initialize,
            submit,
            reset,
            touchAll,

            // form & field
            validate,

            // field
            register,
            unregister,
            focus,
            change,
            blur,
            touch,

            // array field
            arrayPush,
            arraySplice,
            arraySwap
        };

    };

}
