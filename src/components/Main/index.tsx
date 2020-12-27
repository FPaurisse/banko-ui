import * as React                           from 'react';

import { useUserContext }                   from '@providers/user/useUserContext';
import useAccountsByUser                    from '@providers/account/useAccountsByUser';
import { AccountsByUserContextProvider }    from '@providers/account/useAccountsByUserContext';
import useSetting                           from '@providers/setting/useSetting';
import { SettingContextProvider }           from '@providers/setting/useSettingContext';

import AppRouter                            from '@components/Router';
import Sidenav                              from '@components/Sidenav';
import OnBoarding                           from '@components/OnBoarding';

const Main: React.FC = () => {

    const { user } = useUserContext();

    const accountsByUser = useAccountsByUser(user._id);
    const settingByUser  = useSetting(user._id, accountsByUser.accounts);

    if (accountsByUser.loading) {
        return null;
    }

    return (
        <React.Fragment>
            <SettingContextProvider { ...settingByUser }>
                <AccountsByUserContextProvider { ...accountsByUser }>
                    {
                        accountsByUser.onBoarding
                            ? <OnBoarding />
                            : <React.Fragment>
                                <Sidenav />
                                <AppRouter />
                            </React.Fragment>
                    }
                </AccountsByUserContextProvider>
            </SettingContextProvider>
        </React.Fragment>
    )
};

export default Main;
