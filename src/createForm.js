/**
 * @file create form
 * @author leon <ludafa@outlook.com>
 */

import React, {Component, PropTypes} from 'react';
import createActionCreators from './createActionCreators';
import {bindActionCreators} from './util/bindActionCreators';

export default function (options) {

    let {
        connect,
        model,
        getActions = createActionCreators
    } = options;

    return Form => {

        class MelonForm extends Component {

            constructor(...args) {
                super(...args);
                this.attach = this.attach.bind(this);
                this.detach = this.detach.bind(this);
                this.fields = [];
            }

            componentDidMount() {
                this.props.actions.validate();
            }

            getChildContext() {
                return {
                    attach: this.attach,
                    detach: this.detach,
                    actions: this.props.actions
                };
            }

            attach(field) {
                this.fields.push(field);
            }

            detach(field) {
                this.fields = this.fields.filter(f => f === field);
            }

            render() {
                return (
                    <Form {...this.props} />
                );
            }

        }

        MelonForm.propTypes = {
            value: PropTypes.any,
            meta: PropTypes.object.isRequired,
            validity: PropTypes.arrayOf(PropTypes.shape({
                valid: PropTypes.bool.isRequired,
                message: PropTypes.string
            })),
            actions: PropTypes.object.isRequired
        };

        MelonForm.childContextTypes = {
            attach: PropTypes.func.isRequired,
            detach: PropTypes.func.isRequired,
            actions: PropTypes.object.isRequired
        };

        function mapStateToProps(state, props) {
            return state[model];
        }

        function mapDispatchToProps(dispatch, props) {
            return {
                actions: bindActionCreators(
                    dispatch,
                    getActions(props)
                )
            };
        }

        return connect(mapStateToProps, mapDispatchToProps)(MelonForm);

    };

}
