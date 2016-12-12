### Controlled Form

```js

import React, {Component} from 'react';
import {
    Form,
    Field,
    ValidityLabel,
    TextControl,
    createReducer,
    createActionCreators,
    createStore
} from 'melon-form';

class App extends Component {

    constructor(...args) {

        super(...args);

        // 此处的 createStore 与 redux.createStore 一致
        const store = this.store = createStore(
            createReducer(
                // 提供初始值
                {
                    value: {
                        name: 'melon',
                        age: '1'
                    }
                }
            )
            // 可以在这里提供 dehydrated state
        );

        const actions = this.actions = {
            ...createActionCreators(
                {
                    sync: this.validate,
                    async: null,
                }
            ),
            {
                customActionCreator(...args) {
                    return {
                        type: 'custom-action-type',
                        payload: args
                    };
                },
                customThunkActionCreator(...args) {
                    return (dispatch, getState) => {
                        dispatch(
                            this.actions.setValidity(
                                this.validate(getState())
                            )
                        );
                    };
                }
            }
        };

    }

    componentWillUnmount() {
        this.store = this.actions = null;
    }

    validate(formData) {

        let errors = {};

        if (!formData.name) {
            errors.age = 'name is required';
        }
        else if (formData.name.length < 5) {
            errors.age = 'name must longer than 5';
        }

        if (/^\d+%/.test(formData.age)) {
            errors.age = 'age must be an integer';
        }

        return errors;

    }

    render() {

        return (
            <Form
                store={this.store}
                actions={this.actions}
                // 这个回调只在通过校验后才会触发
                onSumbit={(e, {formData, meta, reset}) => {

                    // e is the native `form-submit` event
                    // formData contains all the data from this form
                    // meta contains all the editing meta informations

                    // prevent default submit event
                    e.preventDefault();

                    // send form data to backend service
                    fetch('/some/remote/data/service', {
                        method: 'POST',
                        body: JSON.stringify(formData)
                    }).then(() => {
                        reset();
                    });

                }}>

                <Field name="name" control={TextControl} />

                <Field name="age" control={IntegerControl} />

                <button type="submit">submit</button>

            </Form>
        );

    }

}

```


其中, `TextControl` 是由 `melon-form` 提供的一个标准的 `Control`，它的源码大概如下：

```js
export default function TextControl(props) {

    const {
        name,
        value,
        actions,
        meta,
        validity
    } = props;

    const {
        focus,
        touched
    } = meta;

    const message = !focus && touched && validity && validity.length
        ? validity[0].message
        : '';

    const className = cx({
        invalid: !message,
        valid: !!message,
        focusing: focus
    });

    return (
        <div>
            <input
                className={className}
                name={name}
                value={value}
                onFocus={() => actions.focus(name)}
                onChange={e => actions.change(name, e.target.value)}
                onBlur={() => dispatch => {
                    dispatch(actions.blur(name));
                    dispatch(actions.validate(name));
                }} />
            <label>{message}</label>
        </div>
    );

}
```

这里使用了 `input` 作为视觉实体，也可以使用其他的任意组件作为 `Control`；例如 `Material UI` 的组件。

`IntegerControl` 则是一个 `整数` 组件，额外提供了 `-` 和 `+` 两个按钮，大概的代码如下：

```js

export default function IntegerControl(props) {

    const {
        name,
        value,
        actions,
        meta,
        validity
    } = props;

    const {
        focus,
        touched
    } = meta;

    const message = !focus && touched && validity && validity.length
        ? validity[0].message
        : '';

    const className = cx({
        invalid: !message,
        valid: !!message,
        focusing: focus
    });

    return (
        <div>
            <button
                type="button"
                onClick={() => actions.change(name, value - 1)}>-</button>
            <input
                className={className}
                name={name}
                value={`$${value}`}
                onFocus={() => actions.focus(name))
                onBlur={() => {
                    actions.blur(name);
                    actions.validate(name);
                }}
                onChange={e => actions.change(name, e.target.value)} />
            <button
                type="button"
                onClick={() => actions.change(name, value + 1)}>+</button>
            <label>{message}</label>
        </div>
    );


}

```
