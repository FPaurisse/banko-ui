import * as React from 'react';
import { FormModel } from '@library/Form/models/FormModel';
import { UseFormContextValues }     from '@library/Form/provider/useForm';
import { useModalContext } from '@library/Modal/provider/useModalContext';

import { AccountModel }             from '@models/AccountModel';

import useAccountForm               from '@providers/Account/useAccountForm';

import { useSharedProfiles }        from '@service/useProfile';

export type AccountSaveProvider = {
    definition: FormModel<AccountModel>;
    form: UseFormContextValues<AccountModel>;
    save: () => void;
};

const useAccountSave = (userId: string): AccountSaveProvider => {

    const { open, setOpen } = useModalContext();
    const { data: sharedProfiles } = useSharedProfiles(userId);
    
    const { definition, form }  = useAccountForm(sharedProfiles, userId);

    const save = (): void => {
        if (!form.entity) {
            form.actions.create({ ...form.values(), userId })
        } else {
            form.actions.update({ ...form.values(), _id: form.entity._id })
        }
    }

    React.useEffect(() => {
        if (form.form.formState.isSubmitting) {
            if (open) {
                setOpen(false)
            }
        }
    }, [form.form.formState.isSubmitting])

    return {
        definition,
        form,
        save
    }
};

export { useAccountSave };