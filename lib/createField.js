(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'react-redux', './selectors', 'shallow-equal/objects', './util/createOnChange'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('react-redux'), require('./selectors'), require('shallow-equal/objects'), require('./util/createOnChange'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.reactRedux, global.selectors, global.objects, global.createOnChange);
        global.createField = mod.exports;
    }
})(this, function (exports, _react, _reactRedux, _selectors, _objects, _createOnChange) {
    'use strict';

    exports.__esModule = true;
    exports.default = createField;

    var _react2 = _interopRequireDefault(_react);

    var _objects2 = _interopRequireDefault(_objects);

    var _createOnChange2 = _interopRequireDefault(_createOnChange);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

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

    function _objectWithoutProperties(obj, keys) {
        var target = {};

        for (var i in obj) {
            if (keys.indexOf(i) >= 0) continue;
            if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
            target[i] = obj[i];
        }

        return target;
    }

    /**
     * DefaultField
     *
     * @class
     * @param {*} props 属性
     */
    function DefaultField(props) {
        var Control = props.control,
            rest = _objectWithoutProperties(props, ['control']);

        return _react2['default'].createElement(Control, rest);
    }

    DefaultField.propTypes = {
        value: _react.PropTypes.any,
        meta: _react.PropTypes.shape({
            touched: _react.PropTypes.bool.isRequired
        }),
        validity: _react.PropTypes.arrayOf(_react.PropTypes.shape({
            valid: _react.PropTypes.bool.isRequired,
            message: _react.PropTypes.string
        })),
        name: _react.PropTypes.string.isRequired,
        actions: _react.PropTypes.object.isRequired
    };

    function createField() {
        var Field = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DefaultField;


        function mapStateToProps(state, props) {
            var model = props.model,
                name = props.name,
                format = props.format;


            var data = (0, _selectors.getFieldData)(state, model, name);

            var formattedValue = format(data.value, props);

            return formattedValue === data.value ? data : _extends({}, data, { value: formattedValue });
        }

        function mapDispatchToProps(dispatch, props) {
            var parse = props.parse,
                normalize = props.normalize,
                actions = props.actions;


            var change = (0, _createOnChange2['default'])(actions.change, { parse: parse, normalize: normalize });

            return {
                actions: _extends({}, actions, {
                    change: change,
                    dispatch: dispatch
                })
            };
        }

        var ConnectedField = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Field);

        /**
         * FormField
         *
         * @class
         * @param {*} props   属性
         * @param {Object} context 上下文
         */

        var FormField = function (_Component) {
            _inherits(FormField, _Component);

            function FormField() {
                _classCallCheck(this, FormField);

                return _possibleConstructorReturn(this, _Component.apply(this, arguments));
            }

            FormField.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
                return !(0, _objects2['default'])(nextProps, this.props);
            };

            FormField.prototype.componentWillMount = function componentWillMount() {
                this.context.actions.register(this.props.name);
            };

            FormField.prototype.componentWillUnmount = function componentWillUnmount() {
                this.context.actions.unregister(this.props.name);
            };

            FormField.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
                if (this.props.name !== nextProps.name) {
                    var actions = this.context.actions;
                    actions.unregister(name);
                    actions.register(name);
                }
            };

            FormField.prototype.render = function render() {
                var _context = this.context,
                    model = _context.model,
                    actions = _context.actions;


                return _react2['default'].createElement(ConnectedField, _extends({}, this.props, {
                    actions: actions,
                    model: model }));
            };

            return FormField;
        }(_react.Component);

        FormField.contextTypes = {
            actions: _react.PropTypes.object.isRequired,
            model: _react.PropTypes.string.isRequired
        };

        FormField.propTypes = {
            name: _react.PropTypes.string.isRequired,
            control: _react.PropTypes.func.isRequired,
            format: _react.PropTypes.func,
            parse: _react.PropTypes.func,
            normalize: _react.PropTypes.func
        };

        FormField.defaultProps = {
            format: function format(value) {
                return value == null ? '' : value;
            }
        };

        FormField.displayName = 'FormField(' + (Field.displayName || Field.name) + ')';

        return FormField;
    }
});
//# sourceMappingURL=createField.js.map
