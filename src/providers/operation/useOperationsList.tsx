import { OperationModel }                   from '@models/OperationModel';

import { useList, useListContextValues }    from '@library/List/provider/useList';

import {
    useOperationsByPeriod,
    useOperationDelete,
    useOperationsDelete,
    useOperationsUpdate
}                                           from '@service/useOperations';
import { useAccountsByUserContext }         from '@providers/account/useAccountsByUserContext';
import { usePeriodContext }                 from '@providers/operation/period/usePeriodContext';

type OperationListProvider = {
    list: useListContextValues<OperationModel>;
};

const useOperationsList = (): OperationListProvider => {
    
    const { month, year }           = usePeriodContext();
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
            { label: 'Supprimer', provider: useOperationDelete() }
        ],
        actionBar: [
            { label: 'Approuver', provider: useOperationsUpdate() },
            { label: 'À venir', provider: useOperationsUpdate() },
            { label: 'Supprimer', provider: useOperationsDelete() }
        ],
        error: listError,
        reloading: listFetching
    });

    return ({
        list
    })
};

export default useOperationsList;
