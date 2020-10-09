import { OperationModel } from '@models/OperationModel';
import * as React from 'react';
import { useFormContext } from './provider/useFormContext';
  
interface FormProps {
    action: (variables: Record<string, unknown>) => void;
}

const Form: React.FC<FormProps> = ({ children, action }) => {
    const { form }          = useFormContext();
    const { handleSubmit }  = form;

    const onSubmit = async (data: OperationModel): Promise<void> => {
        if (!data.isCredit) {
            data.amount = `-${data.amount}`;
        }
        action({ variables: data });
    };

    return (
        <form onSubmit={ handleSubmit(onSubmit) }>
            { children }
            <button type='submit'>Add</button>
        </form>
    )
}

export default Form;
