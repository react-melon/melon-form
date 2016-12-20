/**
 * @file action creators factory
 * @author leon <ludafa@outlook.com>
 */

import * as types from './actionTypes';
import {isValid, resolveAsyncTasks} from './util/validity';
import * as selectors from './selectors';

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

export default (() => {

    let memoizedActions;
    let memoizedProps;

    return props => {

        if (memoizedActions && props === memoizedProps) {
            return memoizedActions;
        }

        let model = props.model;

        function initialize(value) {
            return {
                type: types.INITIALIZE,
                payload: {
                    value,
                    model
                }
            };
        }

        function updateValidity(validity) {
            return {
                type: types.VALIDITY_UPDATE,
                payload: {validity, model}
            };
        }

        function validate(origin) {

            return (dispatch, getState) => {

                let validate = props.validate;

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
                            payload: {name, model}
                        });

                        return task.then(
                            () => {
                                dispatch({
                                    type: types.ASYNC_VALIDATE_SUCCEED,
                                    payload: {
                                        name,
                                        model
                                    }
                                });
                            },
                            error => {
                                dispatch({
                                    type: types.ASYNC_VALIDATE_FAILED,
                                    payload: {
                                        name,
                                        error,
                                        model
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
                type: types.TOUCH_ALL,
                payload: {model}
            };
        }

        function submit(callback) {

            return (dispatch, getState) => {

                let state = getState()[model];

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
                type: types.RESET,
                payload: {model}
            };
        }

        function focus(name) {
            return {
                type: types.FOCUS,
                payload: {name, model}
            };
        }

        function change(name, value) {
            return {
                type: types.CHANGE,
                payload: {
                    name,
                    value,
                    model
                },
                meta: createEventMeta(name, 'onFieldChange')
            };
        }

        function blur(name) {

            return (dispatch, getState) => {

                dispatch({
                    type: types.BLUR,
                    payload: {name, model}
                });

                return dispatch(validate(name));

            };

        }

        function touch(name) {
            return {
                type: types.TOUCH,
                payload: {name, model}
            };
        }

        function arrayPush(name, ...elements) {

            return {
                type: types.ARRAY_PUSH,
                payload: {
                    name,
                    elements,
                    model
                },
                meta: createEventMeta(name, 'onFieldChange')
            };

        }

        function arraySplice(
            name,
            start,
            deleteCount,
            ...replacements
        ) {

            return {
                type: types.ARRAY_SPLICE,
                payload: {
                    name,
                    start,
                    deleteCount,
                    replacements,
                    model
                },
                meta: createEventMeta(name, 'onFieldChange')
            };

        }

        function arraySwap(name, from, to) {

            return {
                type: types.ARRAY_SWAP,
                payload: {
                    from,
                    to,
                    name,
                    model
                },
                meta: createEventMeta(name, 'onFieldChange')
            };

        }

        function register(name) {
            return {
                type: types.REGISTER,
                payload: {name, model}
            };
        }

        function unregister(name) {
            return {
                type: types.UNREGISTER,
                payload: {name, model}
            };
        }

        function startPending(name) {
            return {
                type: types.PENDING_START,
                payload: {name, model}
            };
        }

        function stopPending(name) {
            return {
                type: types.PENDING_STOP,
                payload: {name, model}
            };
        }

        memoizedActions = {

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
            startPending,
            stopPending,

            // array field
            arrayPush,
            arraySplice,
            arraySwap
        };

        return memoizedActions;

    };


})();
