import styled from 'styled-components';

const OperationsStyle = styled.div`
    display: flex;
    flex: 0 0 100%;
    flex-direction: column;
    overflow: hidden;
`;

const Container = styled.div`
    display: flex;
    height: 100%;
    max-height: 100%;
    overflow: hidden;
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow: hidden;
`;

const Footer = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    margin: 0.5rem;
    background-color: #FFFFFF;
    border: 1px solid #DFEEF3;
    box-shadow: 0px 0px 5px #EBEBEB;
    border-radius: .3rem;
    box-sizing: border-box;
`;

export { OperationsStyle, Container, Content, Footer };
