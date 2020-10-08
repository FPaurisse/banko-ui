import * as React from 'react';
import { useListContextValues } from '@library/List/provider/useList';

const ListContext = React.createContext<useListContextValues<unknown>>(null);

export const useListContext = <T extends unknown> (): useListContextValues<T> => React.useContext(ListContext) as useListContextValues<T>;

type ListProps<T extends unknown> = useListContextValues<T> & {
    children: React.ReactNode;
}

export const ListContextProvider: React.FC<ListProps<unknown>> = (props) => {
    const { children, ...rest } = props;
    return (
        <ListContext.Provider value={ rest }>
            { children }
        </ListContext.Provider>
    )
};
