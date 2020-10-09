import * as React       from 'react';

import { InputProps }   from '@library/Form/models/InputModel';

const TextInput: React.FC<InputProps> = (props) => {
    const { name, innerRef } = props;

    return (
        <input
            type='text'
            ref={ innerRef }
            name={ name }
            autoComplete='off'
        />
    )
};

export default TextInput;
