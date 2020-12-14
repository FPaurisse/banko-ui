import * as React                           from 'react';

import { AccountsByUserContextProvider }    from '@providers/account/useAccountsByUserContext';
import useAccountsByUser                    from '@providers/account/useAccountsByUser';
import { useUserContext }                   from '@providers/user/useUserContext';

import AppRouter                            from '@components/Router';
import Sidenav                              from '@components/Sidenav';

const Main: React.FC = () => {

    const { user } = useUserContext();

    const accountsByUser = useAccountsByUser(user._id);
    
    if (accountsByUser.loading) {
        return null;
    }

    return (
        <React.Fragment>
            <AccountsByUserContextProvider { ...accountsByUser }>
                <Sidenav />
                <AppRouter />
            </AccountsByUserContextProvider>
        </React.Fragment>
    )
};

export default Main;
