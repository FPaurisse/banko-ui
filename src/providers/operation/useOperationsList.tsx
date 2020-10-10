import * as React from 'react';
import { UseClientRequestResult, UseQueryOptions } from 'graphql-hooks';

import { FormModel }                        from '@library/Form/models/FormModel';
import { UseFormContextValues }             from '@library/Form/provider/useForm';
import { useList, useListContextValues }    from '@library/List/provider/useList';

import { OperationModel }                   from '@models/OperationModel';

import useOperationForm                     from '@providers/operation/useOperationForm';

import { useOperationsByPeriod, useOperationRemove } from '@service/useOperations';
import { PeriodContextValues } from '@providers/period/usePeriod';

type OperationListProvider = {
    definition: FormModel<OperationModel>;
    form: UseFormContextValues<OperationModel>;
    list: useListContextValues<OperationModel>;
    reload: (options?: UseQueryOptions) => Promise<UseClientRequestResult<UseQueryOptions>>;
};

const useOperationsList = (period: PeriodContextValues): OperationListProvider => {
    const { definition, form } = useOperationForm();
    const { month, year } = period;
    const { data: operations, refetch: reload } = useOperationsByPeriod(['_id', 'title', 'amount', 'date', 'isCredit', 'isPassed'], { month, year });
    const list = useList<OperationModel>({ listing: operations, actions: { remove: useOperationRemove() } });

    React.useEffect(() => {
        if (form.loading && !form.serverError) {
            reload();
            form.form.reset();
        }
    }, [form])

    React.useEffect(() => {
        if(list.loading && !list.serverError){
            reload();
        }
    }, [list])

    return (
        {
            definition,
            form,
            list,
            reload
        }
    )
};

export default useOperationsList;
