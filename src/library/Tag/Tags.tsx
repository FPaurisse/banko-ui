import * as React                   from 'react';

import { AccountModel }             from '@models/AccountModel';

import { useTagContext }           from '@library/Tag/provider/useTagContext';
import { useFormContext }           from '@library/Form/provider/useFormContext';

import { useModalContext }          from '@library/Modal/provider/useModalContext';

import { TagStyle, Tag, Add, TagDetail, TagActions, Loading } from './Tag.style';

const Tags: React.FC = () => {

    const { items, actions, selected, loading } = useTagContext();

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


    React.useEffect(() => {
        setOpen(false);
    }, [])

    return (
        <TagStyle>
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
                                    <Tag key={ _id }>
                                        <TagDetail>
                                            { title }
                                        </TagDetail>
                                        <TagActions>
                                            <button disabled={ selected.length > 0 } onClick={ () => handleUpdate(account) }>Modifier</button>
                                            <button disabled={ selected.length > 0 } onClick={ () => handleDelete(_id) }>Supprimer</button>
                                        </TagActions>
                                    </Tag>
                                )
                            })
                        }
                    </React.Fragment>
            }
        </TagStyle>
    )
};

export default Tags;
