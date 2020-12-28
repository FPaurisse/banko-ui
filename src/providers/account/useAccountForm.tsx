import { FormModel }                                from '@library/Form/models/FormModel';
import useForm, { UseFormContextValues }            from '@library/Form/provider/useForm';

import { AccountModel }                           from '@models/AccountModel';
import { ProfileModel } from '@models/ProfileModel';

import { useAccountCreate, useAccountUpdate }   from '@service/useAccount';

export type AccountReturn = {
    form: UseFormContextValues<AccountModel>;
    definition: FormModel<AccountModel>;
}

const useAccountForm = (sharedProfiles: ProfileModel[]): AccountReturn => {

    const form = useForm<AccountModel>({
        actions: {
            create: useAccountCreate(),
            update: useAccountUpdate()
        },
        headings: {
            creation: 'Ajouter un compte',
            edition: 'Modifier le compte'
        }
    });

    const definition: FormModel<AccountModel> = [
        {
            name: 'title',
            type: 'text',
            label: 'Titre',
            required: true
        },
        {
            name: 'guests',
            type: 'multiselect',
            label: 'Invités',
            options: sharedProfiles && sharedProfiles.length > 0 ? 
                sharedProfiles.map((profile) => ({ label: profile.username, value: profile.userId }))
                : [],
            isMulti: true
        }
    ];

    return { form, definition }
};

export default useAccountForm;
