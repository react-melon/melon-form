/**
 * @file Form
 * @author leon <ludafa@outlook.com>
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import createActionCreators from './createActionCreators';
import {Provider, connect} from 'react-redux';
import {getModel} from './selectors';
import shallowEqual from 'shallow-equal/objects';

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

    componentWillMount() {
        // 生成 initial value
        this.actions.actions.initialize();
    }

    componentWillReceiveProps(nextProps) {

        if (shallowEqual(this.props, nextProps)) {
            return;
        }

        // 只要属性发生变化，就需要重新生成 actions
        this.actions = this.mapDispatchToProps(
            this.context.store.dispatch,
            nextProps
        );

        const {model, control} = this.props;

        // 在切换 model 时，要做 initialize
        if (model !== nextProps.model) {
            this.actions.actions.initialize();
        }

        // 切换 control 时要重新 connect 生成组件
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
