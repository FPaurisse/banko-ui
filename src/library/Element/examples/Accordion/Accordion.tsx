import * as React                           from 'react';
import { RouteComponentProps }              from '@reach/router';

import { ElementProps, Element, Layout }    from '@library/Element';
import AccordionTitle                       from '@library/Element/examples/Accordion/AccordionTitle';
import AccordionContent                     from '@library/Element/examples/Accordion/AccordionTitle';

interface AccordionStaticComponents {
    Title?: typeof AccordionTitle;
    Content?: typeof AccordionContent;
}

const Accordion: React.FC<RouteComponentProps & ElementProps> & AccordionStaticComponents = (props) => {
    const { ...rest } = props;
    const [active, setActive] = React.useState<number>(0);

    return (
        <React.Fragment>
            { /* Accordion.Group */ }
            <Element fitted grouped stretch { ...rest }>
                { /* Accordion */ }
                <Element fitted grouped stretch={ active === 1 }>
                    { /* Accordion.Title */ }
                    <AccordionTitle active={ active === 1 } onClick={ () => setActive(1) } additional='Button 1'>
                            Accordion title 1
                    </AccordionTitle>
                    { /* Accordion.Content */ }
                    <Element stretch={ active === 1 } invisible={ active !== 1 }>
                            Accordion content 1
                    </Element>
                </Element>
                { /* Accordion */ }
                <Element fitted grouped stretch={ active === 2 }>
                    { /* Accordion.Title */ }
                    <AccordionTitle active={ active === 2 } onClick={ () => setActive(2) } additional='Button 2'>
                            Accordion title 2
                    </AccordionTitle>
                    { /* Accordion.Content */ }
                    <Element stretch={ active === 2 } invisible={ active !== 2 }>
                        Accordion content 2
                    </Element>
                </Element>
                { /* Accordion */ }
                <Element fitted grouped stretch={ active === 3 }>
                    { /* Accordion.Title */ }
                    <AccordionTitle active={ active === 3 } onClick={ () => setActive(3) } additional='Button 3'>
                            Accordion title 3
                    </AccordionTitle>
                    { /* Accordion.Content */ }
                    <Element stretch={ active === 2 } fitted invisible={ active !== 3 }>
                        <Layout />
                    </Element>
                </Element>
            </Element>
        </React.Fragment>
    )
};

Accordion.Title    = AccordionTitle;
Accordion.Content = AccordionContent;

export default Accordion;
