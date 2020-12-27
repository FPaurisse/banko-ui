import * as React from 'react';
import { useCardContextValues } from '@library/Card/provider/useCard';

const CardContext = React.createContext<useCardContextValues<unknown>>(null);

export const useCardContext = <T extends unknown> (): useCardContextValues<T> => React.useContext(CardContext) as useCardContextValues<T>;

type CardProps<T extends unknown> = useCardContextValues<T> & {
    children: React.ReactNode;
}

export const CardContextProvider: React.FC<CardProps<unknown>> = (props) => {
    const { children, ...rest } = props;
    return (
        <CardContext.Provider value={ rest }>
            { children }
        </CardContext.Provider>
    )
};
