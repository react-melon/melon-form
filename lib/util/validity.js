(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.validity = mod.exports;
    }
})(this, function (exports) {
    'use strict';

    exports.__esModule = true;
    exports.isValid = isValid;
    exports.resolveAsyncTasks = resolveAsyncTasks;

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
    } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };

    /**
     * @file validity
     * @author leon <ludafa@outlook.com>
     */

    function isValid(validity) {

        if (validity == null) {
            return true;
        }

        return Object.keys(validity).every(function (name) {
            var errors = validity[name];
            return Array.isArray(errors) ? isValid(errors) : !errors;
        });
    }

    function resolveAsyncTasks(validity) {

        // 不是 object 或者已是 promise 的不处理
        if (validity == null || (typeof validity === 'undefined' ? 'undefined' : _typeof(validity)) !== 'object') {
            return [];
        }

        if (validity instanceof Promise) {
            return [{ name: '', task: validity }];
        }

        // 在 object 中找出 promise，作成一个 [{name, promise}] 的结构
        return Object.keys(validity).reduce(function (tasks, name) {

            var task = validity[name];

            if (task instanceof Promise) {
                tasks.push({ name: name, task: task });
            }

            return tasks;
        }, []);
    }
});
//# sourceMappingURL=validity.js.map
