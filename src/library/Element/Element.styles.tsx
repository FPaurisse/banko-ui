import styled from 'styled-components';

const StaticElement = styled.div``;

const DynamicElement = styled(StaticElement)`

    /* COMMON */

    width: auto;
    min-width: auto;
    max-width: 100%;
    margin: 0px;
    padding: 1rem;
    height: auto;
    display: flex;
    transition: .2s;
    overflow: hidden;
    position: relative;
    border-radius: .3rem;
    flex-direction: column;
    box-sizing: border-box;
    background-color: #FFFFFF;
    justify-content: flex-start;
    cursor: ${(props) => props.onClick && 'pointer'};
    box-shadow: 1px 0 0 0 #E1E1E1, // left
                0 1px 0 0 #E1E1E1, // bottom
                1px 1px 0 0 #E1E1E1, // bottom-left corner
                1px 0 0 0 #E1E1E1 inset, // right
                0 1px 0 0 #E1E1E1 inset; // top

    &:hover {
        transition: .2s;
        background-color: ${(props) => props.onClick && '#F9F9F9'};
    }

    &:after {
        content: '';
        box-shadow: 0 1px 0 0 #E1E1E1 inset; // top
        position: absolute;
        width: 100%;
        height: 1px;
        left: 0;
        top: 0;
    }

    /* VARIANTS */

    &.invisible {
        display: none;
    }

    &.additional {
        justify-content: space-between;
        flex-direction: row;
    }

    &.spaced {
        margin: 1rem;
    }

    &.scrollable {
        overflow: auto;
    }

    &.fitted {
        padding: 0px;
        & > ${StaticElement}{
            border-radius: 0px;
            margin: 0px;
        }
    }

    &.aside {
        width: 320px;
        min-width: 320px;
        max-width: 320px;
    }

    &.row {
        flex-direction: row;
        & > ${StaticElement}{
            width: 100%;
        }
    }

    &.stretch {
        flex: 1 1 100%;
    }

    &.recessed {
        border-radius: 0px;
    }

    &.accent {
        background-color: #F9F9F9;
    }

    &.transparent {
        background: transparent;
        &:hover{
            background: transparent;
        }
        & > ${StaticElement}{
            background: transparent;
            &:hover{
                background: transparent;
            }
        }
    }

    &.grouped {
        & > ${StaticElement}{
            border-radius: 0px;
        }
    }

    &.color {
        box-shadow: 1px 0 0 0 #E1E1E1, // left
                    0 1px 0 0 #E1E1E1, // bottom
                    1px 1px 0 0 #E1E1E1, // bottom-left corner
                    1px 0 0 0 #E1E1E1 inset, // right
                    0 3px 0 0 #27ABDC inset; // top
        &:after {
            height: 3px;
            box-shadow: 0 3px 0 0 #27ABDC inset; // top
        }
    }

    &.borderless {
        background: transparent;
        box-shadow: 0 0 0 0 transparent;
        &:after {
            height: 0px;
            box-shadow: 0 0 0 0 transparent;
        }
        & > ${StaticElement}{
            box-shadow: 0 0 0 0 transparent;
            &:after {
                height: 0px;
                box-shadow: 0 0 0 0 transparent;
            }
        }
    }

    &.main {
        padding: 0px;
        height: 100vh;
        border-radius: 0px;
        box-shadow: 0 0 0 0 transparent;
        &:after{
            height: 0px;
            box-shadow: 0 0 0 0 transparent;
        }
    }

`;

export { DynamicElement };
