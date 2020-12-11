import * as React from 'react';
import { UserContextValues } from './useUser';

const UserContext = React.createContext<UserContextValues>(null);

export const useUserContext = (): UserContextValues => {
    return React.useContext(UserContext);
};

type UserContextProps = UserContextValues & {
    children: React.ReactNode;
};

export const UserContextProvider = (props: UserContextProps): JSX.Element => {
    const { children, ...rest } = props;
    return (
        <UserContext.Provider value={ rest }>{ children }</UserContext.Provider>
    );
};
