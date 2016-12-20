/**
 * @file Form
 * @author leon <ludafa@outlook.com>
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {model} from './constants';
import {
    Form,
    createActionCreators
} from '../src/index';

import TextControl from './control/TextControl';
import NumberControl from './control/NumberControl';
import ArrayControl from './control/ArrayControl';
import {
    StringField,
    ArrayField,
    NumberField,
    BooleanField,
    ObjectField
} from './Field';

const PasswordControl = props => <TextControl {...props} type="password" />;

class FormControl extends Component {

    render() {

        const {
            actions,
            value,
            meta
        } = this.props;

        return (
            <form onSubmit={e => {
                e.preventDefault();
                actions.submit(formData => {
                    console.log(formData);
                });
            }}>
                <label>name</label>
                <StringField name="name" control={TextControl} />
                <label>password</label>
                <StringField
                    name="password"
                    control={PasswordControl} />
                <label>age</label>
                <StringField
                    name="age"
                    control={NumberControl} />
                <label>books</label>
                <ArrayField name="books" control={ArrayControl} />
                <button type="submit">
                    submit
                </button>
            </form>
        );

    }

}

export default function ExampleForm(props) {

    return (
        <Form
            model={model}
            control={FormControl} />
    );

}
