import * as React                                   from 'react';
import { debounce, intersection, isEqual, without } from 'lodash';
import { CombinedError }                            from 'urql';

export type useTagContextValues<T> = {
    items: T[];
    selected: string[];
    selectItem: (id: string) => void;
    unselectItem: (id: string) => void;
    selectItems: () => void;
    unselectItems: () => void;
    unselectAll: () => void;
    allIsChecked: boolean;
    actions: {
        remove: (variables: Record<string, unknown>) => void,
        removeAll: (variables: Record<string, unknown>) => void,
        updateAll: (variables: Record<string, unknown>) => void,
    };
    serverError: CombinedError;
    loading: boolean;
}

interface ActionsModel {
    delete: () => void;
    deleteAll?: () => void;
    updateAll?: () => void;
}

interface useTagProps<T> {
    tags: T[];
    indexes: string[];
    error: CombinedError;
    actions?: ActionsModel;
    reloading: boolean;
}

export const useTag = <T extends unknown>({ tags, indexes, error, actions, reloading }: useTagProps<T>): useTagContextValues<T> => {
    const [items, setItems] = React.useState<T[]>([]);
    const [selected, setSelected] = React.useState<string[]>([]);
    const [allIsChecked, setAllIsChecked] = React.useState<boolean>(false);
    const [loading, setLoading] = React.useState<boolean>(false);

    const selectItems = (): void => {
        setSelected([...selected, ...indexes]);
    }

    const unselectItems = (): void => {
        setSelected(without(selected, ...indexes));
    }

    const unselectAll = (): void => {
        setSelected([]);
    }
    
    const selectItem = (id: string): void => {
        setSelected([id, ...selected]);
    }

    const unselectItem = (id: string): void => {
        setSelected(without(selected, id));
    }

    React.useEffect(() => {
        if (tags) {
            setItems(tags);
        }
    }, [tags])

    React.useEffect(() => {
        if (indexes.length > 0 && isEqual(intersection(selected, indexes), indexes)) {
            setAllIsChecked(true);
        } else {
            setAllIsChecked(false);
        }
    }, [indexes, selected])

    React.useEffect(() => {
        const debounced = debounce(() => setLoading(false), 500);
        if (reloading) {
            setLoading(true)
        } else (
            debounced()
        )
    }, [reloading])

    return ({
        items,
        selected,
        selectItem,
        unselectItem,
        selectItems,
        unselectItems,
        unselectAll,
        allIsChecked,
        actions: {
            remove: actions.delete,
            removeAll: actions.deleteAll,
            updateAll: actions.updateAll
        },
        serverError: error,
        loading: loading
    })
};
