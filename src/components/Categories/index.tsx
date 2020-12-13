import * as React                   from 'react';
import { RouteComponentProps }      from '@reach/router';

import Form                         from '@library/Form/Form';
import Input                        from '@library/Form/Input';
import { ListContextProvider }      from '@library/List/provider/useListContext';
import { FormContextProvider }      from '@library/Form/provider/useFormContext';
import List                         from '@library/List/List';

import useCategoryList               from '@providers/Category/useCategoryList';
import { usePeriod }                from '@providers/period/usePeriod';
import { PeriodContextProvider } from '@providers/period/usePeriodContext';
import { CategoriesStyle, Container, Content } from './Categories.style';
import { useAccountsByUserContext } from '@providers/account/useAccountsByUserContext';

const Categories: React.FC<RouteComponentProps> = () => {
    
    const period   = usePeriod();
    const { selected: accoutId } = useAccountsByUserContext();
    const { form, definition, list } = useCategoryList(accoutId);

    return (
        <CategoriesStyle>
            <PeriodContextProvider { ...period }>
                <FormContextProvider { ...form }>
                    <ListContextProvider { ...list }>
                        <Container>
                            <Form>
                                <Input { ...definition.find((field) => field.name === 'title') } />
                            </Form>
                            <Content>
                                <List />
                            </Content>
                        </Container>
                    </ListContextProvider>
                </FormContextProvider>
            </PeriodContextProvider>
        </CategoriesStyle>
    )
};

export default Categories;
