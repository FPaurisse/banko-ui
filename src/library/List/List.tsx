import * as React           from 'react';

import { OperationModel }   from '@models/OperationModel';

import { useListContext }   from '@library/List/provider/useListContext';
import { useFormContext }   from '@library/Form/provider/useFormContext';

const List: React.FC = () => {

    const { list, actions, checklist, selectOne }  = useListContext();
    const { setEntity }                         = useFormContext();

    const handleDelete = (_id: string): void => {
        actions.remove({ variables: { _id } });
    }

    const handleUpdate = (operation: OperationModel): void => {
        setEntity(operation);
    }

    return (
        <React.Fragment>
            {
                list.length > 0 ?
                    list
                        .map((operation: OperationModel) => {
                            const { _id, title, amount, date, isCredit, isPassed } = operation;
                            return (   
                                <label htmlFor={ _id } key={ _id } style={ { display: 'flex', color: isCredit ? 'green' : 'red' } }>
                                            
                                    <input type='checkbox' id={ _id } onChange={ () => selectOne(_id) } checked={ checklist.includes(_id) } />
                                            
                                            Le { date } - { title } : { amount }€ { isPassed && '- (Passée)' }

                                    <button disabled={ checklist.length > 0 } onClick={ () => handleDelete(_id) }>Supprimer</button>
                                    <button disabled={ checklist.length > 0 } onClick={ () => handleUpdate(operation) }>Modifier</button>
                                                    
                                </label>
                            )
                        })
                    : <p>Aucune opération</p>

            }
        </React.Fragment>
    )
};

export default List;
