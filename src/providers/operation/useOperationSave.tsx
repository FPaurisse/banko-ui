import * as React                   from 'react';

import { FormModel }                from '@library/Form/models/FormModel';
import { UseFormContextValues }     from '@library/Form/provider/useForm';

import { OperationModel }           from '@models/OperationModel';

import useOperationForm             from '@providers/operation/useOperationForm';
import { useAccountsByUserContext } from '@providers/account/useAccountsByUserContext';
import { PeriodContextValues }      from '@providers/operation/period/usePeriod';
import { useUserContext }           from '@providers/user/useUserContext';

import { useCategoriesByAccount }   from '@service/useCategory';

export type OperationSaveProvider = {
    definition: FormModel<OperationModel>;
    form: UseFormContextValues<OperationModel>;
    save: () => void;
};

const useOperationSave = (period: PeriodContextValues): OperationSaveProvider => {
    const { setPeriod }             = period;
    const { selected: accountId }   = useAccountsByUserContext();
    const { user: { _id: userId } } = useUserContext();
    const categories                = useCategoriesByAccount(accountId);
    
    const { definition, form }  = useOperationForm(categories.data, userId, accountId);

    const save = (): void => {
        if (!form.entity) {
            form.actions.create.executeMutation({
                ...form.values(),
                accountId,
                userId
            })
        } else {
            form.actions.update.executeMutation({
                ...form.values(),
                _id: form.entity._id
            })
        }
    }

    React.useEffect(() => {
        if (form.actions.create.state.fetching) {
            if (!form.actions.create.state.error) {
                form.reset();
                setPeriod(form.form.getValues('date'));
            }
        }
    }, [form.actions.create.state.fetching])

    return {
        definition,
        form,
        save
    }
};

export { useOperationSave };