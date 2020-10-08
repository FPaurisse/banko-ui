import * as React from 'react';
import { UseFormContextValues } from './useForm';

export const FormContext = React.createContext<UseFormContextValues<unknown>>(null);

export const useFormContext = <T extends unknown> (): UseFormContextValues<T> => React.useContext(FormContext) as UseFormContextValues<T>;

type FormProps<T extends unknown> = UseFormContextValues<T> & {
    children: React.ReactNode;
}

export const FormContextProvider: React.FC<FormProps<unknown>> = (props) => {
    const { children, ...rest } = props;

    return (
        <FormContext.Provider value={ rest }>
            { children }
        </FormContext.Provider>
    )
} 
