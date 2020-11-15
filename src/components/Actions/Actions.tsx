import * as React           from 'react';

import { useListContext }   from '@library/List/provider/useListContext';
import { ActionsStyle }     from './Actions.style';

const Actions: React.FC = () => {
    const { items, selected, selectItems, unselectItems, unselectAll, allIsChecked, loading, actions } = useListContext();

    const { removeAll, updateAll } = actions;

    const handleCheck = (): void => {
        if (allIsChecked) {
            unselectItems();
        } else {
            selectItems();
        }
    }

    const handleDeleteAll = (): void => {
        removeAll({ selected });
        unselectAll();
    }

    const handleUpdateAllIsPassed = (): void => {
        updateAll({ selected, isPassed: true });
        unselectAll();
    }

    const handleUpdateAllIsNotPassed = (): void => {
        updateAll({ selected, isPassed: false });
        unselectAll();
    }

    return (
        <ActionsStyle>
            <span>
                <input type='checkbox' disabled={ items.length === 0 || loading } onChange={ handleCheck } checked={ allIsChecked } />
                <button disabled={ selected.length < 1 || loading } onClick={ unselectAll }>Annuler</button>
            </span>
            <span>
                <button onClick={ handleUpdateAllIsPassed } disabled={ selected.length < 1 || loading }>Approuver</button>
                <button onClick={ handleUpdateAllIsNotPassed } disabled={ selected.length < 1 || loading }>À venir</button>
                <button onClick={ handleDeleteAll } disabled={ selected.length < 1 || loading }>Supprimer</button>
            </span>
        </ActionsStyle>
    )
}

export default Actions;
