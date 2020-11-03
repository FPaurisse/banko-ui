import * as React                                   from 'react';
import { sum, toNumber, round }                     from 'lodash';
import { UseClientRequestResult, UseQueryOptions }  from 'graphql-hooks';

import { OperationModel }                           from '@models/OperationModel';

import { PeriodContextValues }                      from '@providers/period/usePeriod';

import { useOperationsToCalculate }                 from '@service/useOperations';

export type TotalContextValues = {
    real: number;
    actual: number;
    loading: boolean;
    refetch: (options?: UseQueryOptions) => Promise<UseClientRequestResult<UseQueryOptions>>;
}

export const useTotal = (period?: PeriodContextValues, formLoading?: boolean): TotalContextValues => {
    const [real, setReal]       = React.useState<number>(0.00);
    const [actual, setActual]   = React.useState<number>(0.00);
        
    const { month, year } = period;

    const { data: operations, loading, refetch } = useOperationsToCalculate(['amount', 'isPassed'], { month, year });

    React.useEffect(() => {
        if (operations) {
            setReal(
                toNumber(round(sum(operations
                    .filter((operation) => operation.isPassed)
                    .map((operation: OperationModel) => toNumber(operation.amount.replace(',', '.')))
                ), 2).toFixed(2))
            )
        }
    }, [period])

    React.useEffect(() => {
        if (operations) {
            setActual(
                toNumber(round(sum(operations
                    .map((operation: OperationModel) => toNumber(operation.amount.replace(',', '.')))
                ), 2).toFixed(2))
            )
        }
    }, [period])

    React.useEffect(() => {
        refetch();
    }, [formLoading])

    return ({
        real,
        actual,
        loading,
        refetch
    })
};
