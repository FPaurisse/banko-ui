import * as React from 'react';
import moment from 'moment';

export type PeriodContextValues = {
    month: string;
    year: string;
    nextMonth: () => void;
    previousMonth: () => void;
    nextYear: () => void;
    previousYear: () => void;
    now: () => void;
};

export const usePeriod = (): PeriodContextValues => {
    const [period, setPeriod] = React.useState<string>(moment().format());

    const nextMonth = (): void => {
        setPeriod(moment(period).add( 1, 'months').format())
    }

    const previousMonth = (): void => {
        setPeriod(moment(period).add( -1, 'months').format())
    }

    const nextYear = (): void => {
        setPeriod(moment(period).add( 1, 'years').format())
    }

    const previousYear = (): void => {
        setPeriod(moment(period).add( -1, 'years').format())
    }

    const now = (): void => {
        setPeriod(moment().format())
    }
    
    return {
        month: moment(period).format('MM'),
        year: moment(period).format('YYYY'),
        nextMonth,
        previousMonth,
        nextYear,
        previousYear,
        now
    };
};
