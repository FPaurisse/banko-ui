import * as React           from 'react';

import { useListContext }   from '@library/List/provider/useListContext';
import { ActionsStyle }     from './Actions.style';

const Actions: React.FC = () => {
    const { items, selected, selectItems, unselectItems, unselectAll, allIsChecked, loading, actionBar } = useListContext();

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
                {
                    actionBar.map((action, index) => {
                        return (
                            <button
                                key={ index }
                                onClick={ () => action.provider.executeMutation({ selected }) }
                                disabled={ selected.length < 1 || loading }
                            >
                                { action.label }
                            </button>
                        )
                    })
                }
            </span>
        </ActionsStyle>
    )
}

export default Actions;
