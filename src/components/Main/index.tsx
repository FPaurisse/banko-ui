import * as React                           from 'react';
import { Redirect, Router }                           from '@reach/router';

import Operations                           from '@components/Operations';
import Accounts                             from '@components/Accounts';
import Sidenav                              from '@components/Sidenav';

import { MainStyle } from './Main.style';
import { AccountsByUserContextProvider } from '@providers/account/useAccountsByUserContext';
import useAccountsByUser from '@providers/account/useAccountsByUser';
import { useUserContext } from '@providers/user/useUserContext';

const Main: React.FC = () => {

    const { user } = useUserContext();

    const accountsByUser = useAccountsByUser(user._id);

    return (
        <React.Fragment>
            <AccountsByUserContextProvider { ...accountsByUser }>
                <Sidenav />
                <Router component={ MainStyle }>
                    {
                        accountsByUser.accounts && accountsByUser.accounts.length < 0 && <Redirect replace from='/' to='/create' />
                    }
                    <Operations path="/" />
                    <Accounts path="/accounts" />
                </Router>
            </AccountsByUserContextProvider>
        </React.Fragment>

    )
};

export default Main;
