import * as React       from 'react';

import { InputProps }   from '@library/Form/models/InputModel';
import { TextInputStyle } from './TextInput.style';

const TextInput: React.FC<InputProps> = (props) => {
    const { name, innerRef, label } = props;
    
    return (
        <TextInputStyle>
            <input
                type='text'
                ref={ innerRef }
                name={ name }
                id={ name }
                placeholder={ label }
                autoComplete='off'
            />
        </TextInputStyle>
    )
};

export default TextInput;
