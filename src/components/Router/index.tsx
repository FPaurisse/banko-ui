import { Router } from '@reach/router';
import * as React from 'react';

import Operations                           from '@components/Operations';
import Categories                           from '@components/Categories';
import Accounts                             from '@components/Accounts';

import { MainStyle }                        from './Main.style';

const AppRouter: React.FC = () => {
    
    return (
        <Router component={ MainStyle }>
            <Operations path="/" />
            <Categories path="/categories" />
            <Accounts path="/accounts" />
        </Router>
    )
};

export default AppRouter;