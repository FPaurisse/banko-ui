import { Link, RouteComponentProps } from '@reach/router';
import { useKeycloak } from '@react-keycloak/web';
import * as React from 'react';

interface UserInfoModel {
    sub: string;
    preferred_username: string;
    given_name: string;
    family_name: string;
    email: string;
    email_verified: boolean;
    name: string;
} 

const User: React.FC<RouteComponentProps> = () => {
    const { keycloak } = useKeycloak();
    const [userInfo, setUserInfo] = React.useState<UserInfoModel>(null);

    React.useEffect(() => {
        keycloak.loadUserInfo().then((userInfo: UserInfoModel) => {
            setUserInfo(userInfo);
        });
    }, [])

    console.log(userInfo)
    
    return (
        <React.Fragment>
            { userInfo && (
                <p>{ userInfo.name }</p>
            ) }
            { keycloak && keycloak.authenticated &&
                    <button onClick={ () => keycloak.logout() }>Logout</button>
            }
            <Link to='/operations'>Opérations</Link>
        </React.Fragment>
    )
};

export default User;