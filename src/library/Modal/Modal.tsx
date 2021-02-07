import * as React                           from 'react';

import { useKeyboardEvent }                 from '@library/utils';

import { useModalContext }                  from './provider/useModalContext';

import { ModalStyle, UnderModal, Wrapper }  from './Modal.style';

const Modal: React.FC = ({ children }) => {
    const { setOpen, open } = useModalContext();
    
    useKeyboardEvent('Escape', () => {
        setOpen(false);
    });
    
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
