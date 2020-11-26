import * as React                           from 'react';
import { Router }                           from '@reach/router';
import { useKeycloak }                      from '@react-keycloak/web'

import { ThemeContextProvider }             from '@providers/theme/useThemeContext';
import { useTheme }                         from '@providers/theme/useTheme';

import Operations                           from '@components/Operations';
import User                                 from '@components/User';

import { AppStyle, MainStyle, HeaderStyle } from './App.style';

const App: React.FC = () => {
    const { keycloak } = useKeycloak()

    const vm = useTheme();

    return (
        <ThemeContextProvider { ...vm }>
            {
                keycloak &&
                        keycloak.authenticated && (
                    <AppStyle>
                        <HeaderStyle>
                            <User />
                        </HeaderStyle>
                        <Router component={ MainStyle }>
                            <Operations path="/operations" />
                        </Router>
                    </AppStyle>
                )
            }
        </ThemeContextProvider>
    );
};

export default App;
