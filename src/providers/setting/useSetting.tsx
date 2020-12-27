import { FormModel } from '@library/Form/models/FormModel';
import { UseFormContextValues } from '@library/Form/provider/useForm';
import { AccountModel } from '@models/AccountModel';
import { SettingModel } from '@models/SettingModel';
import { useSettingByUser } from '@service/useSetting';
import * as React   from 'react';
import useSettingForm from './useSettingForm';

export type SettingContextValues = {
    setting: SettingModel;
    form: UseFormContextValues<SettingModel>;
    definition: FormModel<SettingModel>;
};

const useSetting = (userId: string, accounts: AccountModel[]): SettingContextValues => {
    const [setting, setSetting] = React.useState<SettingModel>(null);

    const { form, definition }  = useSettingForm(accounts);
    const { data: settingById } = useSettingByUser(userId);

    React.useEffect(() => {
        if (settingById) {
            setSetting(settingById);
            form.setEntity(settingById);
            form.form.reset(settingById);
        }
    }, [settingById])

    return {
        setting,
        form,
        definition
    };
};

export default useSetting;