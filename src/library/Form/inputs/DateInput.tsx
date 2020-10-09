import * as React       from 'react';

import { InputProps }   from '@library/Form/models/InputModel';

const DateInput: React.FC<InputProps> = (props) => {
    const { name, innerRef } = props;

    return (
        <input
            type='date'
            ref={ innerRef }
            name={ name } 
            autoComplete='off'
        />
    )
};

export default DateInput;
