/**
 * @file Array Control
 * @author leon <ludafa@outlook.com>
 */

import {Field} from '../Field';
import React, {Component} from 'react';
import BookControl from './BookControl';

export default class ArrayControl extends Component {

    constructor(...args) {
        super(...args);
        this.onDownward = this.onDownward.bind(this);
        this.onUpward = this.onUpward.bind(this);
        this.onRemove = this.onRemove.bind(this);
    }

    onDownward({index}) {
        this.props.actions.arraySwap(name, index, index + 1);
    }

    onUpward({index}) {
        this.props.actions.arraySwap(name, index, index - 1);
    }

    onRemove({index}) {
        this.props.actions.arraySplice(name, index, 1);
    }

    render() {

        const {
            name,
            value,
            meta,
            actions
        } = this.props;

        const total = value.length;
        const {
            touched,
            error
        } = meta;

        return (
            <ul>
                <button
                    type="button"
                    onClick={e => actions.arrayPush(name, {})}>
                    add a new book
                </button>
                <label>{touched && error ? error : ''}</label>
                {value.map((item, index) => (
                    <Field
                        index={index}
                        total={total}
                        key={`${name}[${index}]`}
                        name={`${name}[${index}]`}
                        control={BookControl}
                        onDownward={this.onDownward}
                        onUpward={this.onUpward}
                        onRemove={this.onRemove}
                    />
                ))}
            </ul>
        );

    }

}
