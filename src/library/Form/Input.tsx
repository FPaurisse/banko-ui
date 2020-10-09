import * as React       from 'react';
import { FieldError }   from 'react-hook-form';

import { InputDefinitionModel, InputProps, InputType }  from '@library/Form/models/InputModel';
import { useFormContext }                               from '@library/Form/provider/useFormContext';
import CheckboxInput                                    from '@library/Form/inputs/CheckboxInput';
import NumberInput                                      from '@library/Form/inputs/NumberInput';
import TextInput                                        from '@library/Form/inputs/TextInput';
import DateInput                                        from '@library/Form/inputs/DateInput';

const Inputs: Record<InputType, React.FC> = {
    text: TextInput,
    number: NumberInput,
    date: DateInput,
    checkbox: CheckboxInput
};

const Input: React.FC<InputDefinitionModel> = (props) => {
    const { type, name, required, operator, ...rest }   = props;
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
                            value: required,
                            message: 'Ce champs est requis'
                        }
                    }) }
                name={ name }
                operator={ operator }
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
