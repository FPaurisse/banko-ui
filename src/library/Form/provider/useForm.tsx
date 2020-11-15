import * as React                                       from 'react';
import { DeepMap, FieldError, useForm as useHookForm }  from 'react-hook-form';
import { CombinedError, UseMutationState }              from 'urql';
import { debounce }                                     from 'lodash';

export type UseFormOptions<T> = {
    actions: {
        create: { state: UseMutationState, executeMutation: (variables: T) => void };
        update: { state: UseMutationState, executeMutation: (variables: T) => void };
    };
}

type HookFormType = ReturnType<typeof useHookForm>;

export type UseFormContextValues<T> = {
    form: HookFormType;
    entity: T;
    setEntity: React.Dispatch<React.SetStateAction<T>>;
    actions: {
        create: (variables: T) => void,
        update: (variables: T) => void
    };
    inputsError: DeepMap<T, FieldError>;
    serverError: CombinedError,
    loading: boolean
}

const useForm = <T extends unknown> (options: UseFormOptions<T>): UseFormContextValues<T> => {
    const [entity, setEntity]   = React.useState<T>(null);
    const [loading, setLoading] = React.useState<boolean>(false);
    const form = { ...useHookForm<T>() };
    const { errors } = form;

    const { state: { error: createError, fetching: creating }, executeMutation: create } = options.actions.create;
    const { state: { error: updateError, fetching: updating }, executeMutation: update } = options.actions.update;

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
