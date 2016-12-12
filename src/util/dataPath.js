/**
 * @file data path operation
 * @author leon <ludafa@outlook.com>
 */

import get from 'lodash/get';
import toPath from 'lodash/toPath';

export const getIn = get;

function setInWithPath(state, value, first, ...paths) {

    if (first === void 0) {
        return value;
    }

    let next = setInWithPath(state && state[first], value, ...paths);

    if (typeof state !== 'object') {
        state = isNaN(+first) ? {} : [];
    }

    if (Array.isArray(state)) {
        let copy = state.slice();
        copy[first] = next;
        return copy;
    }

    return {
        ...state,
        [first]: next
    };

}

export function setIn(state, path, value) {
    return setInWithPath(state, value, ...toPath(path));
}

function deleteInWithPath(state, first, ...paths) {

    if (first == null || state == null) {
        return void 0;
    }

    let next = deleteInWithPath(state && state[first], ...paths);

    if (typeof state !== 'object') {
        state = isNaN(+first) ? {} : [];
    }

    if (Array.isArray(state)) {

        let copy = state.slice();

        if (next !== void 0) {
            copy[first] = next;
            return copy;
        }

        return [
            ...copy.slice(0, first),
            ...copy.slice(first + 1)
        ];

    }

    if (next !== void 0) {
        return {
            ...state,
            [first]: next
        };
    }

    const nextState = Object
        .keys(state)
        .reduce((nextState, name) => {

            if (name !== first) {
                nextState[name] = state[name];
            }

            return nextState;

        }, {});

    return nextState;

}

export function deleteIn(state, path) {
    return deleteInWithPath(state, ...toPath(path));
}

const ARRAY_LIKE_REG = /^\d+$/;

export function compilePath(tokens) {

    if (!tokens || !tokens.length) {
        return '';
    }

    const pathString = tokens
        .map((token, index) => (
            ARRAY_LIKE_REG.test(token) ? `[${token}]` : `.${token}`)
        )
        .join('');

    return pathString[0] === '.' ? pathString.slice(1) : pathString;

}

export function walk(obj, iterator) {

    const tokens = [];

    function next(cur) {

        let isCurrentArray = Array.isArray(cur);

        Object.keys(cur).forEach(key => {

            const value = cur[key];

            tokens.push(key);

            if (typeof value === 'object') {
                next(value, iterator);
            }
            else {
                iterator(compilePath(tokens), value, isCurrentArray);
            }

            tokens.pop();

        });
    }

    next(obj);

}
