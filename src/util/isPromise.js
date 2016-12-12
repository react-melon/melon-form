/**
 * @file isPromise
 * @author leon <ludafa@outlook.com>
 */

export default function isPromise(obj) {
    return obj != null && typeof obj.then === 'function';
}
