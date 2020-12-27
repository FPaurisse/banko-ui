import * as React               from 'react';

import { ThemeContextProvider } from '@providers/theme/useThemeContext';
import { UserContextProvider }  from '@providers/user/useUserContext';
import useTheme                 from '@providers/theme/useTheme';
import useUser                  from '@providers/user/useUser';

import Main                     from '@components/Main';

import { AppStyle }             from './App.style';
import { ModalContextProvider } from '@library/Modal/provider/useModalContext';
import { useModal } from '@library/Modal/provider/useModal';

const App: React.FC = () => {
    
    const theme = useTheme();
    const modal = useModal();
    const vm    = useUser();

    if (!vm.user) {
        return null;
    }

    return (
        <UserContextProvider { ...vm }>
            <ThemeContextProvider { ...theme }>
                <ModalContextProvider { ...modal }>
                    <AppStyle>
                        <Main />
                    </AppStyle>
                </ModalContextProvider>
            </ThemeContextProvider>
        </UserContextProvider>
    );
};

export default App;
