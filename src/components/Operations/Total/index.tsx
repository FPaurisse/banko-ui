import * as React           from 'react';
import { useTotalContext }  from '@providers/operation/total/useTotalContext';
import { TotalStyle }       from './Total.style';

const Total: React.FC = () => {
    const total = useTotalContext();

    return (
        <TotalStyle>
            <span>
                Actuel : { total.actual }€ |
            </span>
            <span>
                | Réel : { total.real }€
            </span>
        </TotalStyle>
    );
};

export default Total;
