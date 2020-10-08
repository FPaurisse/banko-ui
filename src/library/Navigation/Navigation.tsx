import * as React           from 'react';

import { usePeriodContext } from '@providers/period/usePeriodContext';

const Navigation: React.FC = () => {
    const vm = usePeriodContext();

    return (
        <React.Fragment>
            <button onClick={ vm.previousYear }>--</button>
            <button onClick={ vm.previousMonth }>-</button>
            <button onClick={ vm.nextMonth }>+</button>
            <button onClick={ vm.nextYear }>++</button>
            <button onClick={ vm.now }>now</button>
        </React.Fragment>
    );
};

export default Navigation;
