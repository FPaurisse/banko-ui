import * as React from 'react';
import { useModalContextValues } from '@library/Modal/provider/useModal';

const ModalContext = React.createContext<useModalContextValues>(null);

export const useModalContext =  (): useModalContextValues => React.useContext(ModalContext) as useModalContextValues;

type ModalProps = useModalContextValues & {
    children: React.ReactNode;
}

export const ModalContextProvider: React.FC<ModalProps> = (props) => {
    const { children, ...rest } = props;
    return (
        <ModalContext.Provider value={ rest }>
            { children }
        </ModalContext.Provider>
    )
};
