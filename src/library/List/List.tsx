import * as React from 'react';
import moment from 'moment';

import { OperationModel }   from '@models/OperationModel';
import { useListContext }   from '@library/List/provider/useListContext';
import { useFormContext }   from '@library/Form/provider/useFormContext';
import { ListStyle, Item, ItemCheck, ItemDetail, ItemActions } from './List.style';

const List: React.FC = () => {

    const { items, actions, selected, selectItem, unselectItem }   = useListContext();
    const { setEntity }                             = useFormContext();

    const handleDelete = (_id: string): void => {
        actions.remove({ variables: { _id } });
    }

    const handleUpdate = (operation: OperationModel): void => {
        setEntity(operation);
    }

    const handleCheck = (_id: string): void => {
        if (selected.includes(_id)) {
            unselectItem(_id);
        } else {
            selectItem(_id);
        }
    }

    return (
        <ListStyle>
            {
                items.length > 0 ?
                    items
                        .map((operation: OperationModel) => {
                            const { _id, title, amount, date, isCredit, isPassed } = operation;
                            return (   
                                <Item key={ _id } $isPassed={ isPassed } $isSelected={ selected.includes(_id) }>
                                    <ItemCheck onClick={ () => handleCheck(_id) } $isSelected={ selected.includes(_id) }>
                                        { selected.includes(_id) ? '✓' : '' }
                                    </ItemCheck>
                                    <ItemDetail onClick={ () => handleCheck(_id) }>
                                        { moment(date).format('DD') }
                                        <span style={ { color: isCredit ? '#7BC0A3' : '#E97A7A' } }>{ amount }€</span>
                                        { title }
                                    </ItemDetail>
                                    <ItemActions>
                                        <button disabled={ selected.length > 0 } onClick={ () => handleUpdate(operation) }>Modifier</button>
                                        <button disabled={ selected.length > 0 } onClick={ () => handleDelete(_id) }>Supprimer</button>
                                    </ItemActions>
                                </Item>
                            )
                        })
                    : <Item>Aucune opération</Item>

            }
        </ListStyle>
    )
};

export default List;
