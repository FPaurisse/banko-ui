import { Router } from '@reach/router';
import * as React from 'react';

import Operations                           from '@components/Operations';
import Categories                           from '@components/Categories';
import Accounts                             from '@components/Accounts';

import { MainStyle }                        from './Main.style';
import { useAccountsByUserContext } from '@providers/account/useAccountsByUserContext';
import OnBoarding from '@components/OnBoarding';

const AppRouter: React.FC = () => {
    const { onBoarding } = useAccountsByUserContext();

    if (onBoarding) {
        return <OnBoarding />
    }
    
    return (
        <Router component={ MainStyle }>
            <Operations path="/" />
            <Categories path="/categories" />
            <Accounts path="/accounts" />
        </Router>
    )
};

export default AppRouter;