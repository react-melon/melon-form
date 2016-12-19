/**
 * @file validity
 * @author leon <ludafa@outlook.com>
 */

export function isValid(validity) {

    if (validity == null) {
        return true;
    }

    return Object
        .keys(validity)
        .every(name => {
            let errors = validity[name];
            return Array.isArray(errors) ? isValid(errors) : !errors;
        });

}

export function resolveAsyncTasks(validity) {

    // 不是 object 或者已是 promise 的不处理
    if (validity == null || typeof validity !== 'object') {
        return [];
    }

    if (validity instanceof Promise) {
        return [{name: '', task: validity}];
    }

    // 在 object 中找出 promise，作成一个 [{name, promise}] 的结构
    return Object
        .keys(validity)
        .reduce((tasks, name) => {

            let task = validity[name];

            if (task instanceof Promise) {
                tasks.push({name, task});
            }

            return tasks;

        }, []);

}
