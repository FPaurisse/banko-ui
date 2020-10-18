import * as React                   from 'react';
import classnames                   from 'clsx';

import { ElementProps, Element }    from '@library/Element';

const LayoutContent: React.FC<ElementProps> = (props) => {
    const { children, className, ...rest } = props;

    const cx = classnames(className, 'layout-content', {})

    return (
        <Element className={ cx } { ...rest }>
            { children }
        </Element>
    )
}

export default LayoutContent;
