import * as React                       from 'react';
import { Router, Redirect }             from '@reach/router';

import { ThemeContextProvider }         from '@providers/theme/useThemeContext';
import { useTheme }                     from '@providers/theme/useTheme';

import Operations from '@components/Operations';

import { AppStyle, MainStyle, HeaderStyle } from './App.style';

const App: React.FC = () => {
    const vm = useTheme();

    return (
        <ThemeContextProvider { ...vm }>
            <AppStyle>
                <HeaderStyle />
                <Router component={ MainStyle }>
                    <Redirect noThrow from='/' to='/operations' />
                    <Operations path="/operations" />
                </Router>
            </AppStyle>
        </ThemeContextProvider>
    );
};

export default App;
