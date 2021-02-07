import * as React               from 'react';
import { TotalContextValues }   from '@providers/operation/total/useTotal';

const TotalContext = React.createContext<TotalContextValues>(null);

export const useTotalContext = (): TotalContextValues => {
    return React.useContext(TotalContext);
};

type TotalContextProps = TotalContextValues & {
    children: React.ReactNode;
};

export const TotalContextProvider: React.FC<TotalContextProps> = (props): JSX.Element => {
    const { children, ...rest } = props;
    
    return (
        <TotalContext.Provider value={ rest }>
            { children }
        </TotalContext.Provider>
    )
};
