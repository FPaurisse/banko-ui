import styled from 'styled-components';

const FormStyle = styled.form<{ $hidden?: boolean }>`
    display: ${({ $hidden }) => $hidden ? 'none' : 'flex'};
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
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

    & > span:first-child > h3 {
        margin: .5rem 0 1rem 0;
    }

    & > span:last-child {
        display: flex;
        justify-content: space-between;
    }
`;

export { FormStyle };
