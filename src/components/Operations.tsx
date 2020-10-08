import * as React                   from 'react';
import { RouteComponentProps }      from '@reach/router';

import Form                         from '@library/Form/Form';
import Navigation                   from '@library/Navigation/Navigation';
import List                         from '@library/List/List';
import { FormContextProvider }      from '@library/Form/provider/useFormContext';

import { usePeriod }                from '@providers/period/usePeriod';
import { PeriodContextProvider }    from '@providers/period/usePeriodContext';
import useOperationsList            from '@providers/operation/useOperationsList';
import { ListContextProvider }      from '@library/List/provider/useListContext';
import Input                        from '@library/Form/Input';

const Operations: React.FC<RouteComponentProps> = () => {
    const period = usePeriod();
    const { form, definition, list } = useOperationsList();

    return (
        <React.Fragment>
            <FormContextProvider { ...form }>
                <Form action={ form.actions.create }>
                    <Input { ...definition.find((field) => field.name === 'title') } />
                    <Input { ...definition.find((field) => field.name === 'amount') } />
                    <Input { ...definition.find((field) => field.name === 'date') } />
                </Form>
            </FormContextProvider>
            <PeriodContextProvider { ...period }>
                <Navigation />
                <ListContextProvider { ...list }>
                    <List />
                </ListContextProvider>
            </PeriodContextProvider>
        </React.Fragment>
    )
};

export default Operations;
