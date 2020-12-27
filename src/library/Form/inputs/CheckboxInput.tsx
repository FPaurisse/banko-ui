import * as React       from 'react';

import { InputProps }   from '@library/Form/models/InputModel';
import { CheckboxInputStyle } from './CheckboxInput.style';
import { useFormContext } from '../provider/useFormContext';

const CheckboxInput: React.FC<InputProps> = (props) => {
    const { name, innerRef, label, inverse, disabled } = props;
    const { form } = useFormContext();
    const value = form.watch(name);

    return (
        <CheckboxInputStyle $isChecked={ value }>
            <input
                disabled={ disabled }
                type='checkbox'
                ref={ innerRef }
                name={ name }
                id={ name }
            />
            <div>
                <label htmlFor={ name }>
                    { value ? inverse : label }
                </label>
                <span>
                    { !value ? inverse : label }
                </span>
            </div>
        </CheckboxInputStyle>
    )
};

export default CheckboxInput;
