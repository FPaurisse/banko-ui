import { FormModel }                                from '@library/Form/models/FormModel';
import useForm, { UseFormContextValues }            from '@library/Form/provider/useForm';

import { CategoryModel }                            from '@models/CategoryModel';

import { useCategoryCreate, useCategoryUpdate }     from '@service/useCategory';

export type CategoryReturn = {
    form: UseFormContextValues<CategoryModel>;
    definition: FormModel<CategoryModel>;
}

const useCategoryForm = (): CategoryReturn => {

    const form = useForm<CategoryModel>({
        actions: {
            create: useCategoryCreate(),
            update: useCategoryUpdate()
        },
    });

    const definition: FormModel<CategoryModel> = [
        {
            name: 'title',
            type: 'text',
            label: 'Titre',
            required: true
        }
    ];

    return { form, definition }
};

export default useCategoryForm;
