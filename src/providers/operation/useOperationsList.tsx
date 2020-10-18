import * as React from 'react';
import { UseClientRequestResult, UseQueryOptions } from 'graphql-hooks';

import { FormModel }                        from '@library/Form/models/FormModel';
import { UseFormContextValues }             from '@library/Form/provider/useForm';
import { useList, useListContextValues }    from '@library/List/provider/useList';

import { OperationModel }                   from '@models/OperationModel';

import useOperationForm                     from '@providers/operation/useOperationForm';

import { useOperationsByPeriod, useOperationRemove, useOperationById } from '@service/useOperations';
import { PeriodContextValues } from '@providers/period/usePeriod';
import { useParams } from '@reach/router';

type OperationListProvider = {
    definition: FormModel<OperationModel>;
    form: UseFormContextValues<OperationModel>;
    list: useListContextValues<OperationModel>;
    reload: (options?: UseQueryOptions) => Promise<UseClientRequestResult<UseQueryOptions>>;
};

const useOperationsList = (period: PeriodContextValues): OperationListProvider => {
    const { definition, form } = useOperationForm();
    const { id } = useParams();
    const { month, year } = period;
    const { data: operations, refetch: listReload } = useOperationsByPeriod(['_id', 'title', 'amount', 'date', 'isCredit', 'isPassed'], { month, year });
    const { data: operation, refetch: reload } = useOperationById(['_id', 'title', 'amount', 'date', 'isCredit', 'isPassed'], id);
    const list = useList<OperationModel>({ listing: operations, actions: { remove: useOperationRemove() } });

    React.useEffect(() => {
        if (id) {
            form.form.reset(operation);
        }
    }, [id, operation])


    React.useEffect(() => {
        if (form.loading && !form.serverError) {
            listReload();
        }
    }, [form])

    React.useEffect(() => {
        if(list.loading && !list.serverError){
            listReload();
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
