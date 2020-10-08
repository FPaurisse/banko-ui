import * as React       from 'react';
import { FieldError }   from 'react-hook-form';

import { InputDefinitionModel, InputProps, InputType }  from '@library/Form/models/InputModel';
import { useFormContext }                               from '@library/Form/provider/useFormContext';
import TextInput                                        from '@library/Form/inputs/TextInput';
import DateInput                                        from '@library/Form/inputs/DateInput';

const Inputs: Record<InputType, React.FC> = {
    text: TextInput,
    date: DateInput
};

const Input: React.FC<InputDefinitionModel> = (props) => {
    const { type, name, ...rest }   = props;
    const { form, inputsError }     = useFormContext();

    const { register }  = form;
    const inputError: FieldError = inputsError[name as never];

    const Component: React.FC<InputProps> = Inputs[type];

    return (
        <React.Fragment>
            <Component
                innerRef={
                    register({
                        required: {
                            value: true,
                            message: 'Ce champs est requis'
                        }
                    }) }
                name={ name }
                error={ inputError ? true : false }
                { ...rest }
            />
            {
                inputError && inputError.message
            }
        </React.Fragment>
    )
};

export default Input;
