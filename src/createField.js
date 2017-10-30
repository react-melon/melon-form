/**
 * @file create field
 * @author leon <ludafa@outlook.com>
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getFieldData} from './selectors';
import shallowEqual from 'shallow-equal/objects';
import createOnChange from './util/createOnChange';

/**
 * DefaultField
 *
 * @class
 * @param {*} props 属性
 */
function DefaultField(props) {

    let {
        control: Control,
        ...rest
    } = props;

    return (
        <Control {...rest} />
    );

}

DefaultField.propTypes = {
    value: PropTypes.any,
    meta: PropTypes.shape({
        touched: PropTypes.bool.isRequired
    }),
    validity: PropTypes.arrayOf(PropTypes.shape({
        valid: PropTypes.bool.isRequired,
        message: PropTypes.string
    })),
    name: PropTypes.string.isRequired,
    actions: PropTypes.object.isRequired
};

export default function createField(Field = DefaultField) {

    function mapStateToProps(state, props) {

        const {model, name, format} = props;

        const data = getFieldData(state, model, name);

        const formattedValue = format(data.value, props);

        return formattedValue === data.value
            ? data
            : {...data, value: formattedValue};
    }

    function mapDispatchToProps(dispatch, props) {

        const {
            parse,
            normalize,
            actions
        } = props;

        const change = createOnChange(actions.change, {parse, normalize});

        return {
            actions: {
                ...actions,
                change,
                dispatch
            }
        };
    }

    const ConnectedField = connect(mapStateToProps, mapDispatchToProps)(Field);

    /**
     * FormField
     *
     * @class
     * @param {*} props   属性
     * @param {Object} context 上下文
     */
    class FormField extends Component {

        shouldComponentUpdate(nextProps, nextState, nextContext) {
            return !shallowEqual(nextProps, this.props)
                || !shallowEqual(this.context, nextContext);
        }

        componentWillMount() {
            this.context.actions.register(this.props.name);
        }

        componentWillReceiveProps(nextProps, nextContext) {

            if (
                this.props.name === nextProps.name
                && nextContext.model === this.context.model
            ) {
                return;
            }

            const name = nextProps.name;
            const {unregister, register} = nextContext.actions;

            unregister(name);
            register(name);

        }

        componentWillUnmount() {
            this.context.actions.unregister(this.props.name);
        }

        render() {

            const {
                model,
                actions
            } = this.context;

            return (
                <ConnectedField
                    {...this.props}
                    actions={actions}
                    model={model} />
            );
        }

    }

    FormField.contextTypes = {
        actions: PropTypes.object.isRequired,
        model: PropTypes.string.isRequired
    };

    FormField.propTypes = {
        name: PropTypes.string.isRequired,
        control: PropTypes.func.isRequired,
        format: PropTypes.func,
        parse: PropTypes.func,
        normalize: PropTypes.func
    };

    FormField.defaultProps = {
        format(value) {
            return value == null ? '' : value;
        }
    };

    FormField.displayName = `FormField(${Field.displayName || Field.name})`;

    return FormField;

}
