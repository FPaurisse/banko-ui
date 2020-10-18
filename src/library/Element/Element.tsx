import * as React           from 'react';
import classnames           from 'clsx';

import { DynamicElement }   from '@library/Element/Element.styles';
import { ElementProps }     from '@library/Element';

const Element: React.FC<ElementProps> = (props) => {

    const {
        children,
        className, 
        transparent,
        borderless,
        additional,
        scrollable,
        invisible,
        recessed,
        stretch,
        grouped,
        accent,
        spaced,
        fitted,
        action,
        aside,
        color,
        fluid,
        main,
        row,
        ...rest
    } = props;

    const cx = classnames(className, 'element', {
        transparent,
        borderless,
        additional,
        scrollable,
        invisible,
        recessed,
        stretch,
        grouped,
        accent,
        spaced,
        fitted,
        action,
        aside,
        color,
        fluid,
        main,
        row,
    })

    return (
        <DynamicElement { ...rest } className={ cx }>
            { children }
        </DynamicElement>
    )
}

export default Element;
