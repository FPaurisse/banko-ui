import * as React from 'react';
import { CreateReturn } from '@service/useOperations';
import { APIError, FetchData, Result } from 'graphql-hooks';
import { useForm as useHookForm } from 'react-hook-form';

export type UseFormOptions<T> = {
    initial: T;
    actions: {
        create: () => CreateReturn<T>;
    };
}

type HookFormType = ReturnType<typeof useHookForm>;

export type UseFormContextValues<T> = {
    form: HookFormType;
    entity: T;
    actions: {
        create: FetchData<Result, T>
    };
    error: APIError,
    loading: boolean
}

const useForm = <T extends unknown> (options: UseFormOptions<T>): UseFormContextValues<T> => {
    const [entity, setEntity] = React.useState<T>(null);

    const form = { ...useHookForm<T>() };

    const { create, error, loading } = options.actions.create();

    React.useEffect(() => {
        setEntity(options.initial)
    }, [])

    return ({
        form,
        entity: entity,
        actions: {
            create
        },
        error: error,
        loading: loading
    })

};

export default useForm; 
