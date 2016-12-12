/**
 * @file action types
 * @author leon <ludafa@outlook.com>
 */

const PREFIX = 'melon_form';

export const INITIALIZE = `${PREFIX}/INITIALIZE`;
export const RESET = `${PREFIX}/RESET`;

export const FOCUS = `${PREFIX}/FOCUS`;
export const CHANGE = `${PREFIX}/CHANGE`;
export const TOUCH = `${PREFIX}/TOUCH`;
export const TOUCH_ALL = `${PREFIX}/TOUCH_ALL`;
export const BLUR = `${PREFIX}/BLUR`;

export const ARRAY_SWAP = `${PREFIX}/ARRAY_SWAP`;
export const ARRAY_PUSH = `${PREFIX}/ARRAY_PUSH`;
export const ARRAY_POP = `${PREFIX}/ARRAY_POP`;
export const ARRAY_SHIFT = `${PREFIX}/ARRAY_SHIFT`;
export const ARRAY_UNSHIFT = `${PREFIX}/ARRAY_UNSHIFT`;
export const ARRAY_SPLICE = `${PREFIX}/ARRAY_SPLICE`;

export const VALIDITY_UPDATE = `${PREFIX}/VALIDITY_UPDATE`;
export const ASYNC_VALIDATE_START = `${PREFIX}/ASYNC_VALIDITY_START`;
export const ASYNC_VALIDATE_SUCCEED = `${PREFIX}/ASYNC_VALIDITY_SUCCEED`;
export const ASYNC_VALIDATE_FAILED = `${PREFIX}/ASYNC_VALIDITY_FAILED`;

export const REGISTER = `${PREFIX}/REGISTER`;
export const UNREGISTER = `${PREFIX}/UNREGISTER`;
