import * as React from 'react';
import { AccountsByUserContextValues } from './useAccountsByUser';

const AccountsByUserContext = React.createContext<AccountsByUserContextValues>(null);

export const useAccountsByUserContext = (): AccountsByUserContextValues => {
    return React.useContext(AccountsByUserContext);
};

type AccountsByUserContextProps = AccountsByUserContextValues & {
    children: React.ReactNode;
};

export const AccountsByUserContextProvider = (props: AccountsByUserContextProps): JSX.Element => {
    const { children, ...rest } = props;
    return (
        <AccountsByUserContext.Provider value={ rest }>{ children }</AccountsByUserContext.Provider>
    );
};
