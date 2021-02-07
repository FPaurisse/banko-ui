import * as React                   from 'react';
import { Link }                     from '@reach/router';
import { find }                     from 'lodash';

import { AccountModel }             from '@models/AccountModel';

import { useAccountsByUserContext } from '@providers/account/useAccountsByUserContext';
import { useUserContext }           from '@providers/user/useUserContext';
import { useProfileContext }        from '@providers/profile/useProfileContext';

const Menu: React.FC = () => {
    const [primaryAccount, setPrimaryAccount] = React.useState<AccountModel>(null);
    const [secondaryAccount, setSecondaryAccount] = React.useState<AccountModel[]>([]);

    const { accounts, selected, setSelected } = useAccountsByUserContext();
    const { profile } = useProfileContext();

    const { user } = useUserContext();

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        const value = e.target.value;
        if (value) {
            setSelected(e.target.value);
        }
    };

    React.useEffect(() => {
        if (accounts) {
            if (profile?.accountIdByDefault) {
                setPrimaryAccount(find(accounts, ['_id', profile.accountIdByDefault]));
                setSelected(profile.accountIdByDefault);
            }
        }
    }, [accounts, profile]);

    React.useEffect(() => {
        if (accounts) {
            if (primaryAccount) {
                setSecondaryAccount(accounts.filter((account) => account._id !== primaryAccount._id))
            } else {
                setSecondaryAccount(accounts)
            }
        }
    }, [accounts, primaryAccount]);

    return (
        <div>
            <p>
                <Link to="/">{ user.fullname }</Link>
            </p>
            { secondaryAccount.length >= 1 && (
                <React.Fragment>
                    <p>
                        <select onChange={ handleChange } value={ selected || secondaryAccount[0]._id }>
                            {
                                primaryAccount && (
                                    <React.Fragment>
                                        <option value={ primaryAccount._id }>
                                            { primaryAccount.title }
                                        </option>
                                        <option disabled>-</option>
                                    </React.Fragment>
                                )
                            }
                            <React.Fragment>
                                { secondaryAccount
                                    .map((option, i) => (
                                        <option key={ i } value={ option._id }>
                                            { option.title }
                                        </option>
                                    )) }
                            </React.Fragment>
                        </select>
                    </p>
                </React.Fragment>
            ) }
            <p>
                <Link to="/">Mes opérations</Link>
            </p>
            <p>
                <Link to="/categories">Mes catégories</Link>
            </p>
        </div>
    );
};

export default Menu;
