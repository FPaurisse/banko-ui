import * as React                           from 'react';

import { ThemeContextProvider }             from '@providers/theme/useThemeContext';
import { useTheme }                         from '@providers/theme/useTheme';

import { AppStyle } from './App.style';
import Main from '@components/Main';
import useUser from '@providers/user/useUser';
import { UserContextProvider } from '@providers/user/useUserContext';

const App: React.FC = () => {
    const vm = useUser();

    const theme = useTheme();

    if (!vm.user) {
        return null;
    }

    return (
        <UserContextProvider { ...vm }>
            <ThemeContextProvider { ...theme }>
                <AppStyle>
                    <Main userId={ vm.user._id } />
                </AppStyle>
            </ThemeContextProvider>
        </UserContextProvider>
    );
};

export default App;
