import * as React       from 'react';

import { InputProps }   from '@library/Form/models/InputModel';
import { CheckboxInputStyle } from './CheckboxInput.style';
import { useFormContext } from '../provider/useFormContext';

const CheckboxInput: React.FC<InputProps> = (props) => {
    const { name, innerRef, label } = props;
    const { form } = useFormContext();
    const value = form.watch(name);

    return (
        <CheckboxInputStyle $isChecked={ value }>
            <input
                type='checkbox'
                ref={ innerRef }
                name={ name }
                id={ name }
            />
            <label htmlFor={ name }>
                <span>{ value ? '✓' : '' }</span>
                { label }
            </label>
        </CheckboxInputStyle>
    )
};

export default CheckboxInput;
