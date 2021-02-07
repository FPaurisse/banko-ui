import { AccountModel }                         from '@models/AccountModel';

import { useCard, useCardContextValues }        from '@library/Card/provider/useCard';

import { useUserContext }                       from '@providers/user/useUserContext';

import { useAccountDelete, useAccountsByUser }  from '@service/useAccount';

type AccountCardProvider = {
    cards: useCardContextValues<AccountModel>;
};

const useAccountCards = (): AccountCardProvider => {
    const { user: { _id: userId } } = useUserContext();

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

    return ({
        cards
    })
};

export default useAccountCards;
