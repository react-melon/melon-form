/**
 * @file Input
 * @author leon <ludafa@outlook.com>
 */

import React, {Component, PropTypes} from 'react';

const hasOwn = Object.prototype.hasOwnProperty;

export default class Input extends Component {

    constructor(props, context, updater) {

        super(props, context, updater);

        let controlled = this.controlled = hasOwn.call(props, 'value');

        if (controlled) {
            this.state = {
                value: props.value
            };
        }

        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.state.value) {
            this.setState({value: nextProps.value});
        }
    }

    onChange(e) {

        if (this.controlled) {
            this.setState({value: e.target.value});
        }

    }

    onBlur(e) {

        const {
            onChange,
            onBlur
        } = this.props;

        if (onChange) {
            onChange({target: e.target});
        }

        if (onBlur) {
            onBlur(e);
        }

    }

    render() {

        let props = {
            ...this.props,
            onChange: this.onChange,
            onBlur: this.onBlur
        };

        if (this.controlled) {
            props.value = this.state.value;
        }

        return (
            <input {...props} />
        );

    }

}

/* eslint-disable max-len */
Input.propTypes = {
    defaultValue(props, propName, componentName) {
        if (hasOwn.call(props, propName) && hasOwn.call(props, 'value')) {
            return new Error('A component contains an input of type undefined with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://fb.me/react-controlled-components');
        }
    },
    value(props) {
        if (
            hasOwn.call(props, 'value')
            && !hasOwn.call(props, 'onChange')
            && !props.readOnly && !props.disabled
        ) {
            return new Error('You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly` or `disabled`');
        }
    }
};
