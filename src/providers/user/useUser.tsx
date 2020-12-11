import * as React       from 'react';
import { useKeycloak }  from '@react-keycloak/web';
import { UserModel } from '@models/UserModel';

export type UserContextValues = {
    user: UserModel;
    loading: boolean;
};

interface UserInfoModel {
    sub: string;
    preferred_username: string;
    email_verified: boolean;
    family_name: string;
    given_name: string;
    email: string;
    name: string;
}

const useUser = (): UserContextValues => {
    const [loading, setLoading] = React.useState<boolean>(false);
    const [ user, setUser ] = React.useState<UserModel>(null)
    
    const { keycloak } = useKeycloak();

    React.useEffect(() => {
        if (keycloak.authenticated) {
            keycloak.loadUserInfo().then((user: UserInfoModel) => {
                setUser({
                    _id: user.sub,
                    username: user.preferred_username,
                    firstname: user.given_name,
                    lastname: user.family_name,
                    fullname: user.name,
                    email: user.email,
                    isConfirmed: user.email_verified
                });
            })
        }
    }, [keycloak])

    React.useEffect(() => {
        if (user) {
            setLoading(false)
        }
    }, [user])

    return ({
        user,
        loading
    })
};

export default useUser;
