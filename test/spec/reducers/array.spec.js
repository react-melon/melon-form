/**
 * @file reducers/array spec
 * @author leon <ludafa@outlook.com>
 */

import {
    arrayPush,
    arraySplice
} from '../../../src/reducers/array';

import {DEFAULT_META} from '../../../src/constants';

describe('reducers/array', () => {

    it('arrayPush', () => {

        let store = {
            value: {
                books: []
            },
            meta: {
                books: DEFAULT_META
            }
        };

        let action = {
            payload: {
                name: 'books',
                elements: [{
                    name: 'test',
                    author: 'leon'
                }]
            }
        };

        expect(arrayPush(store, action)).toEqual({
            value: {
                books: [{
                    name: 'test',
                    author: 'leon'
                }]
            },
            meta: {
                'books': DEFAULT_META,
                'books[0].name': DEFAULT_META,
                'books[0].author': DEFAULT_META
            }
        });

        let action2 = {
            payload: {
                name: 'books',
                elements: [null, undefined]
            }
        };

        expect(arrayPush(store, action2)).toEqual({
            value: {
                books: [null, undefined]
            },
            meta: {
                'books': DEFAULT_META,
                'books[0]': DEFAULT_META,
                'books[1]': DEFAULT_META
            }
        });



    });

    it('arraySplice', () => {

        let store = {
            value: {
                books: []
            },
            meta: {
                books: DEFAULT_META
            }
        };

        expect(arraySplice(store, {
            payload: {
                name: 'books',
                start: 0,
                deleteCount: 0,
                replacements: [null, undefined]
            }
        })).toEqual({
            value: {
                books: [null, undefined]
            },
            meta: {
                'books': DEFAULT_META,
                'books[0]': DEFAULT_META,
                'books[1]': DEFAULT_META
            }
        });

    });


});
