import * as React from 'react';
import { Link, navigate } from '@reach/router';
import { find }  from 'lodash';
import { useAccountsByUserContext } from '@providers/account/useAccountsByUserContext';
import { useUserContext } from '@providers/user/useUserContext';

const Menu: React.FC = () => {

    const { accounts, selected, setSelected } = useAccountsByUserContext();
    const { user } = useUserContext();

    const currentAccount = find(accounts, ['isDefault', true])

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        const value = e.target.value;
        if (value) {
            setSelected(e.target.value);
            navigate('/');
        }
    }
    
    if (!selected) {
        return null;
    }
     
    return (
        <div>
            <p>
                <Link to='/'>{ user.fullname }</Link>
            </p>
            <p>
                <select onChange={ handleChange } value={ selected || '' }>
                    <option disabled>Compte principal</option>
                    <option value={ currentAccount._id }>{ currentAccount.title }</option>
                    {
                        accounts.length > 1 && 
                        <React.Fragment>
                            <option disabled>Comptes secondaires</option>
                            { accounts
                                .filter((account) => !account.isDefault)
                                .map((option, i) => <option key={ i } value={ option._id }>{ option.title }</option>) }
                        </React.Fragment>
                    }
                </select>
            </p>
            <p>
                <Link to='/'>Mes opérations</Link>
            </p>
            <p>
                <Link to='/categories'>Mes catégories</Link>
            </p>
        </div>
    )
};

export default Menu;