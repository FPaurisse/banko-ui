import * as React from 'react';

import { FormModel }                        from '@library/Form/models/FormModel';
import { UseFormContextValues }             from '@library/Form/provider/useForm';
import { useList, useListContextValues }    from '@library/List/provider/useList';

import { OperationModel }                   from '@models/OperationModel';

import useOperationForm                     from '@providers/operation/useOperationForm';
import { PeriodContextValues }              from '@providers/period/usePeriod';

import { useOperationsByPeriod, useOperationRemove } from '@service/useOperations';
import { TotalContextValues } from '@providers/total/useTotal';

type OperationListProvider = {
    definition: FormModel<OperationModel>;
    form: UseFormContextValues<OperationModel>;
    list: useListContextValues<OperationModel>;
};

const useOperationsList = (period?: PeriodContextValues, total?: TotalContextValues): OperationListProvider => {
    const [operations, setOperations]   = React.useState<OperationModel[]>(null);

    const { definition, form }           = useOperationForm();
    
    const { loading: formLoading, entity }                  = form;
    const { refetch: totalReload }                          = total;
    const { month, year, setPeriod, loading: periodLoading } = period;
    
    const operationsByPeriod = useOperationsByPeriod(['_id', 'title', 'amount', 'date', 'isCredit', 'isPassed'], { month, year });
    
    const list = useList<OperationModel>({ listing: operations, actions: { remove: useOperationRemove() }, loading: formLoading || periodLoading, listReload: operationsByPeriod.refetch, totalReload });

    React.useEffect(() => {
        const { data } = operationsByPeriod;
        setOperations(data);
    }, [operationsByPeriod])

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
        list
    })
};

export default useOperationsList;
