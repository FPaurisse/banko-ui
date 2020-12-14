import * as React               from 'react';
import { RouteComponentProps }  from '@reach/router';

import Menu                     from '@components/Sidenav/Menu';
import UserInfo                 from '@components/Sidenav/UserInfo';

import { HeaderStyle }          from './Sidenav.style';

const User: React.FC<RouteComponentProps> = () => {
    
    return (
        <React.Fragment>
            <HeaderStyle>
                <Menu />
                <UserInfo />
            </HeaderStyle>
        </React.Fragment>
    )
};

export default User;