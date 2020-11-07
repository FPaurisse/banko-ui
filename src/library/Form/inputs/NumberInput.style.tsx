import styled from 'styled-components';

const NumberInputStyle = styled.div`
    display: flex;
    margin: .5rem 0;
    & > input {
        display: flex;
        width: 100%;
        padding: .5rem;
        border-radius: 0;
        border-style: solid;
        border-width: 1px 0 1px 0;
        border-color: #DFEEF3 #DFEEF3 #DFEEF3 #DFEEF3;
        background-color: #FBFBFB;
        outline: none;
    }
    & > span {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: .5rem 0;
        width: 2.5rem;
        border-style: solid;
        border-width: 1px 1px 1px 1px;
        border-color: #DFEEF3 #DFEEF3 #DFEEF3 #DFEEF3;
    }
    & > span:first-child {
        border-radius: .3rem 0 0 .3rem;
    }
    & > span:last-child {
        border-radius: 0 .3rem .3rem 0;
    }
`;

export { NumberInputStyle };
