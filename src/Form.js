/**
 * @file Form
 * @author leon <ludafa@outlook.com>
 */

import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import createActionCreators from './createActionCreators';
import {Provider, connect} from 'react-redux';
import {getModel} from './selectors';

export default class Form extends Component {

    constructor(props, context) {

        super(props, context);

        this.mapStateToProps = this.mapStateToProps.bind(this);
        this.mapDispatchToProps = this.mapDispatchToProps.bind(this);

        this.control = this.getControl(props.control);
        this.actions = this.mapDispatchToProps(context.store.dispatch, props);

    }

    getChildContext() {
        return {
            actions: this.actions.actions,
            model: this.props.model
        };
    }

    componentWillReceiveProps(nextProps) {

        if (this.props === nextProps) {
            return;
        }

        const {model, control} = this.props;

        if (model !== nextProps.model) {
            this.actions = this.mapDispatchToProps(
                this.context.store.dispatch,
                nextProps
            );
        }

        if (control !== nextProps.control) {
            this.control = this.getControl(nextProps.control);
        }

    }

    mapStateToProps(state, props) {
        return getModel(state, props.model);
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
        return connect(this.mapStateToProps, this.mapDispatchToProps)(control);
    }

    render() {

        let {model, ...rest} = this.props;

        return React.createElement(
            this.control,
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
