import * as React                                       from 'react';
import { debounce, intersection, isEqual, without }     from 'lodash';
import { CombinedError }                                from 'urql';

interface ActionModel<T> {
    label?: string;
    provider?: (data?: Partial<T>) => void;
    setEntity?: React.Dispatch<React.SetStateAction<T>>;
}

interface useListProps<T> {
    listing: T[];
    indexes: string[];
    error: CombinedError;
    actionRow?: ActionModel<T>[];
    actionBar?: ActionModel<T>[];
    reloading: boolean;
}

export type useListContextValues<T> = {
    items: T[];
    selected: string[];
    selectItem: (id: string) => void;
    unselectItem: (id: string) => void;
    selectItems: () => void;
    unselectItems: () => void;
    unselectAll: () => void;
    allIsChecked: boolean;
    actionRow?: ActionModel<T>[];
    actionBar?: ActionModel<T>[];
    serverError: CombinedError;
    loading: boolean;
}

export const useList = <T extends unknown>({ listing, indexes, error, actionRow, actionBar, reloading }: useListProps<T>): useListContextValues<T> => {
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
        if (listing) {
            setItems(listing);
        }
    }, [listing])

    React.useEffect(() => {
        if (indexes && indexes.length > 0 && isEqual(intersection(selected, indexes), indexes)) {
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
        actionRow,
        actionBar,
        serverError: error,
        loading: loading
    })
};
