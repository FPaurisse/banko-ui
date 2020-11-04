import * as React                                                               from 'react';
import { intersection, isEqual, without }                                       from 'lodash';
import { APIError, FetchData, Result, UseClientRequestResult, UseQueryOptions } from 'graphql-hooks';

import { RemoveReturn }                                                         from '@service/useOperations';
import { OperationModel } from '@models/OperationModel';

export type useListContextValues<T> = {
    list: T[];
    checklist: string[];
    selectOne: (id: string) => void;
    selectList: () => void;
    unselectList: () => void;
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

export const useList = <T extends OperationModel>({ listing, indexes, actions, loading, listReload }: useListProps<T>): useListContextValues<T> => {
    const [list, setList] = React.useState<T[]>([]);
    const [checklist, setChecklist] = React.useState<string[]>([]);
    const [allIsChecked, setAllIsChecked] = React.useState<boolean>(false);
    const { remove, removing, removeError } = actions.remove;

    const selectList = (): void => {
        setChecklist([...checklist, ...indexes]);
    }

    const unselectList = (): void => {
        setChecklist(without(checklist, ...indexes));
    }

    const unselectAll = (): void => {
        setChecklist([]);
    }
    
    const selectOne = (id: string): void => {
        if (checklist.includes(id)) {
            setChecklist(without(checklist, id));
        } else {
            setChecklist([id, ...checklist]);
        }
    }

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

    React.useEffect(() => {
        if (indexes.length > 0 && isEqual(intersection(checklist, indexes), indexes)) {
            setAllIsChecked(true);
        } else {
            setAllIsChecked(false);
        }
    }, [indexes, checklist])

    return ({
        list,
        checklist,
        selectOne,
        selectList,
        unselectList,
        unselectAll,
        allIsChecked,
        actions: {
            remove
        },
        serverError: removeError,
        loading: removing || loading
    })
};
