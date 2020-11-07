import * as React               from 'react';

import { OperationModel }       from '@models/OperationModel';
import { useFormContext }       from '@library/Form/provider/useFormContext';
import { usePeriodContext }     from '@providers/period/usePeriodContext';
import { FormStyle } from './Form.style';

const Form: React.FC = ({ children }) => {
    const { form, actions, entity, setEntity }  = useFormContext();
    const { setPeriod }                         = usePeriodContext();
    
    const { handleSubmit, formState }   = form;
    const { isDirty }                   = formState;

    const onSubmit = async (data: OperationModel): Promise<void> => {
        if (!data.isCredit) {
            data.amount = `-${data.amount}`;
        }
        await actions[entity ? 'update' : 'create']({ variables: data });
        setPeriod(data.date);
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
        <FormStyle onSubmit={ handleSubmit(onSubmit) }>
            <span>
                <h3>{ entity ? 'Modifier l\'opération' : 'Ajouter une opération' }</h3>
                { children }
            </span>
            <span>
                <button disabled={ (isDirty || entity) ? false : true } onClick={ handleUndo }>Annuler</button>
                <button disabled={ !isDirty } type='submit'>{ entity ? 'Modifier' : 'Ajouter' }</button>
            </span>
        </FormStyle>
    )
}

export default Form;
