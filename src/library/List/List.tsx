import * as React from 'react';
import moment from 'moment';

import { OperationModel }   from '@models/OperationModel';
import { useListContext }   from '@library/List/provider/useListContext';
import { useFormContext }   from '@library/Form/provider/useFormContext';
import { ListStyle, Item } from './List.style';

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
        <ListStyle>
            {
                items.length > 0 ?
                    items
                        .map((operation: OperationModel) => {
                            const { _id, title, amount, date, isCredit, isPassed } = operation;
                            return (   
                                <Item key={ _id } htmlFor={ _id } style={ { display: 'flex', color: isCredit ? 'green' : 'red' } }>
                                    <span>
                                        <input type='checkbox' id={ _id } onChange={ () => selectOne(_id) } checked={ selected.includes(_id) } />
                                        { moment(date).format('DD') } - { title } : { amount }€ { isPassed && '- (Passée)' }
                                    </span>
                                    <span>
                                        <button disabled={ selected.length > 0 } onClick={ () => handleUpdate(operation) }>Modifier</button>
                                        <button disabled={ selected.length > 0 } onClick={ () => handleDelete(_id) }>Supprimer</button>
                                    </span>
                                                    
                                </Item>
                            )
                        })
                    : <Item>Aucune opération</Item>

            }
        </ListStyle>
    )
};

export default List;
