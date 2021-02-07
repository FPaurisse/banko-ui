import * as React                       from 'react';
import { sum, toNumber, round }         from 'lodash';

import { OperationModel }               from '@models/OperationModel';
import { useOperationsToCalculate }     from '@service/useOperations';
import { usePeriodContext }             from '@providers/operation/period/usePeriodContext';
import { useAccountsByUserContext }     from '@providers/account/useAccountsByUserContext';

export type TotalContextValues = {
    real: number;
    actual: number;
    loading: boolean;
}

export const useTotal = (): TotalContextValues => {
    const [actual, setActual]   = React.useState<number>(0.00);
    const [real, setReal]       = React.useState<number>(0.00);

    const { month, year }           = usePeriodContext();
    const { selected: accountId }   = useAccountsByUserContext();
    
    const {
        data: operationsToCalculate,
        fetching: totalFetching
    } = useOperationsToCalculate(month, year, accountId);

    React.useEffect(() => {
        setActual(
            toNumber(round(sum(operationsToCalculate
                .filter((operation) => operation.isPassed)
                .map((operation: OperationModel) => toNumber(operation.amount.replace(',', '.')))
            ), 2).toFixed(2))
        )
    }, [operationsToCalculate])

    React.useEffect(() => {
        setReal(
            toNumber(round(sum(operationsToCalculate
                .map((operation: OperationModel) => toNumber(operation.amount.replace(',', '.')))
            ), 2).toFixed(2))
        )
    }, [operationsToCalculate])

    return ({
        real,
        actual,
        loading: totalFetching
    })
};
