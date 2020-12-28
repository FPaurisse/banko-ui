import * as React               from 'react';

import Menu                     from '@components/Sidenav/Menu';
import UserInfo                 from '@components/Sidenav/UserInfo';

import { HeaderStyle }          from './Sidenav.style';

interface Props {
    onBoarding: boolean;
}

const Sidenav: React.FC<Props> = ({ onBoarding }) => {
    
    return (
        <React.Fragment>
            <HeaderStyle>
                {
                    !onBoarding && <Menu />
                }
                <UserInfo />
            </HeaderStyle>
        </React.Fragment>
    )
};

export default Sidenav;