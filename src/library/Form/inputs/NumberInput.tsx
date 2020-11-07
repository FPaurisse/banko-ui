import * as React       from 'react';

import { InputProps }   from '@library/Form/models/InputModel';
import { useFormContext } from '../provider/useFormContext';
import { NumberInputStyle } from './NumberInput.style';

const NumberInput: React.FC<InputProps> = (props) => {
    const { form } = useFormContext();
    const { name, before, after, innerRef, label } = props;
    const value = form.watch(name);

    React.useEffect(() => {
        if (value) {
            form.setValue(name, value.replace('-', ''))
        }
    }, [value])

    const additionnal = form.watch('isCredit')

    return (
        <NumberInputStyle>
            {
                before && (
                    <span onClick={ () => form.setValue('isCredit', !additionnal) }>{ before }</span>
                )
            }
            <input
                type='number'
                ref={ innerRef }
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
