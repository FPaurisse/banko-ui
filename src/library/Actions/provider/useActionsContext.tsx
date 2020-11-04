import * as React from 'react';
import { useActionsContextValues } from '@library/Actions/provider/useActions';

const ActionsContext = React.createContext<useActionsContextValues>(null);

export const useActionsContext = (): useActionsContextValues => React.useContext(ActionsContext) as useActionsContextValues;

type ActionsProps = useActionsContextValues & {
    children: React.ReactNode;
}

export const ActionsContextProvider: React.FC<ActionsProps> = (props) => {
    const { children, ...rest } = props;
    return (
        <ActionsContext.Provider value={ rest }>
            { children }
        </ActionsContext.Provider>
    )
};
