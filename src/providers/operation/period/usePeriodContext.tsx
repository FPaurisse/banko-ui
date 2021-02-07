import * as React from 'react';
import { PeriodContextValues } from './usePeriod';

const PeriodContext = React.createContext<PeriodContextValues>(null);

export const usePeriodContext = (): PeriodContextValues => {
    return React.useContext(PeriodContext);
};

type PeriodContextProps = PeriodContextValues & {
    children: React.ReactNode;
};

export const PeriodContextProvider = (props: PeriodContextProps): JSX.Element => {
    const { children, ...rest } = props;
    return (
        <PeriodContext.Provider value={ rest }>{ children }</PeriodContext.Provider>
    );
};
