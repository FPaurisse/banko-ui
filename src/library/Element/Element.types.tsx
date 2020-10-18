import * as React from 'react';

export default interface ElementProps extends React.HTMLAttributes<HTMLDivElement> {
    transparent?: boolean;
    borderless?: boolean;
    additional?: string;
    scrollable?: boolean;
    invisible?: boolean;
    recessed?: boolean;
    stretch?: boolean;
    grouped?: boolean;
    accent?: boolean;
    spaced?: boolean;
    fitted?: boolean;
    aside?: boolean;
    color?: string;
    main?: boolean;
    row?: boolean;
}