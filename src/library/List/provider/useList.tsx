import { APIError, FetchData, Result } from 'graphql-hooks'
import { RemoveReturn } from '@service/useOperations';

export type useListContextValues<T> = {
    list: T[];
    actions: {
        remove: FetchData<Result, Record<string, unknown>>
    };
    serverError: APIError,
    loading: boolean
}

interface ActionsModel {
    remove: RemoveReturn
}

interface useListProps<T> {
    listing: T[];
    actions: ActionsModel;
}

export const useList = <T extends unknown>({ listing, actions }: useListProps<T>): useListContextValues<T> => {
    const { remove, loading, error } = actions.remove;

    return ({
        list: listing,
        actions: {
            remove
        },
        serverError: error,
        loading
    })
};
