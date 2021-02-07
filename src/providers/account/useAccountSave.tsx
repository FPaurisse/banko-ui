import * as React from 'react';
import { FormModel } from '@library/Form/models/FormModel';
import { UseFormContextValues }     from '@library/Form/provider/useForm';
import { useModalContext } from '@library/Modal/provider/useModalContext';

import { AccountModel }             from '@models/AccountModel';

import useAccountForm               from '@providers/Account/useAccountForm';
import { useUserContext }           from '@providers/user/useUserContext';

import { useSharedProfiles }        from '@service/useProfile';

export type AccountSaveProvider = {
    definition: FormModel<AccountModel>;
    form: UseFormContextValues<AccountModel>;
    save: () => void;
};

const useAccountSave = (): AccountSaveProvider => {

    const { open, setOpen } = useModalContext();
    const { user: { _id: userId } } = useUserContext();
    const { data: sharedProfiles } = useSharedProfiles(userId);
    
    const { definition, form }  = useAccountForm(sharedProfiles, userId);

    const save = (): void => {
        if (!form.entity) {
            form.actions.create.executeMutation({
                ...form.values(),
                userId
            })
        } else {
            form.actions.update.executeMutation({
                ...form.values(),
                _id: form.entity._id
            })
        }
    }

    React.useEffect(() => {
        if (form.actions.create.state.fetching) {
            if (!form.actions.create.state.error) {
                form.reset();
                if (open) {
                    setOpen(false)
                }
            }
        }
    }, [form.actions.create.state.fetching])

    return {
        definition,
        form,
        save
    }
};

export { useAccountSave };