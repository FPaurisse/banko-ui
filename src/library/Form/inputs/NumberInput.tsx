import * as React       from 'react';

import { InputProps }   from '@library/Form/models/InputModel';

const NumberInput: React.FC<InputProps> = (props) => {
    const { name, operator, innerRef } = props;

    return (
        <React.Fragment>
            <span>{ operator }</span>
            <input
                type='number'
                ref={ innerRef }
                name={ name }
                autoComplete='off'
            />
        </React.Fragment>
    )
};

export default NumberInput;
