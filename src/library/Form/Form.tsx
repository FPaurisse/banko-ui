import * as React               from 'react';

import { OperationModel }       from '@models/OperationModel';

import { useFormContext }       from '@library/Form/provider/useFormContext';

import { usePeriodContext }     from '@providers/period/usePeriodContext';

const Form: React.FC = ({ children }) => {
    const { form, actions, entity, setEntity }  = useFormContext();
    const { setPeriod }                         = usePeriodContext();
    
    const { handleSubmit, formState } = form;
    const { isDirty } = formState;

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
        if (entity) {
            setEntity(null)
        } else {
            form.reset();
        }
    }
 
    return (
        <form onSubmit={ handleSubmit(onSubmit) }>
            { children }
            <button type='submit'>{ entity ? 'Modifier' : 'Ajouter' }</button>
            {
                (isDirty || entity) && <button onClick={ handleUndo }>Annuler</button>
            }
        </form>
    )
}

export default Form;
