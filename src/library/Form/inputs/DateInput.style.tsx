import styled from 'styled-components';

const DateInputStyle = styled.div`
    display: flex;
    margin: .3rem 0;
        & > input {
            display: flex;
            width: 100%;
            padding: .5rem;
            border-radius: .3rem;
            border-style: solid;
            border-width: 1px;
            border-color: #DFEEF3;
            background-color: #FBFBFB;
            outline: none;
        }
`;

export { DateInputStyle }
