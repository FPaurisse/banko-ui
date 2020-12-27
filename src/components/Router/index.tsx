import * as React from 'react';
import { Router }       from '@reach/router';

import Operations       from '@components/Operations';
import Categories       from '@components/Categories';
import Accounts         from '@components/Accounts';
import  Settings        from '@components/Settings';

import { MainStyle }    from './Main.style';

const AppRouter: React.FC = () => {
    
    return (
        <Router component={ MainStyle }>
            <Operations path="/" />
            <Categories path="/categories" />
            <Accounts path="/accounts" />
            <Settings path="/settings" />
        </Router>
    )
};

export default AppRouter;