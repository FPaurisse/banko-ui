import * as React                                                               from 'react';
import { intersection, isEqual, without }                                       from 'lodash';
import { APIError, FetchData, Result, UseClientRequestResult, UseQueryOptions } from 'graphql-hooks';

import { RemoveReturn }                                                         from '@service/useOperations';

export type useListContextValues<T> = {
    items: T[];
    selected: string[];
    selectItem: (id: string) => void;
    unselectItem: (id: string) => void;
    selectItems: () => void;
    unselectItems: () => void;
    unselectAll: () => void;
    allIsChecked: boolean;
    actions: {
        remove: FetchData<Result, Record<string, unknown>>,
    };
    serverError: APIError,
    loading: boolean
}

interface ActionsModel {
    remove: RemoveReturn,
}

interface useListProps<T> {
    listing: T[];
    indexes: string[];
    actions: ActionsModel;
    loading: boolean;
    listReload: (options?: UseQueryOptions) => Promise<UseClientRequestResult<UseQueryOptions>>;
}

export const useList = <T extends unknown>({ listing, indexes, actions, loading, listReload }: useListProps<T>): useListContextValues<T> => {
    const [items, setItems] = React.useState<T[]>([]);
    const [selected, setSelected] = React.useState<string[]>([]);
    const [allIsChecked, setAllIsChecked] = React.useState<boolean>(false);
    const { remove, removing, removeError } = actions.remove;

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
        if (loading || removing) {
            listReload();
        }
    }, [loading, removing])

    React.useEffect(() => {
        if (indexes.length > 0 && isEqual(intersection(selected, indexes), indexes)) {
            setAllIsChecked(true);
        } else {
            setAllIsChecked(false);
        }
    }, [indexes, selected])

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
            remove
        },
        serverError: removeError,
        loading: loading || removing
    })
};
