/**
 * @file array field reducer
 * @author leon <ludafa@outlook.com>
 */

import update from 'react-addons-update';
import mapValues from 'lodash/mapValues';
import {DEFAULT_META} from '../constants';

import {
    setInWithPath,
    swap,
    make,
    remove,
    splice
} from '../util/dataPathMap';

import {
    getIn,
    setIn
} from '../util/dataPath';

export function arraySwap(state, action) {

    let {name, from, to} = action.payload;

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
                return setInWithPath(
                    swap(meta, name, from, to),
                    name,
                    data => ({...data, touched: true})
                );
            }
        }
    });

}

export function arrayPush(state, action) {

    let {name, elements} = action.payload;

    let {
        value,
        meta
    } = state;

    let currentValue = getIn(value, name) || [];
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
            $set: {
                ...meta,
                ...mapValues(
                    make(
                        elements,
                        name,
                        currentValue.length
                    ),
                    () => DEFAULT_META
                )
            }
        }
    });

}

export function arrayPop(state, action) {

    let name = action.payload.name;

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
            $set: remove(
                meta,
                `${name}[${currentValue.length - 1}]`
            )
        }
    });

}

export function arrayShift(state, action) {

    let name = action.payload.name;

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
            $set: splice(
                meta, name,
                currentValue, 0, 1, []
            )
        }
    });

}

export function arrayUnshift(state, action) {

    let {name, elements} = action.payload;

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
            $set: splice(
                meta, name,
                currentValue, 0, 0, elements
            )
        }
    });

}

export function arraySplice(state, action) {

    let {
        name,
        start,
        deleteCount,
        replacements
    } = action.payload;

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
            $set: splice(
                meta,
                name,
                currentValue, start, deleteCount, replacements, DEFAULT_META
            )
        }
    });

}
