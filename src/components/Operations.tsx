import * as React                   from 'react';
import { RouteComponentProps }      from '@reach/router';

import Form                         from '@library/Form/Form';
import List                         from '@library/List/List';
import Input                        from '@library/Form/Input';
import Total                        from '@components/Total/Total';
import { ListContextProvider }      from '@library/List/provider/useListContext';
import { FormContextProvider }      from '@library/Form/provider/useFormContext';

import { usePeriod }                from '@providers/period/usePeriod';
import { PeriodContextProvider }    from '@providers/period/usePeriodContext';
import useOperationsList            from '@providers/operation/useOperationsList';
import { TotalContextProvider }     from '@providers/total/useTotalContext';
import { useTotal }                 from '@providers/total/useTotal';
import { Content, Footer, Container, OperationsStyle } from './Operations.style';
import Actions from '@components/Actions/Actions';
import Navigation from '@components/Navigation/Navigation';
import SelectInput from '@library/Form/inputs/SelectInput';

const Operations: React.FC<RouteComponentProps> = () => {
    const [expand, setExpand] = React.useState<boolean>(false);
    const period                        = usePeriod();
    const { form, definition, list }    = useOperationsList(period);
    const total                         = useTotal(period, form.loading, list.loading);

    return (
        <OperationsStyle>
            <PeriodContextProvider { ...period }>
                <FormContextProvider { ...form }>
                    <ListContextProvider { ...list }>
                        <Container>
                            <Form hidden={ expand }>
                                <Input { ...definition.find((field) => field.name === 'title') } />
                                <SelectInput />
                                <Input { ...definition.find((field) => field.name === 'isCredit') } />
                                <Input { ...definition.find((field) => field.name === 'amount') } />
                                <Input { ...definition.find((field) => field.name === 'isPassed') } />
                                <Input { ...definition.find((field) => field.name === 'date') } />
                            </Form>
                            <Content>
                                <Navigation />
                                <Actions />
                                <List />
                            </Content>
                        </Container>
                        <Footer>
                            <button onClick={ () => setExpand(!expand) }>Plein écran</button>
                            <TotalContextProvider { ...total }>
                                <Total />
                            </TotalContextProvider>
                        </Footer>
                    </ListContextProvider>
                </FormContextProvider>
            </PeriodContextProvider>
        </OperationsStyle>
    )
};

export default Operations;
