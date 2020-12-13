import * as React                                       from 'react';

import { CategoryModel }                                from '@models/CategoryModel';

import { FormModel }                                    from '@library/Form/models/FormModel';
import { UseFormContextValues }                         from '@library/Form/provider/useForm';
import { useList, useListContextValues }                from '@library/List/provider/useList';

import useCategoryForm                                  from '@providers/Category/useCategoryForm';

import { useCategoryDelete, useCategoriesByAccount }    from '@service/useCategory';

type CategoryListProvider = {
    definition: FormModel<CategoryModel>;
    form: UseFormContextValues<CategoryModel>;
    list: useListContextValues<CategoryModel>;
};

const useCategoryList = (accountId: string): CategoryListProvider => {
    const { definition, form }  = useCategoryForm();
    const { entity } = form;

    const {
        data: CategoriesByAccount,
        fetching: listFetching,
        error: listError
    } = useCategoriesByAccount(accountId);

    const {
        state: { error: removeError },
        executeMutation: remove
    } = useCategoryDelete();

    const list = useList<CategoryModel>({
        listing: CategoriesByAccount,
        indexes: CategoriesByAccount.map((x) => x._id),
        actions: { delete: remove },
        error: listError || removeError,
        reloading: listFetching
    });

    React.useEffect(() => {
        if (entity) {
            form.form.reset(entity);
        } else {
            const model = CategoryModel.Empty();
            form.form.reset(model);
        }
    }, [entity])

    return ({
        definition,
        form,
        list
    })
};

export default useCategoryList;
