/**
 * @file selectors
 * @author leon <ludafa@outlook.com>
 */

import {getIn} from './util/dataPath';

export function getFormData(store) {
    return store.value;
}

export function getMeta(store) {
    return store.meta;
}

export function getFieldData(store, name) {

    const formData = getFormData(store);
    const meta = getMeta(store);

    const data = {
        value: getIn(formData, name),
        meta: meta[name]
    };

    return data;

}
