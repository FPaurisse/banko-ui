import { FormModel }                                from '@library/Form/models/FormModel';
import useForm, { UseFormContextValues }            from '@library/Form/provider/useForm';
import { AccountModel }                             from '@models/AccountModel';

import { SettingModel }                             from '@models/SettingModel';

import { useSettingCreate, useSettingUpdate }       from '@service/useSetting';

export type UserReturn = {
    form: UseFormContextValues<SettingModel>;
    definition: FormModel<SettingModel>;
}

const useSettingForm = (accounts: AccountModel[]): UserReturn => {

    const form = useForm<SettingModel>({
        actions: {
            create: useSettingCreate(),
            update: useSettingUpdate()
        },
        headings: {
            creation: 'Paramètres',
            edition: 'Paramètres'
        }
    });

    const definition: FormModel<SettingModel> = [
        {
            name: 'accountIdByDefault',
            type: 'select',
            label: 'Compte principal',
            options: accounts && accounts.length > 0 ? 
                accounts.map((account) => ({ label: account.title, value: account._id }))
                : []
        }
    ];

    return { form, definition }
};

export default useSettingForm;
