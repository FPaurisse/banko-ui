import * as React                       from 'react';
import { Router, Redirect }             from '@reach/router';
import { ClientContext, GraphQLClient } from 'graphql-hooks';
import memCache                         from 'graphql-hooks-memcache';

import { ThemeContextProvider }         from '@providers/theme/useThemeContext';
import { useTheme }                     from '@providers/theme/useTheme';

import Operations                       from '@components/Operations';
import { Layout, Accordion, Element }   from '@library/Element';

const client = new GraphQLClient({ url: process.env.API_URL, cache: memCache() })

const App: React.FC = () => {
    const vm = useTheme();

    return (
        <Element main>
            <ClientContext.Provider value={ client }>
                <ThemeContextProvider { ...vm }>
                    <Router>
                        <Redirect noThrow from='/' to='/operations' />
                        <Operations path="/operations" />
                        <Operations path="/operations/:id" />
                        <Layout color='primary' path='/layout' />
                        <Accordion color='primary' path='/accordion' />
                    </Router>
                </ThemeContextProvider>
            </ClientContext.Provider>
        </Element>
    );
};

export default App;
