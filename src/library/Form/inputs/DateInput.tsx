import * as React       from 'react';

import { InputProps }   from '@library/Form/models/InputModel';
import { DateInputStyle } from './DateInput.style';

const DateInput: React.FC<InputProps> = (props) => {
    const { name, innerRef, disabled } = props;

    return (
        <DateInputStyle>
            <input
                type='date'
                ref={ innerRef }
                disabled={ disabled }
                name={ name } 
                id={ name }
                autoComplete='off'
            />
        </DateInputStyle>
    )
};

export default DateInput;
