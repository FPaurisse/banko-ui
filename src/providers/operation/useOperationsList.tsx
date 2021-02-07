import { OperationModel }                   from '@models/OperationModel';

import { useList, useListContextValues }    from '@library/List/provider/useList';

import { PeriodContextValues }              from '@providers/period/usePeriod';

import {
    useOperationsByPeriod,
    useOperationDelete,
    useOperationsToCalculate,
    useOperationsDelete,
    useOperationsUpdate
}                                           from '@service/useOperations';
import { TotalContextValues, useTotal }     from '@providers/total/useTotal';

type OperationListProvider = {
    list: useListContextValues<OperationModel>;
    total: TotalContextValues;
};

const useOperationsList = (period: PeriodContextValues, userId: string, accountId: string): OperationListProvider => {
    
    const { month, year } = period;

    const {
        data: operationsByPeriod,
        fetching: listFetching,
        error: listError
    } = useOperationsByPeriod(month, year, accountId);
    
    const {
        data: operationsToCalculate,
        fetching: totalFetching
    } = useOperationsToCalculate(month, year, accountId);
    
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
        listing: operationsByPeriod,
        indexes: operationsByPeriod && operationsByPeriod.map((x) => x._id),
        actions: { delete: remove, deleteAll: removeAll, updateAll: updateAll },
        error: listError || removeError || removeAllError || updateAllError,
        reloading: listFetching
    });

    const total = useTotal(operationsToCalculate, totalFetching);

    return ({
        list,
        total
    })
};

export default useOperationsList;
