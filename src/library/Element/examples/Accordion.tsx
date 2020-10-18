import * as React                           from 'react';
import { RouteComponentProps }              from '@reach/router';

import { ElementProps, Element, Layout }    from '@library/Element';

const Accordion: React.FC<RouteComponentProps & ElementProps> = (props) => {
    const { ...rest } = props;
    const [active, setActive] = React.useState<number>(0);

    return (
        <React.Fragment>
            { /* Accordion.Group */ }
            <Element fitted grouped stretch spaced { ...rest }>
                { /* Accordion */ }
                <Element fitted grouped stretch={ active === 1 }>
                    { /* Accordion.Title */ }
                    <Element accent={ active === 1 } onClick={ () => setActive(1) } additional='Button 1'>
                            Accordion title 1
                    </Element>
                    { /* Accordion.Content */ }
                    <Element stretch={ active === 1 } invisible={ active !== 1 }>
                            Accordion content 1
                    </Element>
                </Element>
                { /* Accordion */ }
                <Element fitted grouped stretch={ active === 2 }>
                    { /* Accordion.Title */ }
                    <Element accent={ active === 2 } onClick={ () => setActive(2) } additional='Button 2'>
                            Accordion title 2
                    </Element>
                    { /* Accordion.Content */ }
                    <Element stretch={ active === 2 } invisible={ active !== 2 }>
                        Accordion content 2
                    </Element>
                </Element>
                { /* Accordion */ }
                <Element fitted grouped stretch={ active === 3 }>
                    { /* Accordion.Title */ }
                    <Element accent={ active === 3 } onClick={ () => setActive(3) } additional='Button 2'>
                            Accordion title 3
                    </Element>
                    { /* Accordion.Content */ }
                    <Element stretch={ active === 2 } fitted invisible={ active !== 3 }>
                        <Layout color='primary' />
                    </Element>
                </Element>
            </Element>
        </React.Fragment>
    )
};

export default Accordion;
