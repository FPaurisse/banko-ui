import * as React                   from 'react';
import classnames                   from 'clsx';

import { ElementProps, Element }    from '@library/Element';

const AccordionGroup: React.FC<ElementProps> = (props) => {
    const { children, className, ...rest } = props;

    const cx = classnames(className, 'accordion-group', {})

    return (
        <Element fitted grouped stretch className={ cx } { ...rest }>
            { children }
        </Element>
    )
}

export default AccordionGroup;
