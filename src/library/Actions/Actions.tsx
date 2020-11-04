import * as React                   from 'react';

import { useListContext }           from '@library/List/provider/useListContext';
import Navigation                   from '@library/Navigation/Navigation';

const Actions: React.FC = () => {
    const { list, checklist, checkAll, uncheck, allIsChecked } = useListContext();

    const handleCheck = (): void => {
        if (allIsChecked) {
            uncheck();
        } else {
            checkAll();
        }
    }

    return (
        <React.Fragment>
            <Navigation />
            <p>
                <React.Fragment>
                    <input type='checkbox' disabled={ list.length === 0 } onChange={ handleCheck } checked={ allIsChecked } />
                    <button disabled={ checklist.length < 1 }>Supprimer</button>
                    <button disabled={ checklist.length < 1 }>En attente</button>
                    <button disabled={ checklist.length < 1 }>Passées</button>
                    <span>|</span>
                    <button disabled={ checklist.length < 1 } onClick={ uncheck }>Annuler</button>
                </React.Fragment>
            </p>
        </React.Fragment>
    )
}

export default Actions;
