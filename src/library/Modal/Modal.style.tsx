import styled from 'styled-components';

const ModalStyle = styled.div`
    justify-content: center;
    align-items: center;
    position: fixed;
    z-index: 10000;
    display: flex;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
`;

const UnderModal = styled.div`
    background-color: #000000;
    position: absolute;
    cursor: pointer;
    height: 100%;
    width: 100%;
    opacity: .8;
    z-index: 0;
    left: 0;
    top: 0;
`;

const Wrapper = styled.div`
    z-index: 1;
`;

export { ModalStyle, UnderModal, Wrapper };