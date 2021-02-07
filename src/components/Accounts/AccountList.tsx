import * as React               from 'react';

import useAccountCards          from '@providers/account/useAccountCards';

import { Content, Container }   from './Accounts.style';
import { CardContextProvider }  from '@library/Card/provider/useCardContext';
import Cards                    from '@library/Card/Cards';

const AccountList: React.FC = () => {
    const { cards } = useAccountCards();
    
    return (
        <CardContextProvider { ...cards }>
            <Container>
                <Content>
                    <Cards />
                </Content>
            </Container>
        </CardContextProvider>
    )
};

export default AccountList;