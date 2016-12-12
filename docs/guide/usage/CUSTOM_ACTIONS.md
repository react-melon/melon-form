# 自定义 action & reducer

Form.js

```js

import React, {Component} from 'react';
import {
    createForm,
    createField,
    TextControl,
    createActionCreators,
    createReducer
} from 'melon-form';

const model = 'form';

const Field = createField()();

class Form extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.actions.fetchCaptcha();
    }

    render() {

        const {
            actions,
            validity,
            value,
            meta,
            dispatch
        } = this.props;

        return (
            <form onSubmit={actions.submit}>
                <Field name="name" control={TextControl} />
                <Field
                    name="password"
                    control={
                        props => <TextControl {...props} type="password" />
                    } />
                <img
                    onClick={actions.fetchCaptcha}
                    src={value.captcha.url} />
                <button
                    type="submit"
                    disabled={validity.isValid()}>
                    submit
                </button>
            </form>
        );

    }

}

export createForm({

    getActions(props) {

        const defaults = createActionCreators();

        return {
            ...defaults,
            fetchCaptcha() {
                return (dispatch, getState) => {

                    dispatch({
                        type: 'FETCH_CAPTCHA_START';
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

    },

    // 只在 type = 'local' 此参数生效
    // 当 type = redux 或者 type = ei 时，都需要在 createStore 处做 reducer 的合并
    getReducer(props) {

        const defaultReducer = createReducer({
            value: props.initialValue || {},
            captcha: {
                url: '',
                fetching: false
            }
        });

        return (state, action) => {

            const {type, payload} = action;

            switch (type) {
                case 'FETCH_CAPTCHA_START':
                    return {
                        ...state,
                        captcha: {
                            fetching: true
                        }
                    };
                case 'FETCH_CAPTCHA_SUCCEED':
                    return {
                        ...state,
                        captcha: {
                            fetching: false,
                            url: payload
                        }
                    };
                default:
                    return defaultReducer(state, action);
            }

        };

    }

    // optional
    validate(formData, {name, value}, props) {
        return null;
    },

    // optional
    asyncValidate(formData, {name, value}, props) {
        return null;
    }

})(Form);
```

main.js

```js
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Form from './UncontrolledForm';
ReactDOM.render(
    <Form
        initialValue={{}}
        onSubmit={(value, actions, getState) => {
            return fetch('/post/endpoint', {
                method: 'POST',
                body: value
            })
            .then(response => response.json())
            .then(() => {
                alert('submit');
                actions.reset();
            })
            .catch(error => {
                actions.setValidity(error);
            });
        }}
    />,
    document.querySelector('app')
);
```
