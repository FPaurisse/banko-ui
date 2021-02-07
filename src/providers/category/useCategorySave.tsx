import { FormModel }                from '@library/Form/models/FormModel';
import { UseFormContextValues }     from '@library/Form/provider/useForm';

import { CategoryModel }            from '@models/CategoryModel';

import useCategoryForm              from '@providers/category/useCategoryForm';

export type CategorySaveProvider = {
    definition: FormModel<CategoryModel>;
    form: UseFormContextValues<CategoryModel>;
    save: () => void;
};

const useCategorySave = (accountId: string, userId: string): CategorySaveProvider => { 
    const { definition, form } = useCategoryForm(accountId, userId);

    const save = (): void => {
        if (!form.entity) {
            form.actions.create({ ...form.values(), accountId, userId })
        } else {
            form.actions.update({ ...form.values(), _id: form.entity._id })
        }
    }

    return {
        definition,
        form,
        save
    }
};

export { useCategorySave };