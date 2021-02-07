import { FormModel }                                from '@library/Form/models/FormModel';
import useForm, { UseFormContextValues }            from '@library/Form/provider/useForm';
import { AccountModel }                             from '@models/AccountModel';

import { ProfileModel }                             from '@models/ProfileModel';

import { useProfileCreate, useProfileUpdate }       from '@service/useProfile';

export type UserReturn = {
    form: UseFormContextValues<ProfileModel>;
    definition: FormModel<ProfileModel>;
}

const useProfileForm = (accounts: AccountModel[], userId: string): UserReturn => {

    const form = useForm<ProfileModel>({
        empty: ProfileModel.Empty(),
        actions: {
            create: useProfileCreate(),
            update: useProfileUpdate()
        },
        args: {
            userId
        },
        headings: {
            creation: 'Paramètres',
            edition: 'Paramètres'
        }
    });

    const definition: FormModel<ProfileModel> = [
        {
            name: 'accountIdByDefault',
            type: 'select',
            label: 'Compte principal',
            options: accounts && accounts.length > 0 ? 
                accounts.map((account) => ({ label: account.title, value: account._id }))
                : []
        },
        {
            name: 'shareMyProfile',
            type: 'checkbox',
            label: 'Profil public',
            inverse: 'Profil privé'
        },
        {
            name: 'username',
            type: 'text',
            label: 'Identifiant',
            disabled: true
        },
        {
            name: 'email',
            type: 'text',
            label: 'Email',
            disabled: true
        },
        {
            name: 'firstname',
            type: 'text',
            label: 'Prénom',
            disabled: true
        },
        {
            name: 'lastname',
            type: 'text',
            label: 'Nom',
            disabled: true
        }
    ];

    return { form, definition }
};

export default useProfileForm;
