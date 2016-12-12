### 与 Redux 结合使用

View.js

```js



```

```js

import React from 'react';
import {render} from 'react-dom';
import {Page, connect, composeReducer} from 'ei';
import {createStore, combineReducer, createActionCreators} from 'redux';
import {createForm, createReducer, Field} from 'melon-form';
import View from './View';

let model = 'form';

let SomePage = Page.extends({
    view: View,
    reducer: composeReducer({
        [model]: createReducer({
            value: {
                name: 'test',
                age: 18
            }
        })
    })
});

let Form = createForm({
    connect: (mapStateToProps, mapDispatchToProps, Form) => {
        return connect(Form, mapStateToProps, mapDispatchToProps);
    },
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
