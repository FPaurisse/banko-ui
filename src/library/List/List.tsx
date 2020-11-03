import * as React           from 'react';

import { OperationModel }   from '@models/OperationModel';

import { useListContext }   from '@library/List/provider/useListContext';
import { useFormContext }   from '@library/Form/provider/useFormContext';

import { usePeriodContext } from '@providers/period/usePeriodContext';

const List: React.FC = () => {
    const { list, actions } = useListContext();
    const { setEntity }     = useFormContext();
    const period            = usePeriodContext();

    const handleDelete = (_id: string): void => {
        actions.remove({ variables: { _id } });
    }

    const handleUpdate = (operation: OperationModel): void => {
        setEntity(operation);
    }

    return (
        <React.Fragment>
            <p>{ period.month } / { period.year }</p>
            {
                <ul>
                    {
                        list.length > 0 ?
                            list
                                .map((operation: OperationModel) => {
                                    const { _id, title, amount, date, isCredit, isPassed } = operation;
                                    return (   
                                        <li key={ _id } style={ { color: isCredit ? 'green' : 'red' } }>
                                        Le { date } - { title } : { amount }€ - { isPassed && '(Passée)' }
                                            <button onClick={ () => handleDelete(_id) }>Supprimer</button>
                                            <button onClick={ () => handleUpdate(operation) }>Modifier</button>
                                        </li>
                                    )
                                })
                            : 'Aucune opération'
                    }
                </ul>

            }
        </React.Fragment>
    )
};

export default List;
