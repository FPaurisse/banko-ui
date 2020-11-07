import styled from 'styled-components';

const ListStyle = styled.div`
    box-sizing: border-box;
    margin: .5rem 0;
    padding: 0 .5rem;
    overflow: auto;
    height: 100%;
`;

const Item = styled.div<{ $isPassed?: boolean, $isChecked?: boolean }>`
    display: flex;
    align-items: center;
    background-color: ${({ $isChecked }) => $isChecked ? '#FBFBFB': '#FFFFFF'};
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
    margin: .2rem 0;
    padding: 0 .2rem;
    border-radius: .3rem;
    cursor: pointer;
    border-style: solid;
    border-width: 1px 1px 1px 5px;
    border-color: #DFEEF3 #DFEEF3 #DFEEF3 ${({ $isPassed }) => $isPassed ? '#7BC0A3': '#E8ECF1'};
    &:hover{
        background-color: #FBFBFB;
        box-shadow: 0px 0px 5px #EBEBEB;
    }
`;

const ItemCheck = styled.span<{ $isChecked?: boolean }>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 1rem;
    height: 1rem;
    border: 1px solid #E8ECF1;
    background-color: ${({ $isChecked }) => $isChecked ? '#6C737E': '#FFFFFF'};
    border-radius: 100%;
    font-size: .6rem;
    color: #E8ECF1;
`;

const ItemDetail = styled.span`
    display: flex;
    padding: .5rem 0;
    flex: 1;
`;

const ItemActions = styled.span`
    display: flex;
`;

const Loading = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
`;

export { ListStyle, Item, ItemCheck, ItemDetail, ItemActions, Loading };
