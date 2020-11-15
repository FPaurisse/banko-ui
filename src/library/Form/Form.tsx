import * as React               from 'react';

import { OperationModel }       from '@models/OperationModel';
import { useFormContext }       from '@library/Form/provider/useFormContext';
import { usePeriodContext }     from '@providers/period/usePeriodContext';
import { FormStyle } from './Form.style';
import { useKeyboardEvent } from '@library/utils';

interface FormProps {
    hidden?: boolean;
}

const Form: React.FC<FormProps> = ({ children, hidden }) => {
    const { form, actions, entity, setEntity }  = useFormContext();
    const { setPeriod }                         = usePeriodContext();
    
    const { update, create } = actions;
    const { handleSubmit, formState }   = form;
    const { isDirty }                   = formState;

    const onSubmit = async (data: OperationModel): Promise<void> => {
        if (!data.isCredit) {
            data.amount = `-${data.amount}`;
        }
        if (entity) {
            const { _id }: Partial<OperationModel> = entity;
            update({ _id, ...data })
        } else {
            create(data)
        }
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

    useKeyboardEvent('Escape', () => {
        setEntity(null);
    })
 
    return (
        <FormStyle $hidden={ hidden } onSubmit={ handleSubmit(onSubmit) }>
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
