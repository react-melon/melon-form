/**
 * @file reducer
 * @author leon <ludafa@outlook.com>
 */

import {
    FOCUS,
    CHANGE,
    TOUCH,
    TOUCH_ALL,
    BLUR,
    ARRAY_SWAP,
    ARRAY_PUSH,
    ARRAY_POP,
    ARRAY_SHIFT,
    ARRAY_UNSHIFT,
    ARRAY_SPLICE,
    INITIALIZE,
    RESET,
    VALIDITY_UPDATE,
    REGISTER,
    UNREGISTER,
    ASYNC_VALIDATE_START,
    ASYNC_VALIDATE_SUCCEED,
    ASYNC_VALIDATE_FAILED
} from './actionTypes';

import update from 'react-addons-update';
import {getIn, setIn, deleteIn} from './util/dataPath';
import * as dataPathMap from './util/dataPathMap';
import mapValues from 'lodash/mapValues';

const DEFAULT_META = {
    touched: false,
    submitting: false,
    focus: false,
    dirty: false,
    error: null
};

export default function createReducer(options = {}) {

    const {
        initialValue = {},
        model,
        supports = {}
    } = options;

    function initialize(state, {value, schema, validator}) {

        return update(state, {
            value: {
                $set: value
            },
            meta: {
                $set: mapValues(
                    dataPathMap.make(value),
                    () => DEFAULT_META
                )
            }
        });

    }

    function reset(state, payload) {

    }

    function focus(state, pointer) {

        return update(state, {
            meta: {
                [pointer]: {
                    focus: {$set: true}
                }
            }
        });

    }

    function blur(state, pointer) {

        return update(state, {
            meta: {
                [pointer]: {
                    focus: {$set: false}
                }
            }
        });

    }

    function touch(state, name) {
        return update(state, {
            meta: {
                $apply(meta) {
                    return dataPathMap.setInWithPath(
                        meta,
                        name,
                        data => ({
                            ...data,
                            touched: true
                        })
                    );
                }
            }
        });
    }

    function touchAll(state) {

        return update(state, {
            meta: {
                $apply(meta) {

                    let hasChanged = false;
                    let nextMeta = {};

                    /* eslint-disable fecs-use-for-of */
                    for (let key in meta) {
                        if (meta.hasOwnProperty(key)) {

                            if (meta[key].touched) {
                                nextMeta[key] = meta[key];
                            }
                            else {
                                nextMeta[key] = {
                                    ...meta[key],
                                    touched: true
                                };
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

    function change(state, {name, value}) {

        if (getIn(state.value) === value) {
            return state;
        }

        const nextValue = setIn(
            state.value,
            name,
            value
        );

        return update(state, {
            meta: {
                $apply(meta) {
                    return dataPathMap.setInWithPath(
                        meta,
                        name,
                        data => ({
                            ...data,
                            touched: true
                        })
                    );
                }
            },
            value: {
                $set: nextValue
            }
        });

    }

    function arraySwap(state, {name, from, to}) {

        if (from === to) {
            return state;
        }

        return update(state, {
            value: {
                $apply(value) {
                    if (from > to) {
                        [from, to] = [to, from];
                    }

                    let currentValue = getIn(value, name);

                    return setIn(value, name, [
                        ...currentValue.slice(0, from),
                        currentValue[to],
                        ...currentValue.slice(from + 1, to),
                        currentValue[from],
                        ...currentValue.slice(to + 1)
                    ]);
                }
            },
            meta: {
                $apply(meta) {
                    return dataPathMap.setInWithPath(
                        dataPathMap.swap(meta, name, from, to),
                        name,
                        data => ({...data, touched: true})
                    );
                }
            }
        });

    }

    function arrayPush(state, {name, elements}) {

        let {
            value,
            meta
        } = state;

        let currentValue = getIn(value, name) || [];
        let currentLength = currentValue.length;
        let nextValue = setIn(
            value,
            name,
            [...currentValue, ...elements]
        );

        return update(state, {
            value: {
                $set: nextValue
            },
            meta: {
                $set: elements.reduce((meta, element, i) => {

                    return {
                        ...meta,
                        ...mapValues(
                            dataPathMap.make(
                                element,
                                `${name}[${currentLength + i}]`
                            ),
                            () => DEFAULT_META
                        )
                    };

                }, meta)
            }
        });

    }

    function arrayPop(state, {name}) {

        let {
            value,
            meta
        } = state;

        let currentValue = getIn(value, name);
        let nextValue = setIn(value, name, currentValue.slice(0, -1));

        return update(state, {
            value: {
                $set: nextValue
            },
            meta: {
                $set: dataPathMap.remove(
                    meta,
                    `${name}[${currentValue.length - 1}]`
                )
            }
        });

    }

    function arrayShift(state, {name}) {

        let {
            value,
            meta
        } = state;

        let currentValue = getIn(value, name);
        let nextValue = setIn(value, name, currentValue.slice(1));

        return update(state, {
            value: {
                $set: nextValue
            },
            meta: {
                $set: dataPathMap.splice(
                    meta, name,
                    currentValue, 0, 1, []
                )
            }
        });

    }

    function arrayUnshift(state, {name, elements}) {

        let {
            value,
            meta
        } = state;

        let currentValue = getIn(value, name);
        let nextValue = setIn(
            value,
            name,
            [...elements, ...currentValue]
        );

        return update(state, {
            value: {
                $set: nextValue
            },
            meta: {
                $set: dataPathMap.splice(
                    meta, name,
                    currentValue, 0, 0, elements
                )
            }
        });

    }

    function arraySplice(state, payload) {

        let {
            name,
            start,
            deleteCount,
            replacements
        } = payload;

        let {
            value,
            meta
        } = state;


        let currentValue = getIn(value, name);
        let nextValue = setIn(
            value,
            name,
            [
                ...currentValue.slice(0, start),
                ...replacements,
                ...currentValue.slice(start + deleteCount)
            ]
        );

        return update(state, {
            value: {
                $set: nextValue
            },
            meta: {
                $set: dataPathMap.splice(
                    meta, name,
                    currentValue, start, deleteCount, replacements
                )
            }
        });

    }

    function updateValidity(state, validity) {

        if (!validity) {
            return state;
        }

        return update(state, {
            meta: {
                $apply(meta) {
                    return Object
                        .keys(meta)
                        .reduce((nextMeta, key) => {

                            nextMeta[key] = {
                                ...meta[key],
                                error: validity[key] || ''
                            };

                            return nextMeta;

                        }, {});
                }
            }
        });

    }

    function register(state, name) {
        return update(state, {
            meta: {
                [name]: {
                    $set: DEFAULT_META
                }
            }
        });
    }

    function unregister(state, name) {
        return update(state, {
            meta: {
                $apply(meta) {
                    return deleteIn(meta, name);
                }
            }
        });
    }

    function setValidateStart(state, name) {

        return update(state, {

            meta: {
                $apply(meta) {

                    return Object
                        .keys(meta)
                        .reduce((nextMeta, key) => {

                            nextMeta[key] = {
                                ...meta[key],

                                // 不指定 name 或者等于指定 name
                                validating: (!name || key === name),

                                // 如果是 form validate 即无 name，那么同步校验已通过，error 设置为 null
                                // 如果是 field validate 即有 name，指定 name 的要保留，否则清空
                                error: name === key ? null : meta[key].error
                            };

                            return nextMeta;

                        }, {});

                }
            }

        });

    }

    function setValidateSucceed(state, {name}) {
        return name
            ? update(state, {
                meta: {
                    [name]: {
                        $apply(meta) {
                            return {
                                ...meta,
                                validating: false,
                                error: null
                            };
                        }
                    }
                }
            })
            : update(state, {
                meta: {
                    $apply(meta) {

                        return Object
                            .keys(meta)
                            .reduce((nextMeta, key) => {

                                nextMeta[key] = {
                                    ...meta[key],
                                    validating: false,
                                    error: null
                                };

                                return nextMeta;

                            }, {});

                    }
                }
            });
    }

    function setValidateFailed(state, {name, error}) {

        return name
            ? update(state, {
                meta: {
                    [name]: {
                        $apply(meta) {
                            return {
                                ...meta,
                                validating: false,
                                error
                            };
                        }
                    }
                }
            })
            : update(state, {
                meta: {
                    $apply(meta) {

                        return Object
                            .keys(meta)
                            .reduce((nextMeta, key) => {

                                nextMeta[key] = {
                                    ...meta[key],
                                    validating: false,
                                    error
                                };

                                return nextMeta;

                            }, {});

                    }
                }
            });

    }

    const MAP = {
        [FOCUS]: focus,
        [CHANGE]: change,
        [TOUCH]: touch,
        [TOUCH_ALL]: touchAll,
        [BLUR]: blur,
        [ARRAY_SWAP]: arraySwap,
        [ARRAY_PUSH]: arrayPush,
        [ARRAY_POP]: arrayPop,
        [ARRAY_SHIFT]: arrayShift,
        [ARRAY_UNSHIFT]: arrayUnshift,
        [ARRAY_SPLICE]: arraySplice,
        [INITIALIZE]: initialize,
        [RESET]: reset,
        [VALIDITY_UPDATE]: updateValidity,
        [ASYNC_VALIDATE_START]: setValidateStart,
        [ASYNC_VALIDATE_SUCCEED]: setValidateSucceed,
        [ASYNC_VALIDATE_FAILED]: setValidateFailed,
        [REGISTER]: register,
        [UNREGISTER]: unregister
    };

    function getInitialState(model, initialValue) {
        return model
            ? {
                [model]: {
                    ...supports,
                    value: initialValue,
                    meta: {}
                }
            } : {
                ...supports,
                value: initialValue,
                meta: {}
            };
    }

    return function (
        state = getInitialState(model, initialValue),
        {type, payload}
    ) {

        let reducer = MAP[type];

        if (!reducer) {
            return state;
        }

        return model
            ? {
                ...state,
                [model]: reducer(state[model], payload)
            }
            : {
                ...state,
                ...reducer(state, payload)
            };

    };
}
