/**
 * @file util/dataPath spec
 * @author leon <ludafa@outlook.com>
 */


import {
    deleteIn,
    compilePath,
    walk
} from '../../../src/util/dataPath';

describe('util/dataPath', () => {


    it('deleteIn', () => {

        expect(typeof deleteIn).toBe('function');

        let target = {
            a: {
                b: {
                    c: [1, 2, {
                        e: 1,
                        f: {
                            g: 3
                        }
                    }]
                }
            }
        };

        let result = deleteIn(target, 'a.b.c[2].e');

        expect(result.a.b.c).not.toBe(target.a.b.c);
        expect(result.a.b).not.toBe(target.a.b);
        expect(result.a).not.toBe(target.a);
        expect(result).not.toBe(target);

        expect(result).toEqual({
            a: {
                b: {
                    c: [1, 2, {f: {g: 3}}]
                }
            }
        });

        const target2 = {
            a: {}
        };

        const result2 = deleteIn(target2, 'b.a.c');

        expect(target2).not.toBe(result2);
        expect(result2).toEqual({
            a: {}
        });

    });

    it('compilePath', () => {
        expect(compilePath(['books', '1', 'author'])).toBe('books[1].author');
    });

    it('walk', () => {

        let spy = jasmine.createSpy();

        walk(null, spy);

        expect(spy).not.toHaveBeenCalled();

        let spy2 = jasmine.createSpy();

        walk([1], spy2);

        expect(spy2).toHaveBeenCalledTimes(1);

        let spy3 = jasmine.createSpy();

        walk([null], spy3);

        expect(spy3).toHaveBeenCalledTimes(1);

        let spy4 = jasmine.createSpy();

        walk({name: void 0}, spy4);

        expect(spy4).toHaveBeenCalledTimes(1);

    });

});
