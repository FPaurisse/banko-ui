import * as React                   from 'react';
import classnames                   from 'clsx';

import { ElementProps, Element }    from '@library/Element';

const AccordionContent: React.FC<ElementProps> = (props) => {
    const { active, children, className, ...rest } = props;

    const cx = classnames(className, 'accordion-content', {})

    return (
        <Element stretch={ active } invisible={ !active } className={ cx } { ...rest }>
            { children }
        </Element>
    )
}

export default AccordionContent;
