import * as React       from 'react';

import { InputProps }   from '@library/Form/models/InputModel';
import { useFormContext } from '../provider/useFormContext';

const NumberInput: React.FC<InputProps> = (props) => {
    const { form } = useFormContext();
    const { name, operator, innerRef } = props;
    const value = form.watch(name);

    React.useEffect(() => {
        if (value) {
            form.setValue(name, value.replace('-', ''))
        }
    }, [value])

    return (
        <React.Fragment>
            <span>{ operator }</span>
            <input
                type='number'
                ref={ innerRef }
                name={ name }
                min='0'
                autoComplete='off'
            />
        </React.Fragment>
    )
};

export default NumberInput;
