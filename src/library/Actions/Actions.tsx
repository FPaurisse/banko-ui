import * as React                   from 'react';

import { useListContext }           from '@library/List/provider/useListContext';
import Navigation                   from '@library/Navigation/Navigation';
import { ActionsStyle } from './Actions.style';

const Actions: React.FC = () => {
    const { items, selected, selectItems, unselectItems, unselectAll, allIsChecked } = useListContext();

    const handleCheck = (): void => {
        if (allIsChecked) {
            unselectItems();
        } else {
            selectItems();
        }
    }

    return (
        <React.Fragment>
            <Navigation />
            <ActionsStyle>
                <input type='checkbox' disabled={ items.length === 0 } onChange={ handleCheck } checked={ allIsChecked } />
                <button disabled={ selected.length < 1 }>Supprimer</button>
                <button disabled={ selected.length < 1 }>En attente</button>
                <button disabled={ selected.length < 1 }>Passées</button>
                <span>|</span>
                <button disabled={ selected.length < 1 } onClick={ unselectAll }>Annuler</button>
            </ActionsStyle>
        </React.Fragment>
    )
}

export default Actions;
