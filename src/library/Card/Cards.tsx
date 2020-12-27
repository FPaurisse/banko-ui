import * as React                   from 'react';
import { navigate }                 from '@reach/router';

import { AccountModel }             from '@models/AccountModel';

import { useCardContext }           from '@library/Card/provider/useCardContext';
import { useFormContext }           from '@library/Form/provider/useFormContext';

import { useAccountsByUserContext } from '@providers/account/useAccountsByUserContext';
import { useModalContext }          from '@library/Modal/provider/useModalContext';

import { CardStyle, Card, Add, CardDetail, CardActions, Loading } from './Card.style';

const Cards: React.FC = () => {

    const { items, actions, selected, loading } = useCardContext();
    const { setSelected } = useAccountsByUserContext();
    const { setOpen } = useModalContext();
    const { setEntity } = useFormContext();

    const handleCreate = (): void => {
        setEntity(null);
        setOpen(true);
    }

    const handleDelete = (_id: string): void => {
        actions.remove({ _id });
    }

    const handleUpdate = (account: AccountModel): void => {
        setOpen(true);
        setEntity(account);
    }

    const handleClick = (_id: string): void => {
        setSelected(_id);
        navigate('/');
    }

    React.useEffect(() => {
        setOpen(false);
    }, [])

    return (
        <CardStyle>
            {
                loading ? <Loading>Chargement...</Loading> :
                    <React.Fragment>
                        <Add onClick={ () => handleCreate() }>
                            Ajouter
                        </Add>
                        { items.length > 0 &&
                            items.map((account: AccountModel) => {
                                const { _id, title } = account;
                                return (   
                                    <Card key={ _id }>
                                        <CardDetail onClick={ () => handleClick(_id) }>
                                            { title }
                                        </CardDetail>
                                        <CardActions>
                                            <button disabled={ selected.length > 0 } onClick={ () => handleUpdate(account) }>Modifier</button>
                                            <button disabled={ selected.length > 0 } onClick={ () => handleDelete(_id) }>Supprimer</button>
                                        </CardActions>
                                    </Card>
                                )
                            })
                        }
                    </React.Fragment>
            }
        </CardStyle>
    )
};

export default Cards;
