import * as React                                                           from 'react';
import { DeepMap, DeepPartial, FieldError, UnpackNestedValue, useForm as useReactHookForm }   from 'react-hook-form'; 
import { UseMutationState } from 'urql';

type HookFormType = ReturnType<typeof useReactHookForm>;

interface HeadingsModel {
    creation: string;
    edition: string;
}

export type UseFormOptions<T> = {
    empty: UnpackNestedValue<DeepPartial<T>>;
    headings: HeadingsModel;
    actions: Record<string, {
        state: UseMutationState<T>,
        executeMutation: (data?: Partial<T>) => void
    }>;
    args: Partial<T>;
}

export type UseFormContextValues<T> = {
    form: HookFormType;
    entity: UnpackNestedValue<DeepPartial<T>>;
    setEntity: React.Dispatch<React.SetStateAction<UnpackNestedValue<DeepPartial<T>>>>;
    reset: () => void;
    values: () => UnpackNestedValue<T>;
    inputsError: DeepMap<T, FieldError>;
    actions: Record<string, {
        state: UseMutationState<T>,
        executeMutation: (data?: Partial<T>) => void
    }>;
    headings: HeadingsModel;
    args: Partial<T>;
}

const useForm = <T extends unknown> (options: UseFormOptions<T>): UseFormContextValues<T> => {
    const [entity, setEntity]   = React.useState<UnpackNestedValue<DeepPartial<T>>>(null);
    const form = { ...useReactHookForm<T>() };

    React.useEffect(() => {
        if (entity) {
            form.reset(entity);
        } else {
            form.reset(options.empty);
        }
    }, [entity])

    return ({
        form,
        entity,
        setEntity,
        reset: form.reset,
        values: form.getValues,
        inputsError: form.errors,
        actions: options.actions,
        headings: options.headings,
        args: options.args,
    })

};

export default useForm; 
