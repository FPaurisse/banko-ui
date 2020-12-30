import * as React                                       from 'react';
import { DeepMap, FieldError, useForm as useHookForm }  from 'react-hook-form';
import { CombinedError, UseMutationState }              from 'urql';
import { debounce }                                     from 'lodash';

type HookFormType = ReturnType<typeof useHookForm>;

interface HeadingsModel {
    creation: string;
    edition: string;
}

export type UseFormOptions<T> = {
    headings: HeadingsModel;
    actions: {
        create: { state: UseMutationState, executeMutation: (variables: T) => void };
        update: { state: UseMutationState, executeMutation: (variables: T) => void };
    };
    args: Partial<T>;
}

export type UseFormContextValues<T> = {
    form: HookFormType;
    entity: T;
    setEntity: React.Dispatch<React.SetStateAction<T>>;
    actions: {
        create: (variables: T) => void,
        update: (variables: T) => void
    };
    args: Partial<T>;
    inputsError: DeepMap<T, FieldError>;
    serverError: CombinedError,
    headings: HeadingsModel;
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
            setLoading(true);
        } else {
            debounced();
        }
        
    }, [creating, updating])

    return ({
        form,
        entity,
        setEntity,
        actions: {
            create,
            update
        },
        args: options.args,
        inputsError: errors,
        serverError: createError || updateError,
        headings: options.headings,
        loading
    })

};

export default useForm; 
