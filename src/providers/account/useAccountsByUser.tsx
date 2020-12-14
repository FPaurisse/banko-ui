import * as React               from 'react';

import { AccountModel }         from '@models/AccountModel';

import { useAccountsByUser as Provider }    from '@service/useAccount';
import { find } from 'lodash';

export type AccountsByUserContextValues = {
    accounts: AccountModel[];
    selected: string;
    onBoarding: boolean;
    loading: boolean;
    setSelected: React.Dispatch<React.SetStateAction<string>>;
};

const useAccountsByUser = (userId: string): AccountsByUserContextValues => {
    const [selected, setSelected] = React.useState<string>(null);
    const [onBoarding, setOnboarding] = React.useState<boolean>(false);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [accounts, setAccounts] = React.useState<AccountModel[]>(null);

    const {
        data: accountsByUser,
    } = Provider(userId);
    
    React.useEffect(() => {
        if (accountsByUser) {
            setAccounts(accountsByUser);
        }
    }, [accountsByUser]);

    React.useEffect(() => {
        if (accounts) {
            setLoading(false)
            if (accounts.length === 0) {
                setOnboarding(true);
            } 
            if(accounts.length > 0){
                setOnboarding(false);
                if (!selected) {
                    const accountByDefault = find(accounts, ['isDefault', true]);
                    setSelected(accountByDefault?._id || accounts[0]._id)
                }
            }
        }
    }, [accounts])

    return ({
        accounts,
        selected,
        onBoarding,
        loading,
        setSelected
    })
};

export default useAccountsByUser;
