import * as React                   from 'react';
import { RouteComponentProps }      from '@reach/router';

import { usePeriod }                from '@providers/period/usePeriod';
import { PeriodContextProvider }    from '@providers/period/usePeriodContext';

import { CategoriesStyle }          from './Categories.style';
import CategoryForm                 from './CategoryForm';
import CategoryList                 from './CategoryList';

const Categories: React.FC<RouteComponentProps> = () => {
    const period = usePeriod();

    return (
        <CategoriesStyle>
            <PeriodContextProvider { ...period }>
                <CategoryForm />
                <CategoryList />
            </PeriodContextProvider>
        </CategoriesStyle>
    )
};

export default Categories;
