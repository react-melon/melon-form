(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'redux', './createActionCreators', 'react-redux', './selectors'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('redux'), require('./createActionCreators'), require('react-redux'), require('./selectors'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.redux, global.createActionCreators, global.reactRedux, global.selectors);
        global.Form = mod.exports;
    }
})(this, function (exports, _react, _redux, _createActionCreators, _reactRedux, _selectors) {
    'use strict';

    exports.__esModule = true;

    var _react2 = _interopRequireDefault(_react);

    var _createActionCreators2 = _interopRequireDefault(_createActionCreators);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _objectWithoutProperties(obj, keys) {
        var target = {};

        for (var i in obj) {
            if (keys.indexOf(i) >= 0) continue;
            if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
            target[i] = obj[i];
        }

        return target;
    }

    var _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }

        return target;
    };

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var Form = function (_Component) {
        _inherits(Form, _Component);

        function Form(props, context) {
            _classCallCheck(this, Form);

            var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

            _this.mapStateToProps = _this.mapStateToProps.bind(_this);
            _this.mapDispatchToProps = _this.mapDispatchToProps.bind(_this);

            _this.control = _this.getControl(props.control);
            _this.actions = _this.mapDispatchToProps(context.store.dispatch, props);

            return _this;
        }

        Form.prototype.getChildContext = function getChildContext() {
            return {
                actions: this.actions.actions,
                model: this.props.model
            };
        };

        Form.prototype.componentWillMount = function componentWillMount() {
            // 生成 initial value
            this.actions.actions.initialize();
        };

        Form.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {

            if (this.props === nextProps) {
                return;
            }

            var _props = this.props,
                model = _props.model,
                control = _props.control;


            if (model !== nextProps.model) {

                this.actions = this.mapDispatchToProps(this.context.store.dispatch, nextProps);

                // 在切换 model 时，要做 initialize
                this.actions.actions.initialize();
            }

            if (control !== nextProps.control) {
                this.control = this.getControl(nextProps.control);
            }
        };

        Form.prototype.mapStateToProps = function mapStateToProps(state, props) {
            return (0, _selectors.getModel)(state, props.model);
        };

        Form.prototype.mapDispatchToProps = function mapDispatchToProps(dispatch, props) {

            if (this.actions && this.props === props) {
                return this.actions;
            }

            var actions = (0, _createActionCreators2['default'])(props);

            if (typeof props.getActions === 'function') {

                actions = _extends({}, actions, props.getActions(actions));
            }

            return {
                actions: _extends({
                    dispatch: dispatch
                }, (0, _redux.bindActionCreators)(actions, dispatch))
            };
        };

        Form.prototype.getControl = function getControl(control) {
            return (0, _reactRedux.connect)(this.mapStateToProps, this.mapDispatchToProps)(control);
        };

        Form.prototype.render = function render() {
            var _props2 = this.props,
                model = _props2.model,
                rest = _objectWithoutProperties(_props2, ['model']);

            return _react2['default'].createElement(this.control, _extends({}, rest, {
                model: model
            }));
        };

        return Form;
    }(_react.Component);

    exports['default'] = Form;


    Form.childContextTypes = {
        actions: _react.PropTypes.object.isRequired,
        model: _react.PropTypes.string.isRequired
    };

    Form.contextTypes = {
        store: _reactRedux.Provider.propTypes.store
    };

    Form.propTypes = {
        model: _react.PropTypes.string.isRequired,
        control: _react.PropTypes.func.isRequired,
        validate: _react.PropTypes.func,
        getActions: _react.PropTypes.func
    };
});
//# sourceMappingURL=Form.js.map
