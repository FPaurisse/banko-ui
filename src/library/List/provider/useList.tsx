import * as React                                                               from 'react';
import { APIError, FetchData, Result, UseClientRequestResult, UseQueryOptions } from 'graphql-hooks';

import { RemoveReturn }                                                         from '@service/useOperations';

export type useListContextValues<T> = {
    list: T[];
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
    actions: ActionsModel;
    loading: boolean;
    listReload: (options?: UseQueryOptions) => Promise<UseClientRequestResult<UseQueryOptions>>;
}

export const useList = <T extends unknown>({ listing, actions, loading, listReload }: useListProps<T>): useListContextValues<T> => {
    const [list, setList] = React.useState<T[]>([])
    const { remove, removing, removeError } = actions.remove;

    React.useEffect(() => {
        if (listing) {
            setList(listing);
        }
    }, [listing])

    React.useEffect(() => {
        if (loading || removing) {
            listReload();
        }
    }, [loading, removing])

    return ({
        list,
        actions: {
            remove
        },
        serverError: removeError,
        loading: removing || loading
    })
};
