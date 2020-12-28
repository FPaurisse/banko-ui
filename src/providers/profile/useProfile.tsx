import { FormModel } from '@library/Form/models/FormModel';
import { UseFormContextValues } from '@library/Form/provider/useForm';
import { AccountModel } from '@models/AccountModel';
import { ProfileModel } from '@models/ProfileModel';
import { useUserContext } from '@providers/user/useUserContext';
import { useProfileByUserId, useProfileCreate } from '@service/useProfile';
import * as React   from 'react';
import useProfileForm from './useProfileForm';

export type ProfileContextValues = {
    profile: ProfileModel;
    form: UseFormContextValues<ProfileModel>;
    definition: FormModel<ProfileModel>;
};

const useProfile = (userId: string, accounts: AccountModel[]): ProfileContextValues => {
    const [profile, setProfile] = React.useState<ProfileModel>(null);

    const { user } = useUserContext();

    const { executeMutation: createUserProfiles }   = useProfileCreate();

    const { form, definition }  = useProfileForm(accounts);
    const { data: profileByUserId, fetching } = useProfileByUserId(userId);

    React.useEffect(() => {
        if (!fetching) {
            if (profileByUserId) {
                setProfile(profileByUserId);
                form.setEntity(profileByUserId);
                form.form.reset(profileByUserId);
            } else {
                const userProfiles = {
                    userId: user._id,
                    accountIdByDefault: accounts && accounts.length > 0 ? accounts[0]._id : null,
                    shareMyProfile: false,
                    username: user.username,
                    email: user.email,
                    firstname: user.firstname,
                    lastname: user.lastname
                };
                createUserProfiles(userProfiles);
                setProfile(userProfiles);
                form.setEntity(userProfiles);
                form.form.reset(userProfiles);
            }
        }
    }, [fetching])

    return {
        profile,
        form,
        definition
    };
};

export default useProfile;