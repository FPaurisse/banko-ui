import * as React           from 'react';

import { usePeriodContext } from '@providers/period/usePeriodContext';
import { NavigationStyle } from './Navigation.style';

const Navigation: React.FC = () => {
    const period = usePeriodContext();

    return (
        <NavigationStyle>
            <p>{ period.month } / { period.year }</p>
            <span>
                <button onClick={ period.previousYear }>--</button>
                <button onClick={ period.previousMonth }>-</button>
                <button onClick={ period.nextMonth }>+</button>
                <button onClick={ period.nextYear }>++</button>
                <button onClick={ period.now }>Mois actuel</button>
            </span>
        </NavigationStyle>
    );
};

export default Navigation;
