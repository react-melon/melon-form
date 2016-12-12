/**
 * @file Field
 * @author leon <ludafa@outlook.com>
 */

import {connect} from 'react-redux';
import {model} from './constants';
import createAllTypeFields from './util/createAllTypeFields';

const {
    Field,
    StringField,
    ArrayField,
    NumberField,
    BooleanField,
    ObjectField
} = createAllTypeFields({model, connect});

/* eslint-disable fecs-export-on-declare */
export {
    Field,
    StringField,
    ArrayField,
    NumberField,
    BooleanField,
    ObjectField
};
