import * as React from 'react';
import List                         from '@library/List/List';
import { ListContextProvider }      from '@library/List/provider/useListContext';

import { OperationListProvider }    from '@providers/operation/useOperationsList';
import { TotalContextProvider }     from '@providers/operation/total/useTotalContext';
import { useTotal }                 from '@providers/operation/total/useTotal';

import Total                        from '@components/Operations/Total';
import Navigation                   from '@components/Operations/Navigation';   
import Actions                      from '@library/Actions';

import { Content, Footer }          from './Operations.style';

const OperationList: React.FC<OperationListProvider> = ({ list }) => {
    const total = useTotal();
    
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