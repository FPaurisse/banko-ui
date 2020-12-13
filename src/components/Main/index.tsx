import * as React                           from 'react';
import { Router }                 from '@reach/router';

import Operations                           from '@components/Operations';
import Categories                           from '@components/Categories';
import Accounts                             from '@components/Accounts';
import Sidenav                              from '@components/Sidenav';

import { AccountsByUserContextProvider }    from '@providers/account/useAccountsByUserContext';
import useAccountsByUser                    from '@providers/account/useAccountsByUser';

import { MainStyle }                        from './Main.style';
import OnBoarding from '@components/OnBoarding';

interface MainProps {
    userId: string;
}

const Main: React.FC<MainProps> = ({ userId }) => {

    const accountsByUser = useAccountsByUser(userId);

    if (!accountsByUser || !accountsByUser.accounts || !accountsByUser.selected) {
        return <OnBoarding />
    }

    return (
        <React.Fragment>
            <AccountsByUserContextProvider { ...accountsByUser }>
                <Sidenav />
                <Router component={ MainStyle }>
                    <Operations path="/" />
                    <Categories path="/categories" />
                    <Accounts path="/accounts" />
                </Router>
            </AccountsByUserContextProvider>
        </React.Fragment>

    )
};

export default Main;
