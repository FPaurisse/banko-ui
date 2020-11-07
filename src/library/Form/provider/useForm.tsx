import * as React                                       from 'react';
import { APIError, FetchData, Result }                  from 'graphql-hooks';
import { DeepMap, FieldError, useForm as useHookForm }  from 'react-hook-form';

import { CreateReturn, UpdateReturn }                   from '@service/useOperations';
import { debounce } from 'lodash';

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
    const [loading, setLoading] = React.useState<boolean>(false);
    const form = { ...useHookForm<T>() };
    const { errors } = form;

    const { create, creating, createError } = options.actions.create();
    const { update, updating, updateError } = options.actions.update(entity);

    React.useEffect(() => {
        const debounced = debounce(() => setLoading(false), 500);
        if (creating || updating) {
            form.reset();
            setEntity(null);
            setLoading(true)
        } else (
            debounced()
        )
    }, [creating, updating])

    return ({
        form,
        entity,
        setEntity,
        actions: {
            create,
            update
        },
        inputsError: errors,
        serverError: createError || updateError,
        loading
    })

};

export default useForm; 
