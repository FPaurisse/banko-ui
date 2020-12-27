import * as React from 'react';

import { ModalStyle, UnderModal, Wrapper } from './Modal.style';
import { useModalContext } from './provider/useModalContext';

const Modal: React.FC = ({ children }) => {
    const { setOpen, open } = useModalContext();
    
    if (!open) {
        return null;
    }

    return (
        <ModalStyle>
            <UnderModal onClick={ () => setOpen(false) } />
            <Wrapper>
                { children }
            </Wrapper>
        </ModalStyle>
    )
};

export default Modal;
