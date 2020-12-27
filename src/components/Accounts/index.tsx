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

const Account: React.FC<RouteComponentProps> = () => {
    const period                        = usePeriod();
    const { user }                      = useUserContext();
    const { form, definition, cards }   = useAccountCards(user._id);

    return (
        <AccountsStyle>
            <PeriodContextProvider { ...period }>
                <FormContextProvider { ...form }>
                    <CardContextProvider { ...cards }>
                        <Modal>
                            <Form>
                                <Input { ...definition.find((field) => field.name === 'title') } />
                            </Form>
                        </Modal>
                        <Container>
                            <Content>
                                <Cards />
                            </Content>
                        </Container>
                    </CardContextProvider>
                </FormContextProvider>
            </PeriodContextProvider>
        </AccountsStyle>
    )
};

export default Account;
