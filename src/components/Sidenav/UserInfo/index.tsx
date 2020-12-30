import * as React from 'react';
import { Link } from '@reach/router';
import { useKeycloak } from '@react-keycloak/web';

const UserInfo: React.FC = () => {
    const { keycloak } = useKeycloak();

    const handleLogout = (): void => {
        keycloak.logout();
    }
    
    return (
        <React.Fragment>
            <div>
                <p>
                    <Link to='/accounts'>Mes comptes bancaires</Link>
                </p>
                <p>
                    <Link to='/profile'>Paramètres</Link>
                </p>
                <p>
                    <button onClick={ handleLogout }>Logout</button>
                </p>
            </div>
        </React.Fragment>
    )
};

export default UserInfo;