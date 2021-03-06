import * as React   from 'react';
import moment       from 'moment';
import { debounce } from 'lodash';

export type PeriodContextValues = {
    month: string;
    year: string;
    loading: boolean;
    nextMonth: () => void;
    previousMonth: () => void;
    nextYear: () => void;
    previousYear: () => void;
    now: () => void;
    setPeriod: React.Dispatch<React.SetStateAction<string>>;
};

export const usePeriod = (): PeriodContextValues => {
    const [period, setPeriod] = React.useState<string>(moment().format());
    const [loading, setLoading] = React.useState<boolean>(true);

    const nextMonth = (): void => {
        setLoading(true)
        const debounced = debounce(() => setPeriod(moment(period).add(1, 'months').format()), 150);
        debounced();        
    }

    const previousMonth = (): void => {
        setLoading(true)
        const debounced = debounce(() => setPeriod(moment(period).add( -1, 'months').format()), 150);
        debounced();       
    }

    const nextYear = (): void => {
        setLoading(true)
        const debounced = debounce(() => setPeriod(moment(period).add( 1, 'years').format()), 150);
        debounced();    
    }

    const previousYear = (): void => {
        const debounced = debounce(() => setPeriod(moment(period).add( -1, 'years').format()), 150);
        debounced();            
    }

    const now = (): void => {
        setLoading(true)
        const debounced = debounce(() => setPeriod(moment().format()), 150);
        debounced();
    }

    React.useEffect(() => {
        setLoading(true)
    }, [])

    React.useEffect(() => {
        if (loading) {
            const debounced = debounce(() => setLoading(false), 500);
            debounced();
        }
    }, [loading])

    return {
        month: moment(period).format('MM'),
        year: moment(period).format('YYYY'),
        loading,
        nextMonth,
        previousMonth,
        nextYear,
        previousYear,
        now,
        setPeriod
    };
};
