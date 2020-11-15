import * as React                                   from 'react';
import { sum, toNumber, round }                     from 'lodash';

import { OperationModel }                           from '@models/OperationModel';

export type TotalContextValues = {
    real: number;
    actual: number;
    loading: boolean;
}

export const useTotal = (operations: OperationModel[], loading: boolean): TotalContextValues => {
    const [actual, setActual]           = React.useState<number>(0.00);
    const [real, setReal]               = React.useState<number>(0.00);

    React.useEffect(() => {
        setActual(
            toNumber(round(sum(operations
                .filter((operation) => operation.isPassed)
                .map((operation: OperationModel) => toNumber(operation.amount.replace(',', '.')))
            ), 2).toFixed(2))
        )
    }, [operations])

    React.useEffect(() => {
        setReal(
            toNumber(round(sum(operations
                .map((operation: OperationModel) => toNumber(operation.amount.replace(',', '.')))
            ), 2).toFixed(2))
        )
    }, [operations])

    return ({
        real,
        actual,
        loading
    })
};
