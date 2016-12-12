/**
 * @file Form
 * @author leon <ludafa@outlook.com>
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {model} from './constants';
import {
    createForm,
    createActionCreators,
    isValid
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

class Form extends Component {

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

let getActions = createActionCreators({

    model,

    // optional
    validate: (() => {

        let ASYNC_VALIDATE_RESULT = {
        };

        return (state, props, origin) => {

            const errors = {};

            const {
                name,
                password,
                age,
                books
            } = state.value;

            if (!name) {
                errors.name = 'name is required';
            }
            else if (ASYNC_VALIDATE_RESULT.name
                && ASYNC_VALIDATE_RESULT.name[name]
            ) {
                errors.name = ASYNC_VALIDATE_RESULT.name[name];
            }

            // 需要异步校验的两种情况
            // 没有 origin 就是提交触发的 validate
            // 有 origin 并且 origin 是 name，也就是 name 发生了变化
            else if (!origin || origin === 'name') {
                errors.name = new Promise((resolve, reject) => {

                    setTimeout(() => {

                        if (name === 'hehe') {
                            reject('hehe has been token.');
                            ASYNC_VALIDATE_RESULT.name = {
                                ...ASYNC_VALIDATE_RESULT.name,
                                hehe: 'hehe has been token.'
                            };
                        }
                        else {
                            resolve();
                        }

                    }, 1000);

                });
            }

            if (!password) {
                errors.password = 'password is required';
            }

            if (!age) {
                errors.age = 'age is required';
            }
            else if (age < 18) {
                errors.age = '18 is required';
            }

            if (books && books.length < 3) {
                errors.books = 'books must more 2';
            }

            return errors;


        };

    })()

});

export default createForm({

    model,

    connect,

    getActions(props) {

        const defaults = getActions(props);

        return {
            ...defaults,
            fetchCaptcha() {
                return (dispatch, getState) => {

                    dispatch({
                        type: 'FETCH_CAPTCHA_START'
                    });

                    return fetch('/captcha').then(
                        url => dispatch({
                            type: 'FETCH_CAPTCHA_SUCCEED',
                            payload: url
                        }),
                        error => dispatch({
                            type: 'FETCH_CAPTCHA_FAILED',
                            payload: error
                        })
                    );

                };
            }
        };

    }

})(Form);
