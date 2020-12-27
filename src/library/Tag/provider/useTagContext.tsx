import * as React from 'react';
import { useTagContextValues } from '@library/Tag/provider/useTag';

const TagContext = React.createContext<useTagContextValues<unknown>>(null);

export const useTagContext = <T extends unknown> (): useTagContextValues<T> => React.useContext(TagContext) as useTagContextValues<T>;

type TagProps<T extends unknown> = useTagContextValues<T> & {
    children: React.ReactNode;
}

export const TagContextProvider: React.FC<TagProps<unknown>> = (props) => {
    const { children, ...rest } = props;
    return (
        <TagContext.Provider value={ rest }>
            { children }
        </TagContext.Provider>
    )
};
