import styled from 'styled-components';

const AppStyle = styled.div`
    display: flex;
    height: 100vh;
    background-color: #F1F5F8;
`;

const HeaderStyle = styled.div`
    display: flex;
    flex-direction: column;
    width: 200px;
    background-color: #FFFFFF;
    border: 1px solid #DFEEF3;
    box-shadow: 0px 0px 5px #EBEBEB;
`;

const MainStyle = styled.div`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    width: 100%;
    overflow: hidden;
    padding: .5rem;
`;

export { AppStyle, HeaderStyle, MainStyle };
