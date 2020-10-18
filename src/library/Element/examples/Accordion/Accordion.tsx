import * as React                           from 'react';
import classnames                           from 'clsx';

import { ElementProps, Element }            from '@library/Element';
import AccordionTitle                       from '@library/Element/examples/Accordion/AccordionTitle';
import AccordionContent                     from '@library/Element/examples/Accordion/AccordionContent';
import AccordionGroup                       from '@library/Element/examples/Accordion/AccordionGroup';

interface AccordionStaticComponents {
    Title?: typeof AccordionTitle;
    Content?: typeof AccordionContent;
    Group?: typeof AccordionGroup;
}

const Accordion: React.FC<ElementProps> & AccordionStaticComponents = (props) => {
    const { active, className, children, ...rest } = props;

    const cx = classnames(className, 'accordion', {})

    return (
        <Element fitted grouped stretch={ active } className={ cx } { ...rest }>
            { children }
        </Element>
    )
};

Accordion.Title     = AccordionTitle;
Accordion.Content   = AccordionContent;
Accordion.Group     = AccordionGroup;

export default Accordion;
