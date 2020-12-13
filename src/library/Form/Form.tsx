import * as React from 'react';

import { useFormContext }       from '@library/Form/provider/useFormContext';
import { usePeriodContext }     from '@providers/period/usePeriodContext';
import { FormStyle } from './Form.style';
import { useKeyboardEvent } from '@library/utils';
import { useAccountsByUserContext } from '@providers/account/useAccountsByUserContext';
import { useUserContext } from '@providers/user/useUserContext';

const Form: React.FC = ({ children }) => {
    const { form, actions, entity, setEntity }  = useFormContext();
    const { setPeriod } = usePeriodContext();
    const accounts = useAccountsByUserContext();
    const { user } = useUserContext();
    
    const { update, create } = actions;
    const { handleSubmit, formState }   = form;
    const { isDirty }                   = formState;

    const onSubmit = async (data: Record<string, unknown>): Promise<void> => {
        if (!data.isCredit) {
            data.amount = `-${data.amount}`;   
        }
        if (accounts && accounts.selected) {
            data.accountId = accounts.selected;
        }
        data.userId = user._id;
        if (entity) {
            const { _id } = entity as Record<string, unknown>;
            update({ _id, ...data })
        } else {
            create(data)
        }
        setPeriod(data.date as string);
    };

    const handleUndo = (e: React.SyntheticEvent): void => {
        e.preventDefault();
        if (entity) {
            setEntity(null)
        } else {
            form.reset();
        }
    }

    useKeyboardEvent('Escape', () => {
        setEntity(null);
    })
 
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
