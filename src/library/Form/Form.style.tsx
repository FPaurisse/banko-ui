import styled from 'styled-components';

const FormStyle = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    background-color: #FFFFFF;
    border: 1px solid #DFEEF3;
    overflow: auto;
    box-shadow: 0px 0px 5px #EBEBEB;
    margin: .5rem;
    padding: 1rem;
    border-radius: .3rem;
    min-width: 300px;

    & > * {
        width: 100%;
    }
`;

export { FormStyle };
