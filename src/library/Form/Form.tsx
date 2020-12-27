import * as React from 'react';

import { useFormContext }           from '@library/Form/provider/useFormContext';
import { useKeyboardEvent }         from '@library/utils';
import { useModalContext }          from '@library/Modal/provider/useModalContext';

import { usePeriodContext }         from '@providers/period/usePeriodContext';
import { useAccountsByUserContext } from '@providers/account/useAccountsByUserContext';
import { useUserContext }           from '@providers/user/useUserContext';

import { FormStyle } from './Form.style';

const Form: React.FC = ({ children }) => {
    const { form, actions, headings, entity, setEntity } = useFormContext();
    const accounts          = useAccountsByUserContext();
    const { setOpen, open } = useModalContext();
    const { setPeriod }     = usePeriodContext();
    const { user }          = useUserContext();
    
    const { handleSubmit, formState }   = form;
    const { update, create }            = actions;
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
        setOpen(false);
    };

    const handleUndo = (e: React.SyntheticEvent): void => {
        e.preventDefault();
        setOpen(false);
        if (entity) {
            setEntity(null)
        } else {
            form.reset();
        }
    }

    useKeyboardEvent('Escape', () => {
        setOpen(false);
        setEntity(null);
    });

    return (
        <FormStyle onSubmit={ handleSubmit(onSubmit) }>
            <span>
                {
                    headings && (
                        <h3>{ entity ? headings.edition : headings.creation }</h3>
                    )
                }
                { children }
            </span>
            <span>
                <button disabled={ (open || isDirty || entity) ? false : true } onClick={ handleUndo }>Annuler</button>
                <button disabled={ !isDirty } type='submit'>{ entity ? 'Modifier' : 'Ajouter' }</button>
            </span>
        </FormStyle>
    )
}

export default Form;
