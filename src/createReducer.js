/**
 * @file reducer
 * @author leon <ludafa@outlook.com>
 */

import * as actionTypes from './actionTypes';
import * as reducers from './reducers/index';

const MAP = {
    [actionTypes.FOCUS]: reducers.focus,
    [actionTypes.CHANGE]: reducers.change,
    [actionTypes.TOUCH]: reducers.touch,
    [actionTypes.TOUCH_ALL]: reducers.touchAll,
    [actionTypes.BLUR]: reducers.blur,
    [actionTypes.ARRAY_SWAP]: reducers.arraySwap,
    [actionTypes.ARRAY_PUSH]: reducers.arrayPush,
    [actionTypes.ARRAY_POP]: reducers.arrayPop,
    [actionTypes.ARRAY_SHIFT]: reducers.arrayShift,
    [actionTypes.ARRAY_UNSHIFT]: reducers.arrayUnshift,
    [actionTypes.ARRAY_SPLICE]: reducers.arraySplice,
    [actionTypes.INITIALIZE]: reducers.initialize,
    [actionTypes.RESET]: reducers.reset,
    [actionTypes.VALIDITY_UPDATE]: reducers.updateValidity,
    [actionTypes.ASYNC_VALIDATE_START]: reducers.setValidateStart,
    [actionTypes.ASYNC_VALIDATE_SUCCEED]: reducers.setValidateSucceed,
    [actionTypes.ASYNC_VALIDATE_FAILED]: reducers.setValidateFailed,
    [actionTypes.REGISTER]: reducers.register,
    [actionTypes.UNREGISTER]: reducers.unregister,
    [actionTypes.PENDING_START]: reducers.startPending,
    [actionTypes.PENDING_STOP]: reducers.stopPending
};

export default function createReducer(model, initialValue = {}, customReducers = {}) {

    return (state = {value: initialValue, meta: {}}, action) => {

        let {type, payload} = action;

        let embedReducer = MAP[type];
        let customReducer = customReducers[type];

        // 跳过
        if (
            // 不是当前绑定域
            payload && payload.model !== model
            // 或者无 reducer 绑定
            || (!embedReducer && !customReducer)
        ) {
            return state;
        }

        return customReducer
            // 优先使用自定义 reducer
            ? customReducer(state, action, embedReducer)
            : embedReducer(state, action);

    };
}
