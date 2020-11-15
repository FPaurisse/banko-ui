import * as React                                       from 'react';

import { OperationModel }                               from '@models/OperationModel';

import { FormModel }                                    from '@library/Form/models/FormModel';
import { UseFormContextValues }                         from '@library/Form/provider/useForm';
import { useList, useListContextValues }                from '@library/List/provider/useList';

import useOperationForm                                 from '@providers/operation/useOperationForm';
import { PeriodContextValues }                          from '@providers/period/usePeriod';

import { useOperationsByPeriod, useOperationDelete, useOperationsToCalculate }    from '@service/useOperations';
import { TotalContextValues, useTotal } from '@providers/total/useTotal';

type OperationListProvider = {
    definition: FormModel<OperationModel>;
    form: UseFormContextValues<OperationModel>;
    list: useListContextValues<OperationModel>;
    total: TotalContextValues;
};

const useOperationsList = (period?: PeriodContextValues): OperationListProvider => {
    const { definition, form }           = useOperationForm();
    
    const { entity } = form;
    const { month, year, setPeriod } = period;
    
    const {
        data: operationsByPeriod,
        fetching: listFetching,
        error: listError
    } = useOperationsByPeriod({ month, year });
    
    const {
        data: operationsToCalculate,
        fetching: totalFetching
    } = useOperationsToCalculate({ month, year });
    
    const {
        state: { error: removeError },
        executeMutation: remove
    } = useOperationDelete();

    const list = useList<OperationModel>({
        listing: operationsByPeriod,
        indexes: operationsByPeriod.map((x) => x._id),
        actions: { delete: remove },
        error: listError || removeError,
        reloading: listFetching
    });

    const total = useTotal(operationsToCalculate, totalFetching);

    React.useEffect(() => {
        if (entity) {
            form.form.reset(entity);
            setPeriod(entity.date);
        } else {
            const model = OperationModel.Empty();
            form.form.reset(model);
        }
    }, [entity])

    return ({
        definition,
        form,
        list,
        total
    })
};

export default useOperationsList;
