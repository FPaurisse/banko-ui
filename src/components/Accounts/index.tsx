import * as React                   from 'react';
import { RouteComponentProps }      from '@reach/router';

import { AccountsStyle }            from './Accounts.style';
import AccountForm                  from './AccountForm';
import AccountList                  from './AccountList';

const Account: React.FC<RouteComponentProps> = () => {

    return (
        <AccountsStyle>
            <AccountForm />
            <AccountList />
        </AccountsStyle>
    )
};

export default Account;
