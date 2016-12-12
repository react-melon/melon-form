/**
 * @file BookControl
 * @author leon <ludafa@outlook.com>
 */

import React, {Component, PropTypes} from 'react';
import {StringField} from '../Field';
import TextControl from './TextControl';

export default function BookControl(props) {

    const {
        name,
        meta,
        actions,
        index,
        total,
        onRemove,
        onUpward,
        onDownward
    } = props;

    return (
        <div>
            <button
                type="button"
                onClick={e => onRemove({index})}>
                x
            </button>
            <button
                type="button"
                disabled={index <= 0}
                onClick={e => onUpward({index})}>
                up
            </button>
            <button
                type="button"
                disabled={index >= total - 1}
                onClick={e => onDownward({index})}>
                down
            </button>
            <label>author</label>
            <StringField
                control={TextControl}
                name={`${name}.author`} />
            <label>email</label>
            <StringField
                control={TextControl}
                name={`${name}.email`} />
        </div>
    );

}
