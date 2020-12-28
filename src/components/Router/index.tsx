import * as React from 'react';
import { navigate, Router }       from '@reach/router';

import Operations       from '@components/Operations';
import Categories       from '@components/Categories';
import Accounts         from '@components/Accounts';
import  Profile        from '@components/Profile';

import { MainStyle }    from './Main.style';

interface Props {
    onBoarding: boolean;
}

const AppRouter: React.FC<Props> = ({ onBoarding }) => {
    
    React.useEffect(() => {
        if (onBoarding) {
            navigate('/accounts');
        }
    }, [])
    
    return (
        <Router component={ MainStyle }>
            {
                !onBoarding && (
                    <React.Fragment>
                        <Operations path="/" />
                        <Categories path="/categories" />
                    </React.Fragment>
                )
            }
            <Accounts path="/accounts" />
            <Profile path="/profile" />
        </Router>
    )
};

export default AppRouter;