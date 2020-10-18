import * as React                   from 'react';
import classnames                   from 'clsx';

import { ElementProps, Element }    from '@library/Element';

const AccordionTitle: React.FC<ElementProps> = (props) => {
    const { active, additional, children, className, onClick, ...rest } = props;

    const cx = classnames(className, 'accordion-title', {
        additional
    })

    return (
        <Element action fitted accent={ active } className={ cx } { ...rest }>
            <Element action stretch borderless onClick={ onClick }>{ children }</Element>
            { additional && <Element borderless>{ additional }</Element> }
        </Element>
    )
}

export default AccordionTitle;
