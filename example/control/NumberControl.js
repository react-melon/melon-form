/**
 * @file IntegerControl
 * @author leon <ludafa@outlook.com>
 */

import React, {PropTypes} from 'react';
import cx from 'classnames';

/**
 * IntegerControl
 *
 * @class
 * @param {*} props props
 */
export default function IntegerControl(props) {

    const {
        name,
        value,
        actions,
        meta
    } = props;

    const {
        focus,
        touched,
        error
    } = meta;

    const message = !focus && touched && error ? error : '';

    const className = cx(
        touched ? {invalid: !message, valid: !!message} : null,
        {
            focusing: focus
        }
    );

    return (
        <div>
            <button
                type="button"
                onClick={() => {
                    actions.change(name, value - 1);
                    actions.validate(name);
                }}>
                -
            </button>
            <input
                className={className}
                name={name}
                value={`${value}`}
                onFocus={() => actions.focus(name)}
                onChange={e => {

                    const value = e.target.value;

                    if (value && !/^[+-]?\d*(\.|(\.\d+)?)$/.test(value)) {
                        e.preventDefault();
                        return;
                    }

                    actions.change(name, value);

                }}
                onBlur={() => {

                    const formattedValue = parseFloat(value, 10) + '';

                    if (value !== formattedValue) {
                        actions.change(name, formattedValue);
                    }

                    actions.blur(name);

                }} />
            <button
                type="button"
                onClick={() => {
                    actions.change(name, +value + 1);
                    actions.validate(name);
                }}>
                +
            </button>
            <label>{message}</label>
        </div>
    );

}

IntegerControl.propTypes = {
    value: PropTypes.string
};
