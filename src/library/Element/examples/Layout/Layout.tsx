import * as React                   from 'react';
import classnames                   from 'clsx';

import { ElementProps, Element }    from '@library/Element';
import LayoutHeader                 from '@library/Element/examples/Layout/LayoutHeader';
import LayoutGroup                  from '@library/Element/examples/Layout/LayoutGroup';
import LayoutContent                from '@library/Element/examples/Layout/LayoutContent';
import LayoutAside                  from '@library/Element/examples/Layout/LayoutAside';
import LayoutFooter                 from '@library/Element/examples/Layout/LayoutFooter';

interface LayoutStaticComponents {
    Header?: typeof LayoutHeader;
    Group?: typeof LayoutGroup;
    Content?: typeof LayoutContent;
    Aside?: typeof LayoutAside;
    Footer?: typeof LayoutFooter;
}

const Layout: React.FC<ElementProps> & LayoutStaticComponents = (props) => {
    const { className, children, ...rest } = props;

    const cx = classnames(className, 'layout', {})

    return (
        <Element fitted grouped stretch className={ cx } { ...rest }>
            { children }
        </Element>
    )
};

Layout.Header   = LayoutHeader;
Layout.Group    = LayoutGroup;
Layout.Content  = LayoutContent;
Layout.Aside    = LayoutAside;
Layout.Footer   = LayoutFooter;

export default Layout;
