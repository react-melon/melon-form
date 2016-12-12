# 基础

## Store

1. 所有的数据状态都存放到 store 中统一管理；
2. store 有且只有一个数据修改器 reducer，所有的数据变更都通过 reducer 来产生；
3. store 可以提供 immutable 数据；
4. store 可以 dispatch(action)；而 dispatch(action) 将触发 reducer 的处理；
5. store 中主要包含以下几类数据：

    1. 表单输入数据 value，举例：

        ```json
        {
            "name": "test",
            "age": 18,
            "books": [{
                "name": "a book",
                "author": {
                    "name": "author a",
                    "email": "a@book.com"
                }
            }, {
                "name": "another book",
                "author": {
                    "name": "author b",
                    "email": "b@book.com"
                }
            }],
            "address": [
                "street",
                "district",
                "city",
                "zipcode"
            ]
        }
        ```

    2. 表单校验数据 validity

        ```json
        {
            "name": [{
                "message": "required"
            }],
            "age": [{
                "message": "must be a integer"
            }],
            "books[1].author.email": [{
                "message": "must be a email format"
            }],
            "address[3]": [{
                "message": "zip code must be a 6 digits"
            }]
        }
        ```

        或者

        ```json
        {
            "name":"required",
            "age": "must be a integer",
            "books[1].author.email": "must be a email format",
            "address[3]": "zip code must be a 6 digits"
        }
        ```

    3. 表单编辑状态数据 meta

        ```json
        {
            "name": {
                "touched": false,
                "visited": true,
                "focus": false,
                "dirty": false
            },
            "age": {
                "touched": false,
                "visited": true,
                "focus": false,
                "dirty": false
            },
            "books[0].author.name": {
                "touched": false,
                "visited": true,
                "focus": false,
                "dirty": false
            },
            "books[0].author.email": {
                "touched": false,
                "visited": true,
                "focus": false,
                "dirty": false
            },
            "books[1].author.name": {
                "touched": false,
                "visited": true,
                "focus": false,
                "dirty": false
            },
            "books[1].author.email": {
                "touched": false,
                "visited": true,
                "focus": false,
                "dirty": false
            },
            "address[0]": {
                "touched": false,
                "visited": true,
                "focus": false,
                "dirty": false
            },
            "address[1]": {
                "touched": false,
                "visited": true,
                "focus": false,
                "dirty": false
            },
            "address[2]": {
                "touched": false,
                "visited": true,
                "focus": false,
                "dirty": false
            },
            "address[3]": {
                "touched": false,
                "visited": true,
                "focus": false,
                "dirty": false
            }
        }
        ```

2. action & action creator

    1. 每个 action 是一个 immutable 的 Plain Object；
    2. 每个 action 都有与之对应的工厂 action creator;
    3. 我们提供一套标准的 action 和 action creator；

2. reducer

    1. reducer 是数据状态改变的唯一来源
    2. reducer 必须通过 dispatch(action) 来触发；
    3. reducer 是一个纯函数；
    4. 我们提供一套标准的 reducer，与标准的 action 相对应；

3. Field

    表单字段

    1. 每个 Field 都必须有的属性 name; Field 的属性 name 是 string 类型，并且是满足 dataPath 格式的；
    2. Field 都包含有属性 value；根据 value 的类型，可以将 Field 划分为基础类型和集合类型：
        1. 基础类型 Field 的 value 类型是 string, number 或者 boolean；
        2. 集合类型 Field 的 value 类型是 object 或者 array；集合类型 Field 可以嵌套输出 Field；
    3. Field 是直接连接到 store 的；
    4. Field 的值是使用 name 从 store 里取得的；
    5. Field 可以调用 store 的 dispatch；
    6. Field 可以调用标准的 action creator；
    7. Field 本身不负责展现可视的控件；Field 只负责从 store 中取数据以及触发 dispatch；Field 可以输出若干个 Control 来作为可视、可交互的控件；Field 可以自行选择 Control 的类型；

4. Control

    表单控件

    1. Control 只负责展现与交互；不负责数据的获取与处理；
    2. Control 应当尽可能少的持有内部状态；最好是 stateless component；

4. Controlled Form 与 Uncontrolled Form

    1. 两者的运行机制都是一致的；
    2. 区别在于 Uncontrolled Form 的运行过程是打包好的，不能被使用者控制（干扰、调整）；
    3. 而 Controlled Form 可以在以下几个环境对 Form 逻辑进行调整：

        1. Field 的 dispatch 过程；触发其他 action 或者触发多个 action，甚至不触发 action；
        2. 添加新 action 和 action creator；
        3. 添加、删除或调整 reducer；

5. 与 Redux / ei 结合使用

    在单独使用 Form 时，Form 会自行创建一个 ReduxStore 并绑定默认的内置 reducer；

    因此，在与外部 Redux 结合使用时，只需要将预置的 reducer 加入外部 ReduxStore 的 reducer 中，并将 Form 连接到外部 ReduxStore 上即可；

    我们提供了将 Form 快速连接到 Redux 的小工具；
