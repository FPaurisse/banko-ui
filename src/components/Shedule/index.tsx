import * as React                   from 'react';
import { RouteComponentProps }      from '@reach/router';

import Form                         from '@library/Form/Form';
import List                         from '@library/List/List';
import Input                        from '@library/Form/Input';
import { ListContextProvider }      from '@library/List/provider/useListContext';
import { FormContextProvider }      from '@library/Form/provider/useFormContext';

import { usePeriod }                from '@providers/period/usePeriod';
import { PeriodContextProvider }    from '@providers/period/usePeriodContext';
import { useAccountsByUserContext } from '@providers/account/useAccountsByUserContext';
import useSheduleList               from '@providers/shedule/useSheduleList';

import { Content, Container, SheduleStyle } from './Shedule.style';
import { useUserContext } from '@providers/user/useUserContext';

const Shedule: React.FC<RouteComponentProps> = () => {
    const period                        = usePeriod();
    const { user }                      = useUserContext();
    const { selected: accountId }       = useAccountsByUserContext();
    const { form, definition, list }    = useSheduleList(period, user._id, accountId);

    return (
        <SheduleStyle>
            <PeriodContextProvider { ...period }>
                <FormContextProvider { ...form }>
                    <ListContextProvider { ...list }>
                        <Container>
                            <Form>
                                <Input { ...definition.find((field) => field.name === 'title') } />
                                <Input { ...definition.find((field) => field.name === 'categories') } />
                                <Input { ...definition.find((field) => field.name === 'isCredit') } />
                                <Input { ...definition.find((field) => field.name === 'amount') } />
                                <Input { ...definition.find((field) => field.name === 'isPassed') } />
                                <Input { ...definition.find((field) => field.name === 'date') } />
                            </Form>
                            <Content>
                                <List />
                            </Content>
                        </Container>
                    </ListContextProvider>
                </FormContextProvider>
            </PeriodContextProvider>
        </SheduleStyle>
    )
};

export default Shedule;
