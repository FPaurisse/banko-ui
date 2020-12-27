import * as React from 'react';
import { Link } from '@reach/router';
import { useKeycloak } from '@react-keycloak/web';

const UserInfo: React.FC = () => {
    const { keycloak } = useKeycloak();
    
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
                    <button onClick={ () => keycloak.logout() }>Logout</button>
                </p>
            </div>
        </React.Fragment>
    )
};

export default UserInfo;