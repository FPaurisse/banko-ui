import * as React       from 'react';

import { InputProps }   from '@library/Form/models/InputModel';
import { useFormContext } from '../provider/useFormContext';
import { NumberInputStyle } from './NumberInput.style';

const NumberInput: React.FC<InputProps> = (props) => {
    const { form } = useFormContext();
    const { name, before, after, innerRef, label, disabled } = props;
    const value = form.watch(name);

    React.useEffect(() => {
        if (value) {
            form.setValue(name, value.replace('-', ''))
        }
    }, [value])

    return (
        <NumberInputStyle>
            {
                before && (
                    <span>{ before }</span>
                )
            }
            <input
                type='number'
                step='any'
                ref={ innerRef }
                disabled={ disabled }
                name={ name }
                id={ name }
                placeholder={ label }
                min='0'
                autoComplete='off'
            />
            {
                after && (
                    <span>{ after }</span>
                )
            }
        </NumberInputStyle>
    )
};

export default NumberInput;
