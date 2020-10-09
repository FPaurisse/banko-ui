import * as React       from 'react';

import { InputProps }   from '@library/Form/models/InputModel';

const CheckboxInput: React.FC<InputProps> = (props) => {
    const { name, innerRef } = props;

    return (
        <input type='checkbox' ref={ innerRef } name={ name } />
    )
};

export default CheckboxInput;
