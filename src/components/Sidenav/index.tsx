import * as React from 'react';
import { RouteComponentProps } from '@reach/router';

import { HeaderStyle } from './Sidenav.style';
import Menu from '@components/Sidenav/Menu';
import UserInfo from '@components/Sidenav/UserInfo';
import { useAccountsByUserContext } from '@providers/account/useAccountsByUserContext';

const User: React.FC<RouteComponentProps> = () => {
    const { selected } = useAccountsByUserContext();

    if (!selected) {
        return null;
    }
    
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