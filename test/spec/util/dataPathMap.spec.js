/**
 * @file data path map spec
 * @author leon <ludafa@outlook.com>
 */

import {
    setInWithPath,
    splice,
    swap
} from '../../../src/util/dataPathMap';

describe('dataPathMap', () => {

    it('setInWithPath', () => {

        /* eslint-disable */
        let data = {
            "name": {
                "touched": false,
                "submitting": false,
                "focus": false,
                "dirty": false
            },
            "password": {
                "touched": false,
                "submitting": false,
                "focus": false,
                "dirty": false
            },
            "age": {
                "touched": false,
                "submitting": false,
                "focus": false,
                "dirty": false
            },
            "books": {
                "touched": false,
                "submitting": false,
                "focus": false,
                "dirty": false
            },
            "books[0]": {
                "touched": false,
                "submitting": false,
                "focus": false,
                "dirty": false
            },
            "books[0].author": {
                "touched": false,
                "submitting": false,
                "focus": false,
                "dirty": false
            },
            "books[0].email": {
                "touched": false,
                "submitting": false,
                "focus": false,
                "dirty": false
            },
            "books[1]": {
                "touched": false,
                "submitting": false,
                "focus": false,
                "dirty": false
            },
            "books[1].author": {
                "touched": false,
                "submitting": false,
                "focus": false,
                "dirty": false
            },
            "books[1].email": {
                "touched": false,
                "submitting": false,
                "focus": false,
                "dirty": false
            }
        };
        /* eslint-enable */

        let targetPath = 'books[1].author';

        const result = setInWithPath(data, targetPath, (data, path) => {

            if (path === 'books[1].author') {
                expect(data).toEqual({
                    touched: false,
                    submitting: false,
                    focus: false,
                    dirty: false
                });
            }

            return {
                ...data,
                touched: true
            };
        });

        const modifiedData = {
            touched: true,
            submitting: false,
            focus: false,
            dirty: false
        };

        expect(result[targetPath]).toEqual(modifiedData);
        expect(result['books[1]']).toEqual(modifiedData);
        expect(result.books).toEqual(modifiedData);
        expect(result.password).toEqual({
            touched: false,
            submitting: false,
            focus: false,
            dirty: false
        });

    });

    it('splice', () => {

        expect(typeof splice === 'function').toBe(true);

        let arr = [{}, {}, {}, {}];
        let map = {
            '.users[0].name': 'ludafa',
            '.users[0].books[1].name': 'ludafa\'s super cook book',
            '.users[1].name': 'metooq',
            '.users[2].name': 'tom',
            '.users[3].name': 'sam'
        };

        let map1 = splice(
            map, '.users',
            arr, 1, 1, []
        );

        expect(map1 !== map).toBe(true);
        expect(map['.users[1].name']).toBe('metooq');
        expect(typeof map1 === 'object').toBe(true);
        expect(map1['.users[0].name']).toBe('ludafa');
        expect(map1['.users[1].name']).toBe('tom');
        expect(map1['.users[2].name']).toBe('sam');

        let map2 = splice(
            map, '.users',
            arr, 0, 0, [{name: 'little flower'}]
        );

        expect(map2['.users[0].name']).toBe('little flower');
        expect(map2['.users[1].name']).toBe('ludafa');
        expect(map2['.users[2].name']).toBe('metooq');

        let map3 = splice(
            map, '.users',
            arr, arr.length, 0, [{name: 'little flower', age: 18}]
        );

        expect(map3['.users[0].name']).toBe('ludafa');
        expect(map3['.users[1].name']).toBe('metooq');
        expect(map3['.users[4].name']).toBe('little flower');

        let map4 = splice(
            map, '.users[0].books',
            [{}], 0, 0, [{name: 'test cook book', age: 18}]
        );

        expect(map4['.users[0].name']).toBe('ludafa');
        expect(map4['.users[0].books[0].name']).toBe('test cook book');
        expect(map4['.users[0].books[1].name']).toBe('ludafa\'s super cook book');

    });

    it('swap', () => {

        /* eslint-disable */
        let data = {
            "name": {
                "touched": false,
                "submitting": false,
                "focus": false,
                "dirty": false
            },
            "password": {
                "touched": false,
                "submitting": false,
                "focus": false,
                "dirty": false
            },
            "age": {
                "touched": false,
                "submitting": false,
                "focus": false,
                "dirty": false
            },
            "books": {
                "touched": false,
                "submitting": false,
                "focus": false,
                "dirty": false
            },
            "books[0]": {
                "touched": false,
                "submitting": false,
                "focus": false,
                "dirty": false
            },
            "books[0].author": {
                "touched": true,
                "submitting": false,
                "focus": false,
                "dirty": false
            },
            "books[0].email": {
                "touched": false,
                "submitting": false,
                "focus": false,
                "dirty": false
            },
            "books[1]": {
                "touched": false,
                "submitting": false,
                "focus": false,
                "dirty": false
            },
            "books[1].author": {
                "touched": false,
                "submitting": false,
                "focus": false,
                "dirty": false
            },
            "books[1].email": {
                "touched": false,
                "submitting": false,
                "focus": false,
                "dirty": false
            }
        };
        /* eslint-enable */

        const result = swap(data, 'books', 0, 1);

        expect(result['books[0].author'].touched).toBe(false);
        expect(result['books[1].author'].touched).toBe(true);

    });



});
