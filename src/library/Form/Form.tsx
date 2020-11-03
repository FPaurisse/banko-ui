import * as React from 'react';
import { OperationModel }       from '@models/OperationModel';
import { useFormContext }       from './provider/useFormContext';
import { usePeriodContext } from '@providers/period/usePeriodContext';

const Form: React.FC = ({ children }) => {
    const { form, actions, entity, setEntity }  = useFormContext();
    const { setPeriod }                         = usePeriodContext();
    
    const { handleSubmit }                      = form;

    const onSubmit = async (data: OperationModel): Promise<void> => {
        if (!data.isCredit) {
            data.amount = `-${data.amount}`;
        }
        await actions[entity ? 'update' : 'create']({ variables: data });
        setPeriod(data.date);
        setEntity(null);
    };

    const handleUndo = (e: React.SyntheticEvent): void => {
        e.preventDefault();
        setEntity(null);
    }
 
    return (
        <form onSubmit={ handleSubmit(onSubmit) }>
            { children }
            <button type='submit'>{ entity ? 'Modifier' : 'Ajouter' }</button>
            <button onClick={ handleUndo }>Annuler</button>
        </form>
    )
}

export default Form;
