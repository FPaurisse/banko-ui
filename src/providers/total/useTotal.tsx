import * as React from 'react';
import { sum, toNumber, round } from 'lodash';
import { PeriodContextValues } from '@providers/period/usePeriod';
import { useOperationsByPeriod } from '@service/useOperations';
import { OperationModel } from '@models/OperationModel';
import { useListContextValues } from '@library/List/provider/useList';
import { UseFormContextValues } from '@library/Form/provider/useForm';

export type TotalContextValues = {
    real: number;
    actual: number;
}

export const useTotal = (period: PeriodContextValues, list: useListContextValues<OperationModel>, form: UseFormContextValues<OperationModel>): TotalContextValues => {
    const [real, setReal] = React.useState<number>(0.00);
    const [actual, setActual] = React.useState<number>(0.00);
    const { month, year } = period;
    const { data: operations, refetch: reload } = useOperationsByPeriod({ month, year });
    
    React.useEffect(() => {
        if(list.loading && !list.serverError){
            reload();
        }
    }, [list])

    React.useEffect(() => {
        if(form.loading && !form.serverError){
            reload();
        }
    }, [form])

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

    return ({
        real,
        actual
    })
};
