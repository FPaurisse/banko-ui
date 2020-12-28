import * as React                               from 'react';

import { AccountModel }                         from '@models/AccountModel';

import { FormModel }                            from '@library/Form/models/FormModel';
import { UseFormContextValues }                 from '@library/Form/provider/useForm';
import { useCard, useCardContextValues }        from '@library/Card/provider/useCard';

import useAccountForm                           from '@providers/Account/useAccountForm';

import { useAccountDelete, useAccountsByUser }  from '@service/useAccount';
import { useSharedProfiles } from '@service/useProfile';

type AccountCardProvider = {
    definition: FormModel<AccountModel>;
    form: UseFormContextValues<AccountModel>;
    cards: useCardContextValues<AccountModel>;
};

const useAccountCards = (userId: string): AccountCardProvider => {

    const { data: sharedProfiles } = useSharedProfiles(userId);
    
    const { definition, form }  = useAccountForm(sharedProfiles);
    const { entity } = form;

    const {
        data: AccountsByUser,
        fetching: CardFetching,
        error: CardError
    } = useAccountsByUser(userId);

    const {
        state: { error: removeError },
        executeMutation: remove
    } = useAccountDelete();

    const cards = useCard<AccountModel>({
        cards: AccountsByUser,
        indexes: AccountsByUser.map((x) => x._id),
        actions: { delete: remove },
        error: CardError || removeError,
        fetching: CardFetching
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
        cards
    })
};

export default useAccountCards;
