import * as React                   from 'react';
import { RouteComponentProps }      from '@reach/router';

import { CategoriesStyle }          from './Categories.style';
import CategoryForm                 from './CategoryForm';
import CategoryList                 from './CategoryList';

const Categories: React.FC<RouteComponentProps> = () => {

    return (
        <CategoriesStyle>
            <CategoryForm />
            <CategoryList />
        </CategoriesStyle>
    )
};

export default Categories;
