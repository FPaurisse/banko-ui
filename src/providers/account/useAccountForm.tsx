import { FormModel }                                from '@library/Form/models/FormModel';
import useForm, { UseFormContextValues }            from '@library/Form/provider/useForm';

import { AccountModel }                           from '@models/AccountModel';

import { useAccountCreate, useAccountUpdate }   from '@service/useAccount';

export type AccountReturn = {
    form: UseFormContextValues<AccountModel>;
    definition: FormModel<AccountModel>;
}

const useAccountForm = (): AccountReturn => {

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
        }
    ];

    return { form, definition }
};

export default useAccountForm;
