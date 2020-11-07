export interface InputProps {
    name?: string;
    label?: string;
    inverse?: string;
    error?: boolean;
    before?: string;
    after?: string;
    innerRef?: React.LegacyRef<HTMLInputElement>;
}

export type InputType = 'text' | 'number' | 'date' | 'checkbox';

export class InputDefinitionModel<T = never> {
    name: Extract<keyof T, string>;
    label?: string;
    inverse?: string;
    required?: boolean;
    before?: string;
    after?: string;
    type: InputType;
    hidden?: boolean;
    
    public constructor(init?: Partial<InputDefinitionModel>) {
        Object.assign(this, init);
    }
}
