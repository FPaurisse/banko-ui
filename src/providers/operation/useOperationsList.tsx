import * as React from 'react';
import { UseClientRequestResult, UseQueryOptions } from 'graphql-hooks';

import { FormModel }                        from '@library/Form/models/FormModel';
import { UseFormContextValues }             from '@library/Form/provider/useForm';
import { useList, useListContextValues }    from '@library/List/provider/useList';

import { OperationModel }                   from '@models/OperationModel';

import useOperationForm                     from '@providers/operation/useOperationForm';

import { useAllOperations, useOperationRemove } from '@service/useOperations';

type OperationListProvider = {
    definition: FormModel<OperationModel>;
    form: UseFormContextValues<OperationModel>;
    list: useListContextValues<OperationModel>;
    reload: (options?: UseQueryOptions) => Promise<UseClientRequestResult<UseQueryOptions>>;
};

const useOperationsList = (): OperationListProvider => {
    const { definition, form } = useOperationForm();
    const { data: operations, refetch: reload } = useAllOperations();
    const list = useList<OperationModel>({ listing: operations, actions: { remove: useOperationRemove() } });

    React.useEffect(() => {
        if (form.loading && !form.error) {
            reload();
            form.form.reset();
        }
    }, [form])

    React.useEffect(() => {
        if(list.loading && !list.error){
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
