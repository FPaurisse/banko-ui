import * as React from 'react';
import { useTotalContext } from '@providers/total/useTotalContext';

const Total: React.FC = () => {
    const total = useTotalContext();

    return (
        <React.Fragment>
            Actuel : { total.actual }€
            <br />
            Réel : { total.real }€
        </React.Fragment>
    );
};

export default Total;
