import * as React                   from 'react';

import { FormModel }                from '@library/Form/models/FormModel';
import { UseFormContextValues }     from '@library/Form/provider/useForm';
import { useModalContext }          from '@library/Modal/provider/useModalContext';

import { CategoryModel }            from '@models/CategoryModel';

import { useAccountsByUserContext } from '@providers/account/useAccountsByUserContext';
import { useUserContext }           from '@providers/user/useUserContext';
import useCategoryForm              from '@providers/category/useCategoryForm';

export type CategorySaveProvider = {
    definition: FormModel<CategoryModel>;
    form: UseFormContextValues<CategoryModel>;
    save: () => void;
};

const useCategorySave = (): CategorySaveProvider => { 
    const { open, setOpen }         = useModalContext();
    const { selected: accountId }   = useAccountsByUserContext();
    const { user: { _id: userId } } = useUserContext();
    
    const { definition, form }      = useCategoryForm(accountId, userId);

    const save = (): void => {
        if (!form.entity) {
            form.actions.create.executeMutation({
                ...form.values(),
                accountId,
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

export { useCategorySave };