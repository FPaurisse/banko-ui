export class FormFieldModel<T = never> {
    name?: Extract<keyof T, string> | string;
    label?: string;
    
    public constructor(init?: Partial<FormFieldModel>) {
        Object.assign(this, init);
    }
}
