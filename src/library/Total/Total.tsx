import * as React from 'react';
import { useTotalContext } from '@providers/total/useTotalContext';
import { TotalStyle } from './Total.style';

const Total: React.FC = () => {
    const total = useTotalContext();

    return (
        <TotalStyle>
            Actuel : { total.actual }€
            <br />
            Réel : { total.real }€
        </TotalStyle>
    );
};

export default Total;
