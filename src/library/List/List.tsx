import * as React           from 'react';

import { OperationModel }   from '@models/OperationModel';
import { useListContext }   from '@library/List/provider/useListContext';
import { useFormContext }   from '@library/Form/provider/useFormContext';

const List: React.FC = () => {

    const { items, actions, selected, selectOne }   = useListContext();
    const { setEntity }                             = useFormContext();

    const handleDelete = (_id: string): void => {
        actions.remove({ variables: { _id } });
    }

    const handleUpdate = (operation: OperationModel): void => {
        setEntity(operation);
    }

    React.useEffect(() => {
        if (selected.length > 0) {
            setEntity(null);
        }
    }, [selected])

    return (
        <React.Fragment>
            {
                items.length > 0 ?
                    items
                        .map((operation: OperationModel) => {
                            const { _id, title, amount, date, isCredit, isPassed } = operation;
                            return (   
                                <label htmlFor={ _id } key={ _id } style={ { display: 'flex', color: isCredit ? 'green' : 'red' } }>
                                            
                                    <input type='checkbox' id={ _id } onChange={ () => selectOne(_id) } checked={ selected.includes(_id) } />
                                            
                                            Le { date } - { title } : { amount }€ { isPassed && '- (Passée)' }

                                    <button disabled={ selected.length > 0 } onClick={ () => handleDelete(_id) }>Supprimer</button>
                                    <button disabled={ selected.length > 0 } onClick={ () => handleUpdate(operation) }>Modifier</button>
                                                    
                                </label>
                            )
                        })
                    : <p>Aucune opération</p>

            }
        </React.Fragment>
    )
};

export default List;
