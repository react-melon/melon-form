/**
 * @file create field
 * @author leon <ludafa@outlook.com>
 */

import React, {Component, PropTypes} from 'react';
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

export default function createField(options = {}) {

    const {
        model,
        connect
    } = options;

    return (Field = DefaultField) => {

        function mapStateToProps(state, props) {

            const data = getFieldData(state[model], props.name);

            const formattedValue = props.format(data.value);

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

        let ConnectedField = connect(
            mapStateToProps,
            mapDispatchToProps
        )(Field);

        /**
         * FormField
         *
         * @class
         * @param {*} props   属性
         * @param {Object} context 上下文
         */
        class FormField extends Component {

            shouldComponentUpdate(nextProps) {
                const should = !shallowEqual(nextProps, this.props);
                if (should) {
                    console.log('will update: %o %o', this.props, nextProps);
                }
                return should;
            }

            componentWillMount() {
                this.context.actions.register(this.props.name);
            }

            componentWillUnmount() {
                this.context.actions.unregister(this.props.name);
            }

            componentWillReceiveProps(nextProps) {
                if (this.props.name !== nextProps.name) {
                    const actions = this.context.actions;
                    actions.unregister(name);
                    actions.register(name);
                }
            }

            render() {
                return (
                    <ConnectedField
                        {...this.props}
                        actions={this.context.actions} />
                );
            }

        }

        FormField.contextTypes = {
            actions: PropTypes.object.isRequired
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

    };

}
