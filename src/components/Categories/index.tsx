import * as React                   from 'react';
import { RouteComponentProps }      from '@reach/router';

import Form                         from '@library/Form/Form';
import Input                        from '@library/Form/Input';
import { FormContextProvider }      from '@library/Form/provider/useFormContext';
import Modal                        from '@library/Modal/Modal';

import useCategoryTags             from '@providers/category/useCategoryTags';
import { usePeriod }                from '@providers/period/usePeriod';
import { PeriodContextProvider }    from '@providers/period/usePeriodContext';
import { useAccountsByUserContext } from '@providers/account/useAccountsByUserContext';

import { CategoriesStyle, Container, Content } from './Categories.style';
import { TagContextProvider } from '@library/Tag/provider/useTagContext';
import Tags from '@library/Tag/Tags';

const Categories: React.FC<RouteComponentProps> = () => {
    
    const period = usePeriod();
    const { selected: accoutId } = useAccountsByUserContext();
    const { form, definition, tags } = useCategoryTags(accoutId);

    return (
        <CategoriesStyle>
            <PeriodContextProvider { ...period }>
                <FormContextProvider { ...form }>
                    <TagContextProvider { ...tags }>
                        <Container>
                            <Modal>
                                <Form>
                                    <Input { ...definition.find((field) => field.name === 'title') } />
                                </Form>
                            </Modal>
                            <Content>
                                <Tags />
                            </Content>
                        </Container>
                    </TagContextProvider>
                </FormContextProvider>
            </PeriodContextProvider>
        </CategoriesStyle>
    )
};

export default Categories;
