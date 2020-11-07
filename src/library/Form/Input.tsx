import * as React       from 'react';
import { FieldError }   from 'react-hook-form';

import { InputDefinitionModel, InputProps, InputType }  from '@library/Form/models/InputModel';
import { useFormContext }                               from '@library/Form/provider/useFormContext';
import CheckboxInput                                    from '@library/Form/inputs/CheckboxInput';
import NumberInput                                      from '@library/Form/inputs/NumberInput';
import TextInput                                        from '@library/Form/inputs/TextInput';
import DateInput                                        from '@library/Form/inputs/DateInput';
import { InputStyle } from './Input.style';

const Inputs: Record<InputType, React.FC> = {
    text: TextInput,
    number: NumberInput,
    date: DateInput,
    checkbox: CheckboxInput
};

const Input: React.FC<InputDefinitionModel> = (props) => {
    const { type, name, required, before, after, label, hidden, ...rest }   = props;
    const { form, inputsError }     = useFormContext();

    const { register }  = form;
    const inputError: FieldError = inputsError[name as never];

    const Component: React.FC<InputProps> = Inputs[type];

    return (
        <InputStyle $hidden={ hidden }>
            <Component
                innerRef={
                    register({
                        required: {
                            value: required,
                            message: 'Ce champs est requis'
                        }
                    }) }
                name={ name }
                label={ label }
                before={ before }
                after={ after }
                error={ inputError ? true : false }
                { ...rest }
            />
            {
                inputError && inputError.message
            }
        </InputStyle>
    )
};

export default Input;
