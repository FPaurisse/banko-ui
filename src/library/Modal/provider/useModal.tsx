import * as React from 'react';

export type useModalContextValues = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const useModal = (): useModalContextValues => {
    const [open, setOpen] = React.useState<boolean>(false);

    return ({
        open,
        setOpen
    })
};
