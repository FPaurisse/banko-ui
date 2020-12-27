import * as React       from 'react';

import { InputProps }   from '@library/Form/models/InputModel';
import { useFormContext } from '../provider/useFormContext';
import { SelectInputStyle } from './SelectInput.style';

const SelectInput: React.FC<InputProps> = (props) => {
    
    const { form } = useFormContext();
    const { name, label, innerRef, options, disabled } = props;

    const handleChange = (e: React.BaseSyntheticEvent): void => {
        form.setValue(name, e.target.value)
    }

    return (
        <SelectInputStyle>
            <label>{ label }</label>
            <select
                name={ name } 
                disabled={ disabled }
                ref={ innerRef as React.LegacyRef<HTMLSelectElement> }
                onChange={ handleChange }
            >
                { options && options.length > 0 && options.map((option, index) => {
                    return (
                        <option key={ index } value={ option.value as string }>
                            { option.label }
                        </option>
                    )
                }) }
            </select>
        </SelectInputStyle>
    )
};

export default SelectInput;
