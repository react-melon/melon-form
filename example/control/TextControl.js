/**
 * @file text control
 * @author leon <ludafa@outlook.com>
 */

import React, {Component, PropTypes} from 'react';
import cx from 'classnames';

/**
 * TextControl
 *
 * @class
 * @param {*} props props
 */
export default class TextControl extends Component {

    render() {

        const {
            type,
            name,
            value,
            actions,
            meta
        } = this.props;

        const {
            focus,
            touched,
            error
        } = meta;

        const message = !focus && touched && error ? error : '';

        const className = cx(
            {focusing: focus},
            touched ? {invalid: !message, valid: !!message} : null
        );

        return (
            <div>
                <input
                    type={type}
                    className={className}
                    name={name}
                    value={value}
                    onFocus={() => actions.focus(name)}
                    onChange={e => actions.change(name, e.target.value)}
                    onBlur={() => actions.blur(name)}
                />
                <label>{message}</label>
            </div>
        );

    }

}

TextControl.propTypes = {
    type: PropTypes.oneOf(['text', 'password']).isRequired
};

TextControl.defaultProps = {
    type: 'text'
};
