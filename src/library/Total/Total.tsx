import * as React from 'react';
import moment from 'moment';
import { sum } from 'lodash';
import { useListContext } from '@library/List/provider/useListContext';
import { OperationModel } from '@models/OperationModel';
import { usePeriodContext } from '@providers/period/usePeriodContext';

const Total: React.FC = () => {
    const vm = useListContext();
    const period = usePeriodContext();

    return (
        <React.Fragment>
            Actuel : 
            { sum(vm.list
                .filter((operation: OperationModel) => 
                    operation.isPassed &&
                    moment(new Date(operation.date)).format('MM') <= period.month
                    && moment(new Date(operation.date)).format('YYYY') <= period.year
                )
                .map((operation: OperationModel) => parseFloat(operation.amount.replace(',', '.')))
            ) } €
            <br />
            Réel : 
            { sum(vm.list
                .filter((operation: OperationModel) => 
                    moment(new Date(operation.date)).format('MM') <= period.month
                    && moment(new Date(operation.date)).format('YYYY') <= period.year
                )
                .map((operation: OperationModel) => parseFloat(operation.amount.replace(',', '.')))
            ) } €
        </React.Fragment>
    );
};

export default Total;
