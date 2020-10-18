import * as React                   from 'react';
import classnames                   from 'clsx';

import { ElementProps, Element }    from '@library/Element';

const LayoutFooter: React.FC<ElementProps> = (props) => {
    const { children, className, ...rest } = props;

    const cx = classnames(className, 'layout-footer', {})

    return (
        <Element className={ cx } { ...rest }>
            { children }
        </Element>
    )
}

export default LayoutFooter;
