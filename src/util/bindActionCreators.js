/**
 * @file bind action creators to dispatch
 * @author leon <ludafa@outlook.com>
 */

export function bindActionCreators(dispatch, actionCreators = {}) {
    return Object
        .keys(actionCreators)
        .reduce((binding, name) => {
            binding[name] = bindActionCreator(dispatch, actionCreators[name]);
            return binding;
        }, {});
}

export function bindActionCreator(dispatch, actionCreator) {
    return (...args) => dispatch(actionCreator(...args));
}
