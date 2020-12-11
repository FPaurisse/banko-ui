import * as React                           from 'react';

import { AccountModel }                     from '@models/AccountModel';

import { FormModel }                        from '@library/Form/models/FormModel';
import { UseFormContextValues }             from '@library/Form/provider/useForm';
import { useList, useListContextValues }    from '@library/List/provider/useList';

import useAccountForm                       from '@providers/Account/useAccountForm';

import { useAccountDelete, useAccountsByUser }                from '@service/useAccount';

type AccountListProvider = {
    definition: FormModel<AccountModel>;
    form: UseFormContextValues<AccountModel>;
    list: useListContextValues<AccountModel>;
};

const useAccountList = (userId: string): AccountListProvider => {
    const { definition, form }  = useAccountForm();
    const { entity } = form;

    const {
        data: AccountsByUser,
        fetching: listFetching,
        error: listError
    } = useAccountsByUser(userId);

    const {
        state: { error: removeError },
        executeMutation: remove
    } = useAccountDelete();

    const list = useList<AccountModel>({
        listing: AccountsByUser,
        indexes: AccountsByUser.map((x) => x._id),
        actions: { delete: remove },
        error: listError || removeError,
        reloading: listFetching
    });

    React.useEffect(() => {
        if (entity) {
            form.form.reset(entity);
        } else {
            const model = AccountModel.Empty();
            form.form.reset(model);
        }
    }, [entity])

    return ({
        definition,
        form,
        list
    })
};

export default useAccountList;
