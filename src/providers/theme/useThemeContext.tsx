import * as React from 'react';
import { ThemeContextValues } from './useTheme';

const ThemeContext = React.createContext<ThemeContextValues>(null);

export const useThemeContext = (): ThemeContextValues => {
    return React.useContext(ThemeContext);
};

type ThemeContextProps = ThemeContextValues & {
    children: React.ReactNode;
};

export const ThemeContextProvider = (props: ThemeContextProps): JSX.Element => {
    const { children, ...rest } = props;
    return (
        <ThemeContext.Provider value={ rest }>{ children }</ThemeContext.Provider>
    );
};
