/**
 * @file Form
 * @author leon <ludafa@outlook.com>
 */

import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import createActionCreators from './createActionCreators';
import {Provider, connect} from 'react-redux';

export default class Form extends Component {

    constructor(props, context) {
        super(props, context);
        this.actions = this.mapDispatchToProps(context.store.dispatch, props);
        this.mapStateToProps = this.mapStateToProps.bind(this);
        this.mapDispatchToProps = this.mapDispatchToProps.bind(this);
    }

    getChildContext() {
        return {
            actions: this.actions.actions,
            model: this.props.model
        };
    }

    componentWillReceiveProps(nextProps) {

        if (
            this.props !== nextProps
            && this.props.model !== nextProps.model
        ) {
            this.actions = this.mapDispatchToProps(
                this.conext.store.dispatch,
                nextProps
            );
        }

    }

    mapStateToProps(state, props) {
        return state[props.model];
    }

    mapDispatchToProps(dispatch, props) {

        if (this.actions && this.props === props) {
            return this.actions;
        }

        let actions = createActionCreators(props);

        if (typeof props.getActions === 'function') {

            actions = {
                ...actions,
                ...props.getActions(actions)
            };

        }

        return {
            actions: {
                dispatch,
                ...bindActionCreators(actions, dispatch)
            }
        };

    }

    getControl(control) {

        if (this.control && this.control.WrappedComponent === control) {
            return this.control;
        }

        this.control = connect(this.mapStateToProps, this.mapDispatchToProps)(control);

        return this.control;

    }

    render() {

        let {model, control, ...rest} = this.props;

        return React.createElement(
            this.getControl(control),
            {
                ...rest,
                model
            }
        );

    }

}

Form.childContextTypes = {
    actions: PropTypes.object.isRequired,
    model: PropTypes.string.isRequired
};

Form.contextTypes = {
    store: Provider.propTypes.store
};

Form.propTypes = {
    model: PropTypes.string.isRequired,
    control: PropTypes.func.isRequired,
    validate: PropTypes.func,
    getActions: PropTypes.func
};
