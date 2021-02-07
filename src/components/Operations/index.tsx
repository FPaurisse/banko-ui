import * as React                       from 'react';
import { RouteComponentProps }          from '@reach/router';

import { usePeriod }                    from '@providers/operation/period/usePeriod';
import { PeriodContextProvider }        from '@providers/operation/period/usePeriodContext';

import { Container, OperationsStyle }   from './Operations.style';
import OperationForm                    from './OperationForm';
import OperationList                    from './OperationList';

const Operations: React.FC<RouteComponentProps> = () => {
    const period                        = usePeriod();

    return (
        <OperationsStyle>
            <PeriodContextProvider { ...period }>
                <Container>
                    <OperationForm />
                    <OperationList />
                </Container>
            </PeriodContextProvider>
        </OperationsStyle>
    )
};

export default Operations;
