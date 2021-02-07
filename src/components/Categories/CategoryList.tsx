import * as React               from 'react';

import useCategoryTags          from '@providers/category/useCategoryTags';

import { TagContextProvider }   from '@library/Tag/provider/useTagContext';
import Tags                     from '@library/Tag/Tags';

import { Content, Container }   from './Categories.style';

const CategoryList: React.FC = () => {
    const { tags } = useCategoryTags();
    
    return (
        <TagContextProvider { ...tags }>
            <Container>
                <Content>
                    <Tags />
                </Content>
            </Container>
        </TagContextProvider>
    )
};

export default CategoryList;