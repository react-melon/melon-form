/**
 * @file data path map
 * @author leon <ludafa@outlook.com>
 */

import {walk, compilePath} from './dataPath';
import startsWith from 'lodash/startsWith';
import toPath from 'lodash/toPath';
import mapValues from 'lodash/mapValues';
import {DEFAULT_META} from '../constants';

/**
 * 生成 meta 对象
 *
 * @param  {Object|Array} target         目标对象
 * @param  {string}       [prefix='']    生成的 meta 对象的 key 值前缀
 * @param  {number}       [startIndex=0] 若 target 是一个数组，那么还可以额外指定 key 值的起始下标；
 *                                       但只对第一层级起效
 * @return {Object}
 */
export function make(target, prefix = '', startIndex = 0) {

    const map = {};

    let isRootArray = Array.isArray(target);

    walk(target, (dataPath, value, isArray, tokens) => {

        if (isRootArray) {

            // 只对第一层进行处理
            if (startIndex) {

                let firstToken = tokens[0];
                let numbericFirstToken = parseInt(firstToken, 10);

                if (!isNaN(numbericFirstToken)) {
                    dataPath = compilePath([
                        numbericFirstToken + startIndex,
                        ...tokens.slice(1)
                    ]);
                }

            }

        }

        if (prefix) {
            dataPath = `${prefix}${isRootArray ? '' : '.'}${dataPath}`;
        }

        map[dataPath] = value;

    });

    return map;

}

export function remove(map, prefix) {

    return Object
        .keys(map)
        .reduce((nextMap, key) => {

            if (!startsWith(key, prefix)) {
                nextMap[key] = map[key];
            }

            return nextMap;

        }, {});

}

export function move(map, from, to) {

    return Object
        .keys(map)
        .reduce((nextMap, key) => {

            if (startsWith(key, from)) {
                nextMap[key.replace(from, to)] = map[key];
            }
            else {
                nextMap[key] = map[key];
            }

            return nextMap;

        }, {});

}

export function splice(
    map, pointer,
    arr, start, deleteCount, replacements
) {

    const replaceCount = replacements.length;

    // 删除
    for (let i = 0; i < deleteCount; i++) {
        map = remove(map, `${pointer}[${start + i}]`);
    }

    // 移动
    if (deleteCount < replaceCount) {
        for (let i = arr.length - start - deleteCount - 1; i >= 0; i--) {
            let from = start + deleteCount + i;
            let to = start + replacements.length + i;
            map = move(map, `${pointer}[${from}]`, `${pointer}[${to}]`);
        }
    }
    else if (deleteCount > replaceCount) {
        for (
            let i = 0, len = arr.length - start - deleteCount;
            i < len;
            i++
        ) {
            let from = start + deleteCount + i;
            let to = start + replacements.length + i;
            map = move(map, `${pointer}[${from}]`, `${pointer}[${to}]`);
        }
    }


    // 添加
    map = {
        ...map,
        ...mapValues(
            make(replacements, pointer, start),
            () => DEFAULT_META
        )
    };

    return map;

}

export function swap(map, dataPath, from, to) {

    return Object
        .keys(map)
        .reduce((nextMap, key) => {

            let fromKey = `${dataPath}[${from}]`;
            let toKey = `${dataPath}[${to}]`;

            if (startsWith(key, fromKey)) {
                nextMap[key] = map[key.replace(fromKey, toKey)];
            }
            else if (startsWith(key, toKey)) {
                nextMap[key] = map[key.replace(toKey, fromKey)];
            }
            else {
                nextMap[key] = map[key];
            }

            return nextMap;

        }, {});

}

export function setInWithPath(map, dataPath, callback) {

    const path = toPath(dataPath);
    const toModifyKeyMap = path
        .reduce((nextMap, item, index, path) => {

            const currentPath = path.slice(0, index + 1);
            const currentDataPath = compilePath(currentPath);

            nextMap[currentDataPath] = typeof callback === 'function'
                ? callback(map[currentDataPath], currentDataPath)
                : callback;

            return nextMap;

        }, {});

    return Object
        .keys(map)
        .reduce((nextMap, key) => {
            nextMap[key] = key in toModifyKeyMap ? toModifyKeyMap[key] : map[key];
            return nextMap;
        }, {});

}
