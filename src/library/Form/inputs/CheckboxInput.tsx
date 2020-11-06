import * as React       from 'react';

import { InputProps }   from '@library/Form/models/InputModel';

interface CheckboxInputProps {
    isChecked?: boolean;
}

const CheckboxInput: React.FC<InputProps & CheckboxInputProps> = (props) => {
    const { name, innerRef, isChecked } = props;

    return (
        <input type='checkbox' ref={ innerRef } name={ name } checked={ isChecked } />
    )
};

export default CheckboxInput;
