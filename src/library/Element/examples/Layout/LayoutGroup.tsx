import * as React                   from 'react';
import classnames                   from 'clsx';

import { ElementProps, Element }    from '@library/Element';

const LayoutGroup: React.FC<ElementProps> = (props) => {
    const { children, className, ...rest } = props;

    const cx = classnames(className, 'layout-group', {})

    return (
        <Element grouped fitted row stretch className={ cx } { ...rest }>
            { children }
        </Element>
    )
}

export default LayoutGroup;
