/**
 * @file melon-form
 * @author leon <ludafa@outlook.com>
 */

import createActionCreators from './createActionCreators';
import createReducer from './createReducer';
import createField from './createField';

import Form from './Form';

import * as actionTypes from './actionTypes';
import * as selectors from './selectors';
import * as dataPath from './util/dataPath';
import * as reducers from './reducers/index';
export * from './util/validity';

export const Field = createField();

export {
    createActionCreators,
    actionTypes,
    selectors,
    createReducer,
    Form,
    createField,
    dataPath,
    reducers
};
