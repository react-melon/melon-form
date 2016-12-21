(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react-addons-update', '../util/dataPathMap', '../util/dataPath', '../constants'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react-addons-update'), require('../util/dataPathMap'), require('../util/dataPath'), require('../constants'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.reactAddonsUpdate, global.dataPathMap, global.dataPath, global.constants);
        global.field = mod.exports;
    }
})(this, function (exports, _reactAddonsUpdate, _dataPathMap, _dataPath, _constants) {
    'use strict';

    exports.__esModule = true;
    exports.focus = focus;
    exports.blur = blur;
    exports.touch = touch;
    exports.change = change;
    exports.updateValidity = updateValidity;
    exports.register = register;
    exports.unregister = unregister;
    exports.setValidateStart = setValidateStart;
    exports.setValidateSucceed = setValidateSucceed;
    exports.setValidateFailed = setValidateFailed;
    exports.startPending = startPending;
    exports.stopPending = stopPending;

    var _reactAddonsUpdate2 = _interopRequireDefault(_reactAddonsUpdate);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
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

    function focus(state, action) {
        var _meta;

        var name = action.payload.name;

        return (0, _reactAddonsUpdate2['default'])(state, {
            meta: (_meta = {}, _meta[name] = {
                focus: { $set: true }
            }, _meta)
        });
    }

    function blur(state, action) {
        var _meta2;

        var name = action.payload.name;

        return (0, _reactAddonsUpdate2['default'])(state, {
            meta: (_meta2 = {}, _meta2[name] = {
                focus: { $set: false }
            }, _meta2)
        });
    }

    function touch(state, action) {

        var name = action.payload.name;

        return (0, _reactAddonsUpdate2['default'])(state, {
            meta: {
                $apply: function $apply(meta) {
                    return (0, _dataPathMap.setInWithPath)(meta, name, function (data) {
                        return _extends({}, data, {
                            touched: true
                        });
                    });
                }
            }
        });
    }

    function change(state, action) {
        var _action$payload = action.payload,
            name = _action$payload.name,
            value = _action$payload.value;


        if ((0, _dataPath.getIn)(state.value) === value) {
            return state;
        }

        var nextValue = (0, _dataPath.setIn)(state.value, name, value);

        return (0, _reactAddonsUpdate2['default'])(state, {
            meta: {
                $apply: function $apply(meta) {
                    return (0, _dataPathMap.setInWithPath)(meta, name, function (data) {
                        return _extends({}, data, {
                            touched: true
                        });
                    });
                }
            },
            value: {
                $set: nextValue
            }
        });
    }

    function updateValidity(state, action) {

        var validity = action.payload.validity;

        return (0, _reactAddonsUpdate2['default'])(state, {
            meta: {
                $apply: function $apply(meta) {
                    return Object.keys(meta).reduce(function (nextMeta, key) {

                        nextMeta[key] = _extends({}, meta[key], {
                            error: validity && validity[key] || ''
                        });

                        return nextMeta;
                    }, {});
                }
            }
        });
    }

    function register(state, action) {
        var _meta3;

        return (0, _reactAddonsUpdate2['default'])(state, {
            meta: (_meta3 = {}, _meta3[action.payload.name] = {
                $set: _constants.DEFAULT_META
            }, _meta3)
        });
    }

    function unregister(state, action) {
        return (0, _reactAddonsUpdate2['default'])(state, {
            meta: {
                $apply: function $apply(meta) {
                    return (0, _dataPath.deleteIn)(meta, action.payload.name);
                }
            }
        });
    }

    function setValidateStart(state, action) {

        var name = action.payload.name;

        return (0, _reactAddonsUpdate2['default'])(state, {

            meta: {
                $apply: function $apply(meta) {

                    return Object.keys(meta).reduce(function (nextMeta, key) {

                        nextMeta[key] = _extends({}, meta[key], {

                            // 不指定 name 或者等于指定 name
                            validating: !name || key === name,

                            // 如果是 form validate 即无 name，那么同步校验已通过，error 设置为 null
                            // 如果是 field validate 即有 name，指定 name 的要保留，否则清空
                            error: name === key ? null : meta[key].error
                        });

                        return nextMeta;
                    }, {});
                }
            }

        });
    }

    function setValidateSucceed(state, action) {
        var _meta4;

        var name = action.payload.name;

        return name ? (0, _reactAddonsUpdate2['default'])(state, {
            meta: (_meta4 = {}, _meta4[name] = {
                $apply: function $apply(meta) {
                    return _extends({}, meta, {
                        validating: false,
                        error: null
                    });
                }
            }, _meta4)
        }) : (0, _reactAddonsUpdate2['default'])(state, {
            meta: {
                $apply: function $apply(meta) {

                    return Object.keys(meta).reduce(function (nextMeta, key) {

                        nextMeta[key] = _extends({}, meta[key], {
                            validating: false,
                            error: null
                        });

                        return nextMeta;
                    }, {});
                }
            }
        });
    }

    function setValidateFailed(state, action) {
        var _meta5;

        var _action$payload2 = action.payload,
            name = _action$payload2.name,
            error = _action$payload2.error;


        return name ? (0, _reactAddonsUpdate2['default'])(state, {
            meta: (_meta5 = {}, _meta5[name] = {
                $apply: function $apply(meta) {
                    return _extends({}, meta, {
                        validating: false,
                        error: error
                    });
                }
            }, _meta5)
        }) : (0, _reactAddonsUpdate2['default'])(state, {
            meta: {
                $apply: function $apply(meta) {

                    return Object.keys(meta).reduce(function (nextMeta, key) {

                        nextMeta[key] = _extends({}, meta[key], {
                            validating: false,
                            error: error
                        });

                        return nextMeta;
                    }, {});
                }
            }
        });
    }

    function startPending(state, action) {
        var _meta6;

        return (0, _reactAddonsUpdate2['default'])(state, {
            meta: (_meta6 = {}, _meta6[action.payload.name] = {
                $merge: { pending: true }
            }, _meta6)
        });
    }

    function stopPending(state, action) {
        var _meta7;

        return (0, _reactAddonsUpdate2['default'])(state, {
            meta: (_meta7 = {}, _meta7[action.payload.name] = {
                $merge: { pending: false }
            }, _meta7)
        });
    }
});
//# sourceMappingURL=field.js.map
