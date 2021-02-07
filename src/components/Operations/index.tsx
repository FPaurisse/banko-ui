import * as React                       from 'react';
import { RouteComponentProps }          from '@reach/router';

import { usePeriod }                    from '@providers/operation/period/usePeriod';
import { PeriodContextProvider }        from '@providers/operation/period/usePeriodContext';
import { useOperationSave }             from '@providers/operation/useOperationSave';
import useOperationsList                from '@providers/operation/useOperationsList';

import { Container, OperationsStyle }   from './Operations.style';
import OperationForm                    from './OperationForm';
import OperationList                    from './OperationList';

const Operations: React.FC<RouteComponentProps> = () => {
    const period                        = usePeriod();
    const { form, definition, save }    = useOperationSave(period);
    const { list }                      = useOperationsList(period, form);

    return (
        <OperationsStyle>
            <PeriodContextProvider { ...period }>
                <Container>
                    <OperationForm form={ form } definition={ definition } save={ save } />
                    <OperationList list={ list } />
                </Container>
            </PeriodContextProvider>
        </OperationsStyle>
    )
};

export default Operations;
