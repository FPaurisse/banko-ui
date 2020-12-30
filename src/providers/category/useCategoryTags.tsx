import * as React                                       from 'react';

import { CategoryModel }                                from '@models/CategoryModel';

import { FormModel }                                    from '@library/Form/models/FormModel';
import { UseFormContextValues }                         from '@library/Form/provider/useForm';

import useCategoryForm                                  from '@providers/Category/useCategoryForm';

import { useCategoryDelete, useCategoriesByAccount }    from '@service/useCategory';
import { useTag, useTagContextValues } from '@library/Tag/provider/useTag';

type CategoryListProvider = {
    definition: FormModel<CategoryModel>;
    form: UseFormContextValues<CategoryModel>;
    tags: useTagContextValues<CategoryModel>;
};

const useCategoryList = (accountId: string, userId: string): CategoryListProvider => {
    const { definition, form } = useCategoryForm(accountId, userId);
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

    const tags = useTag<CategoryModel>({
        tags: CategoriesByAccount,
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
        tags
    })
};

export default useCategoryList;
