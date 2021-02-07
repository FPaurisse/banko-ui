import * as React                   from 'react';

import { FormModel }                from '@library/Form/models/FormModel';
import { UseFormContextValues }     from '@library/Form/provider/useForm';

import { OperationModel }           from '@models/OperationModel';

import useOperationForm             from '@providers/operation/useOperationForm';
import { PeriodContextValues }      from '@providers/period/usePeriod';

import { useCategoriesByAccount }   from '@service/useCategory';

export type OperationSaveProvider = {
    definition: FormModel<OperationModel>;
    form: UseFormContextValues<OperationModel>;
    save: () => void;
};

const useOperationSave = (period: PeriodContextValues, userId: string, accountId: string): OperationSaveProvider => {

    const categories = useCategoriesByAccount(accountId);
    
    const { definition, form }  = useOperationForm(categories.data, userId, accountId);
    const { setPeriod } = period;

    const save = (): void => {
        if (!form.entity) {
            form.actions.create({ ...form.values, date: '02-02-2021', userId, accountId })
        } else {
            form.actions.update({ ...form.values, _id: form.entity._id })
        }
    }

    React.useEffect(() => {
        if (form.form.formState.isSubmitting) {
            setPeriod(form.form.getValues('date'));
        }
    }, [form.form.formState.isSubmitting])

    return {
        definition,
        form,
        save
    }
};

export { useOperationSave };