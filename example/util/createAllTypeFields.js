/**
 * @file Fields
 * @author leon <ludafa@outlook.com>
 */

import React from 'react';
import {createField} from '../../src/index';

export default function createAllFields(options) {

    const objectFormat = value => (typeof value !== 'object' ? {} : value);
    const arrayFormat = value => (Array.isArray(value) ? value : []);

    const BaseField = createField(options)();

    /* eslint-disable fecs-prefer-class */
    /* eslint-disable fecs-valid-class-jsdoc */
    function StringField(props) {
        return <BaseField {...props} />;
    }

    function ArrayField(props) {
        return (
            <BaseField {...props} format={arrayFormat} />
        );
    }

    function ObjectField(props) {
        return (
            <BaseField {...props} format={objectFormat} />
        );
    }
    function BooleanField(props) {

        const trueValue = props.trueValue;

        return (
            <BaseField
                {...props}
                format={value => (
                    typeof value === 'boolean' ? value : trueValue
                )}
                parse={value => value === trueValue}
            />
        );

    }

    const TYPE_FIELD_MAP = {
        'string': StringField,
        'array': ArrayField,
        'object': ObjectField,
        'boolean': BooleanField
    };

    function Field(props) {

        const {type, ...rest} = props;

        const ActualField = TYPE_FIELD_MAP[type] || BaseField;

        return (<ActualField {...rest} />);

    }

    return {
        Field,
        StringField,
        ArrayField,
        ObjectField,
        BooleanField
    };


}
