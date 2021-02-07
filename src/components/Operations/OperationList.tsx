import * as React from 'react';
import List                         from '@library/List/List';
import { ListContextProvider }      from '@library/List/provider/useListContext';

import useOperationsList            from '@providers/operation/useOperationsList';
import { TotalContextProvider }     from '@providers/total/useTotalContext';

import Total                        from '@components/Operations/Total';
import Navigation                   from '@components/Operations/Navigation';   
import Actions                      from '@components/Operations/Actions';

import { Content, Footer } from './Operations.style';

const OperationList: React.FC = () => {
    const { list, total } = useOperationsList();
    
    return (
        <ListContextProvider { ...list }>
            <Content>
                <Navigation />
                <Actions />
                <List />
                <Footer>
                    <TotalContextProvider { ...total }>
                        <Total />
                    </TotalContextProvider>
                </Footer>
            </Content>
        </ListContextProvider>
    )
};

export default OperationList;