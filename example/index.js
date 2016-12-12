/**
 * @file melon form demo
 * @author leon <ludafa@outlook.com>
 */

import React from 'react';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import ReactDOM from 'react-dom';
import {createReducer} from '../src/index';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import Form from './Form';
import {model} from './constants';

let store = createStore(
    combineReducers({
        [model]: createReducer({
            initialValue: {
                books: [{email: 'test@test.com'}, {author: 'test'}]
            },
            supports: {
                services: [{
                    name: '1',
                    value: '1'
                }],
                captcha: {
                    url: 'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/logo_white.png'
                }
            }
        })
    }),
    applyMiddleware(
        thunk,
        logger({
            collapsed: true
        })
    )
);

ReactDOM.render(
    <Provider store={store}>
        <Form test="a" />
    </Provider>,
    document.querySelector('#main')
);
