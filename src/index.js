/**
 * @file melon-form
 * @author leon <ludafa@outlook.com>
 */

import createActionCreators from './createActionCreators';
import createReducer from './createReducer';
import createForm from './createForm';
import createField from './createField';

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
    createForm,
    createField,
    dataPath,
    reducers
};
