import * as React               from 'react';
import { RouteComponentProps }  from '@reach/router';

import Accordion                from '@library/Element/examples/Accordion/Accordion';
import { ElementProps }         from '@library/Element';

const View: React.FC<RouteComponentProps & ElementProps> = (props) => {
    const { ...rest } = props;
    const [active, setActive] = React.useState<number>(0);

    return (
        <Accordion.Group color='primary' spaced { ...rest }>
            <Accordion active={ active === 1 }>
                <Accordion.Title active={ active === 1 } onClick={ () => setActive(1) } additional='Button 1'>
                    Accordion title 1
                </Accordion.Title>
                <Accordion.Content active={ active === 1 }>
                    Accordion content 1
                </Accordion.Content>
            </Accordion>
            <Accordion active={ active === 2 }>
                <Accordion.Title active={ active === 2 } onClick={ () => setActive(2) } additional='Button 2'>
                    Accordion title 2
                </Accordion.Title>
                <Accordion.Content active={ active === 2 }>
                    Accordion content 2
                </Accordion.Content>
            </Accordion>
            <Accordion active={ active === 3 }>
                <Accordion.Title active={ active === 3 } onClick={ () => setActive(3) } additional='Button 3'>
                    Accordion title 3
                </Accordion.Title>
                <Accordion.Content active={ active === 3 }>
                    Accordion content 3
                </Accordion.Content>
            </Accordion>
        </Accordion.Group>
    )
}

export default View;
