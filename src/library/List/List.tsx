import * as React                               from 'react';
import moment                                   from 'moment';

import { usePeriodContext }                     from '@providers/period/usePeriodContext';
import { useListContext } from './provider/useListContext';
import { OperationModel } from '@models/OperationModel';

const List: React.FC = () => {
    const period = usePeriodContext();
    const vm = useListContext();

    return (
        <React.Fragment>
            <p>{ period.month } / { period.year }</p>
            {
                <ul>
                    {
                        vm.list
                            .filter((operation: OperationModel) => 
                                moment(new Date(operation.date)).format('MM') === period.month
                                && moment(new Date(operation.date)).format('YYYY') === period.year
                            )
                            .map((operation: OperationModel) => {
                                return (   
                                    <li key={ operation._id }>
                                        { operation.title } - { operation.amount } - { operation.date }
                                        <button onClick={ () => vm.actions.remove({ variables: { _id: operation._id } }) }>delete</button>
                                    </li>
                                )
                            })
                    }
                </ul>

            }
        </React.Fragment>
    )
};

export default List;
