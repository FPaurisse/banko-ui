import styled from 'styled-components';

const CategoriesStyle = styled.div`
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

export { CategoriesStyle, Container, Content };
