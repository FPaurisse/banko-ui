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
    });

    const definition: FormModel<AccountModel> = [
        {
            name: 'title',
            type: 'text',
            label: 'Titre',
            required: true
        },
        {
            name: 'isDefault', 
            type: 'checkbox',
            label: 'Compte principal',
            inverse: 'Compte secondaire'
        },
        {
            name: 'guests', 
            type: 'select',
            label: 'Invités',
            options: []
        },
    ];

    return { form, definition }
};

export default useAccountForm;
