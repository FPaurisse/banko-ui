import { OperationModel }                   from '@models/OperationModel';

import { useList, useListContextValues }    from '@library/List/provider/useList';

import {
    useOperationsByPeriod,
    useOperationDelete,
    useOperationsDelete,
    useOperationsUpdate
}                                           from '@service/useOperations';
import { useAccountsByUserContext }         from '@providers/account/useAccountsByUserContext';
import { PeriodContextValues } from './period/usePeriod';
import { UseFormContextValues } from '@library/Form/provider/useForm';

export type OperationListProvider = {
    list: useListContextValues<OperationModel>;
};

const useOperationsList = (period: PeriodContextValues, form: UseFormContextValues<OperationModel>): OperationListProvider => {
    
    const { month, year }           = period;
    const { selected: accountId }   = useAccountsByUserContext();

    const {
        data: operationsByPeriod,
        fetching: listFetching,
        error: listError
    } = useOperationsByPeriod(month, year, accountId);

    const list = useList<OperationModel>({
        listing: operationsByPeriod,
        indexes: operationsByPeriod && operationsByPeriod.map((x) => x._id),
        actionRow: [
            { label: 'Modifier', setEntity: form.setEntity },
            { label: 'Supprimer', provider: useOperationDelete().executeMutation }
        ],
        actionBar: [
            { label: 'Approuver', provider: useOperationsUpdate().executeMutation },
            { label: 'À venir', provider: useOperationsUpdate().executeMutation },
            { label: 'Supprimer', provider: useOperationsDelete().executeMutation }
        ],
        error: listError,
        reloading: listFetching
    });

    return ({
        list
    })
};

export default useOperationsList;
