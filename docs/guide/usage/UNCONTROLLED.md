### Uncontrolled Form

在 `Uncontrolled` 模式下，你无法干预用户的输入、校验状态，一切都是自动完成的；

Form.js

```js

import React, {Component} from 'react';
import {
    createForm,
    Field,
    TextControl
} from 'melon-form';

function UncontrolledForm(props) {

    const {
        actions,
        validity,
        value,
        dispatch
    } = props;

    return (
        <form onSubmit={actions.submit}>
            <Field name="name" control={TextControl} />
            <Field
                name="password"
                control={
                    props => <TextControl {...props} type="password" />
                } />
            <button
                type="submit"
                disabled={validity.isValid()}>
                submit
            </button>
        </form>
    );

}

export createForm({

    // optional: ['local', 'redux', 'ei']
    type: 'local',

    // optional
    validate(formData, {name, value}, props) {
        return null;
    },

    // optional
    asyncValidate(formData, {name, value}, props) {
        return null;
    }

})(UncontrolledForm);

```

main.js

```js
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import UncontrolledForm from './UncontrolledForm';
ReactDOM.render(
    <UncontrolledForm
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
