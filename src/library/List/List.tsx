import * as React           from 'react';
import moment               from 'moment';

import { OperationModel }   from '@models/OperationModel';

import { useListContext }   from '@library/List/provider/useListContext';

import { ListStyle, Item, ItemCheck, ItemDetail, ItemActions, Loading } from './List.style';

const List: React.FC = () => {

    const { items, actions, selected, selectItem, unselectItem, loading }   = useListContext();

    const handleDelete = (_id: string): void => {
        actions.remove({ _id });
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
                loading
                    ? <Loading>Chargement...</Loading>
                    : items.length > 0 ?
                        items
                            .map((operation: OperationModel) => {
                                const { _id, title, amount, date, isCredit, isPassed } = operation;
                                return (   
                                    <Item key={ _id } $isPassed={ isPassed } $isChecked={ selected.includes(_id) }>
                                        <ItemCheck onClick={ () => handleCheck(_id) } $isChecked={ selected.includes(_id) }>
                                            { selected.includes(_id) ? '✓' : '' }
                                        </ItemCheck>
                                        <ItemDetail onClick={ () => handleCheck(_id) }>
                                            { moment(date).format('DD') }
                                            <span style={ { color: isCredit ? '#7BC0A3' : '#E97A7A' } }>{ amount }€</span>
                                            { title }
                                        </ItemDetail>
                                        <ItemActions>
                                            <button disabled={ selected.length > 0 } onClick={ () => handleDelete(_id) }>Supprimer</button>
                                        </ItemActions>
                                    </Item>
                                )
                            })
                        : <Loading>Aucune opération</Loading>
            
            }
            
        </ListStyle>
    )
};

export default List;
