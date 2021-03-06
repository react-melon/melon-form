/**
 * @file field reducer
 * @author leon <ludafa@outlook.com>
 */

import update from 'react-addons-update';
import {setInWithPath} from '../util/dataPathMap';
import {getIn, setIn, deleteIn} from '../util/dataPath';
import {DEFAULT_META} from '../constants';

export function focus(state, action) {

    let name = action.payload.name;

    return update(state, {
        meta: {
            [name]: {
                $apply(meta = DEFAULT_META) {
                    return {
                        ...meta,
                        focus: true
                    };
                }
            }
        }
    });

}

export function blur(state, action) {

    let name = action.payload.name;

    return update(state, {
        meta: {
            [name]: {
                $apply(meta = DEFAULT_META) {
                    return {
                        ...meta,
                        focus: false
                    };
                }
            }
        }
    });

}

export function touch(state, action) {

    let name = action.payload.name;

    return update(state, {
        meta: {
            $apply(meta) {
                return setInWithPath(
                    meta || DEFAULT_META,
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

export function change(state, action) {

    let {name, value} = action.payload;

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
                return setInWithPath(
                    meta || DEFAULT_META,
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

export function updateValidity(state, action) {

    let validity = action.payload.validity;

    return update(state, {
        meta: {
            $apply(meta) {
                return Object
                    .keys(meta)
                    .reduce((nextMeta, key) => {

                        nextMeta[key] = {
                            ...DEFAULT_META,
                            ...meta[key],
                            error: validity && validity[key] || ''
                        };

                        return nextMeta;

                    }, {});
            }
        }
    });

}

export function register(state, action) {

    return update(state, {
        meta: {
            [action.payload.name]: {
                $set: DEFAULT_META
            }
        }
    });

}

export function unregister(state, action) {
    return update(state, {
        meta: {
            $apply(meta) {
                return deleteIn(meta, action.payload.name);
            }
        }
    });
}

export function setValidateStart(state, action) {

    let name = action.payload.name;

    return update(state, {

        meta: {
            $apply(meta) {

                return Object
                    .keys(meta)
                    .reduce((nextMeta, key) => {

                        nextMeta[key] = {
                            ...DEFAULT_META,
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

export function setValidateSucceed(state, action) {

    let name = action.payload.name;

    return name
        ? update(state, {
            meta: {
                [name]: {
                    $apply(meta = DEFAULT_META) {
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
                                ...DEFAULT_META,
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

export function setValidateFailed(state, action) {

    let {name, error} = action.payload;

    return name
        ? update(state, {
            meta: {
                [name]: {
                    $apply(meta = DEFAULT_META) {
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
                                ...DEFAULT_META,
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

export function startPending(state, action) {
    return update(state, {
        meta: {
            [action.payload.name]: {
                $apply(meta = DEFAULT_META) {
                    return {
                        ...meta,
                        pending: true
                    };
                }
            }
        }
    });
}

export function stopPending(state, action) {
    return update(state, {
        meta: {
            [action.payload.name]: {
                $apply(meta = DEFAULT_META) {
                    return {
                        ...meta,
                        pending: false
                    };
                }
            }
        }
    });
}

export function fillMeta(state, action) {

    let {
        name,
        meta
    } = action.payload;

    return update(state, {
        meta: {
            [name]: {
                $apply(target = DEFAULT_META) {
                    return {
                        ...target,
                        ...meta
                    };
                }
            }
        }
    });

}
