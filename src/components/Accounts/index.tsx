import * as React                   from 'react';
import { RouteComponentProps }      from '@reach/router';

import Form                         from '@library/Form/Form';
import Input                        from '@library/Form/Input';
import Cards                        from '@library/Card/Cards';
import { CardContextProvider }      from '@library/Card/provider/useCardContext';
import { FormContextProvider }      from '@library/Form/provider/useFormContext';
import Modal                        from '@library/Modal/Modal';

import useAccountCards              from '@providers/account/useAccountCards';
import { useUserContext }           from '@providers/user/useUserContext';
import { usePeriod }                from '@providers/period/usePeriod';
import { PeriodContextProvider }    from '@providers/period/usePeriodContext';

import { AccountsStyle, Container, Content } from './Accounts.style';
import { useAccountSave } from '@providers/account/useAccountSave';

const Account: React.FC<RouteComponentProps> = () => {
    const period = usePeriod();
    const { user } = useUserContext();
    const { cards } = useAccountCards(user._id);
    const { definition, form, save } = useAccountSave(user._id);

    return (
        <AccountsStyle>
            <PeriodContextProvider { ...period }>
                <FormContextProvider { ...form }>
                    <Modal>
                        <Form>
                            <Input { ...definition.find((field) => field.name === 'title') } />
                            <Input { ...definition.find((field) => field.name === 'guests') } />
                            <button onClick={ save }>Valider</button>
                        </Form>
                    </Modal>
                </FormContextProvider>
                <CardContextProvider { ...cards }>
                    <Container>
                        <Content>
                            <Cards />
                        </Content>
                    </Container>
                </CardContextProvider>
            </PeriodContextProvider>
        </AccountsStyle>
    )
};

export default Account;
