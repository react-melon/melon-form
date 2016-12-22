/**
 * @file selectors
 * @author leon <ludafa@outlook.com>
 */

import {getIn} from './util/dataPath';
import {DEFAULT_META} from './constants';

export function getModel(state, model) {
    return getIn(state, model);
}

export function getValue(store, model) {
    return getModel(store, model).value;
}

export function getMeta(store, model) {
    return getModel(store, model).meta;
}

export function getFieldData(store, model, name) {

    const formData = getValue(store, model);
    const meta = getMeta(store, model);

    const data = {
        value: getIn(formData, name),
        meta: meta[name] || DEFAULT_META
    };

    return data;

}
