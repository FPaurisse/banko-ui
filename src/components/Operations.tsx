import * as React                   from 'react';
import { RouteComponentProps }      from '@reach/router';

import Form                         from '@library/Form/Form';
import List                         from '@library/List/List';
import Input                        from '@library/Form/Input';
import Total                        from '@library/Total/Total';
import Navigation                   from '@library/Navigation/Navigation';
import { ListContextProvider }      from '@library/List/provider/useListContext';
import { FormContextProvider }      from '@library/Form/provider/useFormContext';

import { usePeriod }                from '@providers/period/usePeriod';
import { PeriodContextProvider }    from '@providers/period/usePeriodContext';
import useOperationsList            from '@providers/operation/useOperationsList';
import { TotalContextProvider }     from '@providers/total/useTotalContext';
import { useTotal }                 from '@providers/total/useTotal';

const Operations: React.FC<RouteComponentProps> = () => {
    const period                        = usePeriod();
    const { form, definition, list }    = useOperationsList(period);
    const total                         = useTotal(period, form.loading, list.loading);

    return (
        <React.Fragment>
            <PeriodContextProvider { ...period }>
                <FormContextProvider { ...form }>
                    <Form>
                        <Input { ...definition.find((field) => field.name === 'title') } />
                        <Input { ...definition.find((field) => field.name === 'isCredit') } />
                        <Input { ...definition.find((field) => field.name === 'amount') } />
                        <Input { ...definition.find((field) => field.name === 'date') } />
                        <Input { ...definition.find((field) => field.name === 'isPassed') } />
                    </Form>
                    <Navigation />
                    <ListContextProvider { ...list }>
                        <List />
                    </ListContextProvider>
                </FormContextProvider>
                <TotalContextProvider { ...total }>
                    <Total />
                </TotalContextProvider>
            </PeriodContextProvider>
        </React.Fragment>
    )
};

export default Operations;
