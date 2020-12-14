import * as React from 'react';
import { RouteComponentProps } from '@reach/router';

import { HeaderStyle } from './Sidenav.style';
import Menu from '@components/Sidenav/Menu';
import UserInfo from '@components/Sidenav/UserInfo';

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