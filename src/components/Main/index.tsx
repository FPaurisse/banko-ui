import * as React                           from 'react';

import { useUserContext }                   from '@providers/user/useUserContext';
import useAccountsByUser                    from '@providers/account/useAccountsByUser';
import { AccountsByUserContextProvider }    from '@providers/account/useAccountsByUserContext';
import useProfile                           from '@providers/profile/useProfile';
import { ProfileContextProvider }           from '@providers/profile/useProfileContext';

import AppRouter                            from '@components/Router';
import Sidenav                              from '@components/Sidenav';
import OnBoarding                           from '@components/OnBoarding';

const Main: React.FC = () => {

    const { user } = useUserContext();

    const accountsByUser    = useAccountsByUser(user._id);
    const profile           = useProfile(user._id, accountsByUser.accounts);

    if (accountsByUser.loading) {
        return null;
    }

    return (
        <React.Fragment>
            <ProfileContextProvider { ...profile }>
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
            </ProfileContextProvider>
        </React.Fragment>
    )
};

export default Main;
