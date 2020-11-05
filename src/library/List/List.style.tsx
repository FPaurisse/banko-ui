import styled from 'styled-components';

const ListStyle = styled.div`
    box-sizing: border-box;
    margin: .5rem 0;
    padding: 0 .5rem;
    overflow: auto;
    height: 100%;
`;

const Item = styled.label`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #FFFFFF;
    border: 1px solid #DFEEF3;
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
    margin: .2rem 0;
    padding: .2rem;
    border-radius: .3rem;
    cursor: pointer;
    &:hover{
        box-shadow: 0px 0px 5px #EBEBEB;
    }
`;

export { ListStyle, Item };
