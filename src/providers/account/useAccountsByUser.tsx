import * as React               from 'react';

import { AccountModel }         from '@models/AccountModel';

import { useAccountsByUser as Provider }    from '@service/useAccount';
import { find } from 'lodash';

export type AccountsByUserContextValues = {
    accounts: AccountModel[];
    selected: string;
    loading: boolean;
    setSelected: React.Dispatch<React.SetStateAction<string>>;
};

const useAccountsByUser = (userId: string): AccountsByUserContextValues => {
    const [selected, setSelected] = React.useState<string>(null);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [accounts, setAccounts] = React.useState<AccountModel[]>(null);

    const {
        data: accountsByUser,
    } = Provider(userId);
    
    React.useEffect(() => {
        setLoading(true);
        setAccounts(accountsByUser);
    }, [accountsByUser]);

    React.useEffect(() => {
        if (accounts) {
            setLoading(false);
            if (!selected && accounts.length > 0) {
                const accountByDefault = find(accounts, ['isDefault', true]);
                setSelected(accountByDefault._id || accounts[1]._id)
            }
        }
    }, [accounts])

    return ({
        accounts,
        selected,
        loading,
        setSelected
    })
};

export default useAccountsByUser;
