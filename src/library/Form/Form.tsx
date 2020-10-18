import * as React from 'react';
import { OperationModel } from '@models/OperationModel';
import { useFormContext } from './provider/useFormContext';
import { navigate, useParams } from '@reach/router';

const Form: React.FC = ({ children }) => {
    const { id } = useParams();
    const { form, actions } = useFormContext();
    const { handleSubmit } = form;

    const onSubmit = async (data: OperationModel): Promise<void> => {
        if (!data.isCredit) {
            data.amount = `-${data.amount}`;
        }
        await actions[id ? 'update' : 'create']({ variables: data });
    };

    const handleUndo = (): void => {
        navigate('/operations')
    }
 
    return (
        <form onSubmit={ handleSubmit(onSubmit) }>
            { children }
            <button type='submit'>{ id ? 'Modifier' : 'Ajouter' }</button>
            <button type='reset' onClick={ handleUndo }>Annuler</button>
        </form>
    )
}

export default Form;
