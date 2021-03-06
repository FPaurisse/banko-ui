export interface InputProps {
    name?: string;
    label?: string;
    inverse?: string;
    error?: boolean;
    before?: string;
    isMulti?: boolean;
    after?: string;
    innerRef?: React.LegacyRef<HTMLInputElement>;
    options?: Record<string, unknown>[];
    disabled?: boolean;
}

export type InputType = 'text' | 'number' | 'date' | 'checkbox' | 'select' | 'multiselect';

export class InputDefinitionModel<T = never> {
    name: Extract<keyof T, string>;
    label?: string;
    inverse?: string;
    required?: boolean;
    isMulti?: boolean;
    before?: string;
    after?: string;
    options?: Record<string, unknown>[];
    type: InputType;
    hidden?: boolean;
    disabled?: boolean;
    
    public constructor(init?: Partial<InputDefinitionModel>) {
        Object.assign(this, init);
    }
}
