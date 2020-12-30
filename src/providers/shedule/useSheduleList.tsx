import * as React                           from 'react';

import { OperationModel }                   from '@models/OperationModel';

import { FormModel }                        from '@library/Form/models/FormModel';
import { UseFormContextValues }             from '@library/Form/provider/useForm';
import { useList, useListContextValues }    from '@library/List/provider/useList';

import { PeriodContextValues }              from '@providers/period/usePeriod';
import useSheduleForm                       from '@providers/shedule/useSheduleForm';

import {
    useOperationDelete,
    useOperationsDelete,
    useOperationsUpdate,
    useSheduledOperations
}                                           from '@service/useOperations';
import { useCategoriesByAccount }           from '@service/useCategory';

type OperationListProvider = {
    definition: FormModel<OperationModel>;
    form: UseFormContextValues<OperationModel>;
    list: useListContextValues<OperationModel>;
};

const useSheduleList = (period: PeriodContextValues, userId: string, accountId: string): OperationListProvider => {

    const {
        data: CategoriesByAccount,
        error: categoriesError
    } = useCategoriesByAccount(accountId);

    const { definition, form } = useSheduleForm(CategoriesByAccount, userId, accountId);
    
    const { entity } = form;
    const { setPeriod } = period;

    const {
        data: sheduledOperations,
        fetching: listFetching,
        error: listError
    } = useSheduledOperations(accountId);
    
    const {
        state: { error: removeError },
        executeMutation: remove
    } = useOperationDelete();

    const {
        state: { error: removeAllError },
        executeMutation: removeAll
    } = useOperationsDelete();

    const {
        state: { error: updateAllError },
        executeMutation: updateAll
    } = useOperationsUpdate();

    const list = useList<OperationModel>({
        listing: sheduledOperations,
        indexes: sheduledOperations.map((x) => x._id),
        actions: { delete: remove, deleteAll: removeAll, updateAll: updateAll },
        error: listError || removeError || removeAllError || updateAllError || categoriesError,
        reloading: listFetching
    });

    React.useEffect(() => {
        if (entity) {
            form.form.reset(entity);
            setPeriod(entity.date);
        } else {
            const model = OperationModel.Empty();
            form.form.reset(model);
        }
    }, [entity])

    React.useEffect(() => {
        if (form.form.formState.isSubmitting) {
            setPeriod(form.form.getValues('date'));
        }
    }, [form.form.formState.isSubmitting])

    return ({
        definition,
        form,
        list
    })
};

export default useSheduleList;
