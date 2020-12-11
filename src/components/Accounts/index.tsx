import * as React                   from 'react';
import { RouteComponentProps }      from '@reach/router';

import Form                         from '@library/Form/Form';
import Input                        from '@library/Form/Input';
import { ListContextProvider }      from '@library/List/provider/useListContext';
import { FormContextProvider }      from '@library/Form/provider/useFormContext';
import List                         from '@library/List/List';

import useAccountList               from '@providers/account/useAccountList';
import { useUserContext } from '@providers/user/useUserContext';
import { usePeriod } from '@providers/period/usePeriod';
import { PeriodContextProvider } from '@providers/period/usePeriodContext';
import { AccountsStyle, Container, Content } from './Accounts.style';

const Account: React.FC<RouteComponentProps> = () => {
    
    const period                            = usePeriod();
    const { user } = useUserContext();
    const { form, definition, list } = useAccountList(user._id);

    return (
        <AccountsStyle>
            <PeriodContextProvider { ...period }>
                <FormContextProvider { ...form }>
                    <ListContextProvider { ...list }>
                        <Container>
                            <Form>
                                <Input { ...definition.find((field) => field.name === 'title') } />
                                <Input { ...definition.find((field) => field.name === 'isDefault') } />
                                <Input { ...definition.find((field) => field.name === 'guests') } />
                            </Form>
                            <Content>
                                <List />
                            </Content>
                        </Container>
                    </ListContextProvider>
                </FormContextProvider>
            </PeriodContextProvider>
        </AccountsStyle>
    )
};

export default Account;
