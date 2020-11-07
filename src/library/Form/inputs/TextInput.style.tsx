import styled from 'styled-components';

const TextInputStyle = styled.div`
    display: flex;
    margin: .5rem 0;
        & > input {
            display: flex;
            width: 100%;
            padding: .5rem;
            border-radius: .3rem;
            border-style: solid;
            border-width: 1px 1px 1px 1px;
            border-color: #DFEEF3 #DFEEF3 #DFEEF3 #DFEEF3;
            background-color: #FBFBFB;
            outline: none;
        }
`;

export { TextInputStyle }
