### 与 Redux 结合使用

```js

import React from 'react';
import {render} from 'react-dom';
import {
    Provider,
    connect
} from 'react-redux';
import {
    createStore,
    combineReducer,
    createActionCreators
} from 'redux';
import {createForm, createReducer, Field} from 'melon-form';
import {connect} from 'react-redux';

let model = 'form';

let store = createStore(
    combineReducer({
        [model]: createReducer({
            value: {
                name: 'test',
                age: 18
            }
        })
    })
);

let Form = createForm({
    connect: connect,
    model: model
})(props => {

    return (
        <form
            onSubmit={props.actions.submit}>
            <Field name="name" control={TextControl} />
            <Field name="age" control={IntegerControl} />
            <button type="submit">submit</button>
            <button type="reset">reset</button>
        </form>
    );

});

render(
    <Provider store={store}>
        <Form />
    </Provider>,
    document.getElementById('root')
);


```
