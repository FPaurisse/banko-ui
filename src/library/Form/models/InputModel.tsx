export interface InputProps {
    name?: string;
    error?: boolean;
    operator?: string;
    innerRef?: React.LegacyRef<HTMLInputElement>;
}

export type InputType = 'text' | 'number' | 'date' | 'checkbox';

export class InputDefinitionModel<T = never> {
    name: Extract<keyof T, string>;
    required?: boolean;
    operator?: string;
    type: InputType;
    label?: string;
    
    public constructor(init?: Partial<InputDefinitionModel>) {
        Object.assign(this, init);
    }
}
