import * as React                                                           from 'react';
import { DeepMap, FieldError, UnpackNestedValue, useForm as useHookForm }   from 'react-hook-form'; 
import { UseMutationState } from 'urql';

type HookFormType = ReturnType<typeof useHookForm>;

interface HeadingsModel {
    creation: string;
    edition: string;
}

export type UseFormOptions<T> = {
    headings: HeadingsModel;
    actions: Record<string, {
        state: UseMutationState<T>,
        executeMutation: (data?: Partial<T>) => void
    }>;
    args: Partial<T>;
}

export type UseFormContextValues<T> = {
    form: HookFormType;
    entity: T;
    setEntity: React.Dispatch<React.SetStateAction<T>>;
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
    const [entity, setEntity]   = React.useState<T>(null);
    const form = { ...useHookForm<T>() };

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
