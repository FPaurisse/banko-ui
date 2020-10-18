import styled from 'styled-components';

const ElementStyle = styled.div<{ $borderless?: boolean, $additional?: string, $hidden?: boolean, $transparent?: boolean, $scrollable?: boolean, $accent?: boolean, $spaced?: boolean, $main?: boolean, $stretch?: boolean, $aside?: boolean, $fitted?: boolean, $row?: boolean, $recessed?: boolean, $grouped?: boolean, $color?: boolean }>``;

const Element = styled(ElementStyle)`

    /* COMMON */
    transition: .2s;
    position: relative;
    box-sizing: border-box;
    cursor: ${(props) => props.onClick && 'pointer'};

    &:hover {
        transition: .2s;
        background-color: ${(props) => props.onClick && '#F9F9F9'};
    }

    &:after {
        content: '';
        position: absolute;
        width: 100%;
        left: 0;
        top: 0;
    }

    /* VARIANTS */
    display: ${({ $hidden }) => $hidden ? 'none' : 'flex'};
    justify-content: ${({ $additional }) => $additional ? 'space-between' : 'flex-start'};
    margin: ${({ $spaced }) => $spaced ? '1rem' : '0px'};
    overflow: ${({ $scrollable }) => $scrollable ? 'auto' : 'hidden'};;
    padding: ${({ $fitted, $main }) => ($fitted || $main) ? '0px' : '1rem'};
    width: ${({ $aside }) => $aside ? '320px' : 'auto'};
    min-width: ${({ $aside }) => $aside ? '320px' : 'auto'};
    max-width: ${({ $aside }) => $aside ? '320px' : '100%'};
    height: ${({ $main }) => $main ? '100vh' : 'auto'};
    flex-direction: ${({ $row, $additional }) => ($row || $additional) ? 'row' : 'column'};
    flex: ${({ $stretch }) => $stretch && '1 1 100%'};
    border-radius: ${({ $recessed, $main }) => ($recessed || $main) ? '0' : '.3rem'};
    background-color: ${({ $accent }) => $accent ? '#F9F9F9' : '#FFFFFF'};
    background: ${({ $transparent, $borderless }) => ($transparent || $borderless) && 'none'};
    box-shadow: 1px 0 0 0 ${({ $borderless }) => $borderless ? 'transparent' : '#E1E1E1'}, // left
                0 1px 0 0 ${({ $borderless }) => $borderless ? 'transparent' : '#E1E1E1'}, // bottom
                1px 1px 0 0 ${({ $borderless }) => $borderless ? 'transparent' : '#E1E1E1'}, // bottom left corner
                1px 0 0 0 ${({ $borderless }) => $borderless ? 'transparent' : '#E1E1E1'} inset, // right
                0 ${({ $color }) => $color ? '3px' : '1px'} 0 0 ${({ $color }) => $color ? '#27ABDC' : '#E1E1E1'} inset; // top
    box-shadow: ${({ $borderless, $main }) => ($borderless || $main) && '0 0 0 0 transparent'};

    & > ${ElementStyle} {
        background: ${({ $transparent }) => $transparent && 'transparent'};
        border-radius: ${({ $grouped }) => $grouped && '0'};
        width: ${({ $row }) => $row && '100%'};
        box-shadow: ${({ $borderless }) => $borderless && '0 0 0 0 transparent'};
        border-radius: ${({ $fitted }) => $fitted && '0' };
        margin: ${({ $fitted }) => $fitted && '0px'};
        &:hover {
            background: ${({ $transparent }) => $transparent && 'transparent'};
        }
        &:after {
            height: ${({ $borderless }) => $borderless && '0px'};
            box-shadow: ${({ $borderless }) => $borderless && '0 0 0 0 transparent'};
        }
    }
    
    &:hover {
        background: ${({ $transparent }) => $transparent && 'transparent'};
    }

    &:after {
        height: ${({ $color }) => $color ? '3px' : '1px'};
        height: ${({ $borderless, $main }) => ($borderless || $main) && '0px'};
        box-shadow: 0 ${({ $color }) => $color ? '3px' : '1px'} 0 0 ${({ $color }) => $color ? '#27ABDC' : '#E1E1E1'} inset; // top
        box-shadow: ${({ $borderless, $main }) => ($borderless || $main) && '0 0 0 0 transparent'};
    }

`;

export { Element };
