import * as React                   from 'react';
import { RouteComponentProps }      from '@reach/router';

import Form                         from '@library/Form/Form';
import List                         from '@library/List/List';
import Input                        from '@library/Form/Input';
import { ListContextProvider }      from '@library/List/provider/useListContext';
import { FormContextProvider }      from '@library/Form/provider/useFormContext';

import { usePeriod }                from '@providers/period/usePeriod';
import { PeriodContextProvider }    from '@providers/period/usePeriodContext';
import useOperationsList            from '@providers/operation/useOperationsList';
import { TotalContextProvider }     from '@providers/total/useTotalContext';

import Total                        from '@components/Operations/Total';
import Navigation                   from '@components/Operations/Navigation';   
import Actions                      from '@components/Operations/Actions';

import { Content, Footer, Container, OperationsStyle } from './Operations.style';
import { useAccountsByUserContext } from '@providers/account/useAccountsByUserContext';

const Operations: React.FC<RouteComponentProps> = () => {
    const period                            = usePeriod();
    const { selected: accountId }           = useAccountsByUserContext();
    const { form, definition, list, total } = useOperationsList(period, accountId);

    return (
        <OperationsStyle>
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
                                <Navigation />
                                <Actions />
                                <List />
                                <Footer>
                                    <TotalContextProvider { ...total }>
                                        <Total />
                                    </TotalContextProvider>
                                </Footer>
                            </Content>
                        </Container>
                    </ListContextProvider>
                </FormContextProvider>
            </PeriodContextProvider>
        </OperationsStyle>
    )
};

export default Operations;
