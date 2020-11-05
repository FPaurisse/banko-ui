import * as React                       from 'react';
import { Router, Redirect }             from '@reach/router';
import { ClientContext, GraphQLClient } from 'graphql-hooks';
import memCache                         from 'graphql-hooks-memcache';

import { ThemeContextProvider }         from '@providers/theme/useThemeContext';
import { useTheme }                     from '@providers/theme/useTheme';

import Operations                       from '@components/Operations';
import { AppStyle, MainStyle, HeaderStyle } from './App.style';

const client = new GraphQLClient({ url: process.env.API_URL, cache: memCache() })

const App: React.FC = () => {
    const vm = useTheme();

    return (
        <ClientContext.Provider value={ client }>
            <ThemeContextProvider { ...vm }>
                <AppStyle>
                    <HeaderStyle />
                    <Router component={ MainStyle }>
                        <Redirect noThrow from='/' to='/operations' />
                        <Operations path="/operations" />
                    </Router>
                </AppStyle>
            </ThemeContextProvider>
        </ClientContext.Provider>
    );
};

export default App;
