import * as React                   from 'react';
import { RouteComponentProps }      from '@reach/router';

import { ElementProps, Element }    from '@library/Element';

const Layout: React.FC<RouteComponentProps & ElementProps> = (props) => {
    const { ...rest } = props;
    return (
        <React.Fragment>
            { /* Layout */ }
            <Element fitted grouped stretch { ...rest }> 
                { /* Layout.Header */ }
                <Element>Layout header</Element>
                { /* Layout.Content */ }
                <Element>Layout content</Element>
                { /* Layout.Group */ }
                <Element grouped fitted row stretch>
                    { /* Layout.Aside */ }
                    <Element aside>Aside</Element>
                    { /* Layout.Content */ }
                    <Element fitted>
                        { /* Layout */ }
                        <Element fitted grouped stretch> 
                            { /* Layout.Header */ }
                            <Element>Layout header</Element>
                            { /* Layout.Content */ }
                            <Element>Layout content</Element>
                            { /* Layout.Content */ }
                            <Element>Layout content</Element>
                            { /* Layout.Group */ }
                            <Element grouped fitted row stretch>
                                { /* Layout.Aside */ }
                                <Element aside accent>Aside</Element>
                                { /* Layout.Content */ }
                                <Element>Content</Element>
                            </Element>
                            { /* Layout.Footer */ }
                            <Element>Layout footer</Element>
                        </Element>
                    </Element>
                </Element>
                { /* Layout.Footer */ }
                <Element>Layout footer</Element>
            </Element>
        </React.Fragment>
    )
};

export default Layout;
