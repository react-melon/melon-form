/**
 * @file form reducer
 * @author leon <ludafa@outlook.com>
 */

import update from 'react-addons-update';

export function initialize(state = {}, action) {

    let value = state.value || {};

    return update(state, {
        value: {
            $set: value
        },
        meta: {
            $set: {}
        },
        initialValue: {
            $set: value
        }
    });

}

export function reset(state, action) {
    return update(state, {
        value: {
            $set: state.initialValue
        },
        meta: {
            $set: {}
        }
    });
}

export function touchAll(state) {

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
