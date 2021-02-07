import { CategoryModel }                                from '@models/CategoryModel';

import { useTag, useTagContextValues }                  from '@library/Tag/provider/useTag';

import { useAccountsByUserContext }                     from '@providers/account/useAccountsByUserContext';

import { useCategoryDelete, useCategoriesByAccount }    from '@service/useCategory';

type CategoryListProvider = {
    tags: useTagContextValues<CategoryModel>;
};

const useCategoryList = (): CategoryListProvider => {
    const { selected: accountId }   = useAccountsByUserContext();

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

    return ({
        tags
    })
};

export default useCategoryList;
