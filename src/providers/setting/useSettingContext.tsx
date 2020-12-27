import * as React from 'react';
import { SettingContextValues } from './useSetting';

const SettingContext = React.createContext<SettingContextValues>(null);

export const useSettingContext = (): SettingContextValues => {
    return React.useContext(SettingContext);
};

type SettingContextProps = SettingContextValues & {
    children: React.ReactNode;
};

export const SettingContextProvider = (props: SettingContextProps): JSX.Element => {
    const { children, ...rest } = props;
    return (
        <SettingContext.Provider value={ rest }>{ children }</SettingContext.Provider>
    );
};
