import * as React               from 'react';

import { ThemeContextProvider } from '@providers/theme/useThemeContext';
import { UserContextProvider }  from '@providers/user/useUserContext';
import useTheme                 from '@providers/theme/useTheme';
import useUser                  from '@providers/user/useUser';

import Main                     from '@components/Main';

import { AppStyle }             from './App.style';

const App: React.FC = () => {
    
    const theme = useTheme();
    const vm    = useUser();

    if (!vm.user) {
        return null;
    }

    return (
        <UserContextProvider { ...vm }>
            <ThemeContextProvider { ...theme }>
                <AppStyle>
                    <Main />
                </AppStyle>
            </ThemeContextProvider>
        </UserContextProvider>
    );
};

export default App;
