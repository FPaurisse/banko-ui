import * as React           from 'react';

import { usePeriodContext } from '@providers/period/usePeriodContext';
import { NavigationStyle } from './Navigation.style';

const Navigation: React.FC = () => {
    const period = usePeriodContext();

    return (
        <NavigationStyle>
            <p>{ period.month } / { period.year }</p>
            <button onClick={ period.previousYear }>--</button>
            <button onClick={ period.previousMonth }>-</button>
            <button onClick={ period.nextMonth }>+</button>
            <button onClick={ period.nextYear }>++</button>
            <button onClick={ period.now }>now</button>
        </NavigationStyle>
    );
};

export default Navigation;
