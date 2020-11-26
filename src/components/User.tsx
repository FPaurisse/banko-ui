import { Link, RouteComponentProps } from '@reach/router';
import { useKeycloak } from '@react-keycloak/web';
import * as React from 'react';

interface UserInfoModel {
    preferred_username?: string;
} 

const User: React.FC<RouteComponentProps> = () => {
    const { keycloak } = useKeycloak();
    const [userInfo, setUserInfo] = React.useState<UserInfoModel>({});

    React.useEffect(() => {
        keycloak.loadUserInfo().then((userInfo: UserInfoModel) => {
            setUserInfo(userInfo);
        });
    }, [])
    
    return (
        <React.Fragment>
            { userInfo.preferred_username }
            { keycloak && keycloak.authenticated &&
                    <button onClick={ () => keycloak.logout() }>Logout</button>
            }
            <Link to='/operations'>Opérations</Link>
        </React.Fragment>
    )
};

export default User;