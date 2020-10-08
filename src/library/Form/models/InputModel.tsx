export interface InputProps {
    innerRef: React.LegacyRef<HTMLInputElement>;
    name: string;
    error: boolean;
}

export type InputType = 'text' | 'date';

export class InputDefinitionModel<T = never> {
    name: Extract<keyof T, string>;
    type: InputType;
    label?: string;
    
    public constructor(init?: Partial<InputDefinitionModel>) {
        Object.assign(this, init);
    }
}
