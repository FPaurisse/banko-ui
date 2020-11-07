import * as React           from 'react';

import { useListContext }   from '@library/List/provider/useListContext';
import { ActionsStyle }     from './Actions.style';

const Actions: React.FC = () => {
    const { items, selected, selectItems, unselectItems, unselectAll, allIsChecked, loading } = useListContext();

    const handleCheck = (): void => {
        if (allIsChecked) {
            unselectItems();
        } else {
            selectItems();
        }
    }

    return (
        <ActionsStyle>
            <span>
                <input type='checkbox' disabled={ items.length === 0 || loading } onChange={ handleCheck } checked={ allIsChecked } />
                <button disabled={ selected.length < 1 || loading } onClick={ unselectAll }>Annuler</button>
            </span>
            <span>
                <button disabled={ selected.length < 1 || loading }>Approuver</button>
                <button disabled={ selected.length < 1 || loading }>À venir</button>
                <button disabled={ selected.length < 1 || loading }>Supprimer</button>
            </span>
        </ActionsStyle>
    )
}

export default Actions;
