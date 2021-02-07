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
import { useUserContext } from '@providers/user/useUserContext';
import { useCategorySave } from '@providers/category/useCategorySave';

const Categories: React.FC<RouteComponentProps> = () => {
    
    const period = usePeriod();
    const { selected: accountId } = useAccountsByUserContext();
    const { user } = useUserContext();
    const { tags } = useCategoryTags(accountId);
    const { form, definition, save } = useCategorySave(accountId, user._id);

    return (
        <CategoriesStyle>
            <PeriodContextProvider { ...period }>
                <FormContextProvider { ...form }>
                    <Modal>
                        <Form>
                            <Input { ...definition.find((field) => field.name === 'title') } />
                            <button onClick={ save }>Valider</button>
                        </Form>
                    </Modal>
                </FormContextProvider>
                <TagContextProvider { ...tags }>
                    <Container>
                        <Content>
                            <Tags />
                        </Content>
                    </Container>
                </TagContextProvider>
            </PeriodContextProvider>
        </CategoriesStyle>
    )
};

export default Categories;
