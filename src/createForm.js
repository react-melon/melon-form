/**
 * @file create form
 * @author leon <ludafa@outlook.com>
 */

import React, {Component, PropTypes} from 'react';
import createActionCreators from './createActionCreators';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

export default function (options) {

    let {
        model,
        validate,
        getActions
    } = options;

    let getEmbedActions = createActionCreators({model, validate});

    return Form => {

        class MelonForm extends Component {

            getChildContext() {
                return {
                    actions: this.props.actions,
                    model
                };
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
            actions: PropTypes.object.isRequired
        };

        MelonForm.childContextTypes = {
            actions: PropTypes.object.isRequired,
            model: PropTypes.string.isRequired
        };

        function mapStateToProps(state, props) {
            return state[model];
        }

        function mapDispatchToProps(dispatch, props) {

            let embedActions = getEmbedActions(props);

            let customActions = typeof getActions === 'function'
                ? getActions(props, embedActions)
                : null;

            let actions = {
                ...embedActions,
                ...customActions
            };

            return {
                dispatch,
                actions: bindActionCreators(actions, dispatch)
            };
        }

        return connect(mapStateToProps, mapDispatchToProps)(MelonForm);

    };

}
