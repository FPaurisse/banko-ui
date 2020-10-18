import * as React                   from 'react';
import classnames                   from 'clsx';

import { ElementProps, Element }    from '@library/Element';

const LayoutAside: React.FC<ElementProps> = (props) => {
    const { children, className, ...rest } = props;

    const cx = classnames(className, 'layout-aside', {})

    return (
        <Element aside className={ cx } { ...rest }>
            { children }
        </Element>
    )
}

export default LayoutAside;
