import * as React                               from 'react';

import { usePeriodContext }                     from '@providers/period/usePeriodContext';
import { useListContext } from './provider/useListContext';
import { OperationModel } from '@models/OperationModel';
import { Link } from '@reach/router';

const List: React.FC = () => {
    const period = usePeriodContext();
    const vm = useListContext();

    const handleDelete = (_id: string): void => {
        vm.actions.remove({ variables: { _id } });
    }

    return (
        <React.Fragment>
            <p>{ period.month } / { period.year }</p>
            {
                <ul>
                    {
                        vm.list
                            .map((operation: OperationModel) => {
                                const { _id, title, amount, date, isCredit, isPassed } = operation;
                                return (   
                                    <li key={ _id } style={ { color: isCredit ? 'green' : 'red' } }>
                                        Le { date } - { title } : { amount }€ - { isPassed && '(Passée)' }
                                        <button onClick={ () => handleDelete(_id) }>Supprimer</button>
                                        <Link to={ `/operations/${_id}` }>Modifier</Link>
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
