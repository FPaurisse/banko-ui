import * as React                   from 'react';
import { RouteComponentProps }      from '@reach/router';

import { usePeriod }                from '@providers/period/usePeriod';
import { PeriodContextProvider }    from '@providers/period/usePeriodContext';

import { AccountsStyle }            from './Accounts.style';
import AccountForm                  from './AccountForm';
import AccountList                  from './AccountList';

const Account: React.FC<RouteComponentProps> = () => {
    const period = usePeriod();

    return (
        <AccountsStyle>
            <PeriodContextProvider { ...period }>
                <AccountForm />
                <AccountList />
            </PeriodContextProvider>
        </AccountsStyle>
    )
};

export default Account;
