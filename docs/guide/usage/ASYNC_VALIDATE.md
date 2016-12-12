### 异步校验

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
                onBlur={() => actions.validate(name)} />
            <label>{message}</label>
        </div>
    );

}

```

其中 action.validate 的逻辑大体上是这样的：

```js

function createActions({validate, asyncValidate}) {

    return {
        validate(name) {

            return (dispatch, getState) => {

                const state = getState();

                // 同步校验
                // 可以自行取表单 store 中的数据，进行任意规则校验
                const validity = validator.vaildate(state, name);

                if (!validity.isValid()) {
                    dispatch(actions.validity(validity));
                    return;
                }

                // 异步校验
                // 锁定任意字段
                dispatch(actions.setValiditing(name, true));

                return asyncValidate(state, name).then(validity => {
                    dispatch(actions.setValidity(validity));
                    dispatch(actions.setValiditing(name, false));
                }, error => {
                    alert(error);
                    dispatch(actions.setValiditing(name, false));
                });

            };

        }
    };

}

const actions = createActions(validator);

actions.validate('name');

```
