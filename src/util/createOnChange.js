/**
 * @file create onChange handler
 * @author leon <ludafa@outlook.com>
 */

export default function createOnChange(change, {parse, normalize}) {

    return (name, value) => {

        if (parse) {
            value = parse(value);
        }

        if (normalize) {
            value = normalize(value);
        }

        change(name, value);
    };

}
