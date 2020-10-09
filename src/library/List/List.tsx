import * as React                               from 'react';

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
                            .map((operation: OperationModel) => {
                                return (   
                                    <li key={ operation._id }>
                                        Le { operation.date } - { operation.title } : { operation.amount }€ - { operation.isPassed && '(Passée)' }
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
