import * as React from 'react';
import { CreateReturn, UpdateReturn } from '@service/useOperations';
import { APIError, FetchData, Result } from 'graphql-hooks';
import { DeepMap, FieldError, useForm as useHookForm } from 'react-hook-form';

export type UseFormOptions<T> = {
    actions: {
        create: () => CreateReturn<T>;
        update: (entity: T) => UpdateReturn<T>;
    };
}

type HookFormType = ReturnType<typeof useHookForm>;

export type UseFormContextValues<T> = {
    form: HookFormType;
    entity: T;
    setEntity: React.Dispatch<React.SetStateAction<T>>;
    actions: {
        create: FetchData<Result, T>,
        update: FetchData<Result, T>
    };
    inputsError: DeepMap<T, FieldError>;
    serverError: APIError,
    loading: boolean
}

const useForm = <T extends unknown> (options: UseFormOptions<T>): UseFormContextValues<T> => {
    const [entity, setEntity]   = React.useState<T>(null);
    const form = { ...useHookForm<T>() };
    const { errors } = form;

    const { create, creating, createError } = options.actions.create();
    const { update, updating, updateError } = options.actions.update(entity);

    React.useEffect(() => {
        if (creating || updating) {
            form.reset();
        }
    }, [creating, updating])

    return ({
        form,
        entity: entity,
        setEntity: setEntity,
        actions: {
            create,
            update
        },
        inputsError: errors,
        serverError: createError || updateError,
        loading: creating || updating
    })

};

export default useForm; 
