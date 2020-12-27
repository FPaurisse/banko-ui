import * as React from 'react';
import { ProfileContextValues } from './useProfile';

const ProfileContext = React.createContext<ProfileContextValues>(null);

export const useProfileContext = (): ProfileContextValues => {
    return React.useContext(ProfileContext);
};

type ProfileContextProps = ProfileContextValues & {
    children: React.ReactNode;
};

export const ProfileContextProvider = (props: ProfileContextProps): JSX.Element => {
    const { children, ...rest } = props;
    return (
        <ProfileContext.Provider value={ rest }>{ children }</ProfileContext.Provider>
    );
};
