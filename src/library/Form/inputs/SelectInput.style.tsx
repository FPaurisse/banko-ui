import styled from 'styled-components';

const SelectInputStyle = styled.div`
    display: flex;
    flex-direction: column;
    margin: .3rem 0;
        & > label {
            margin-bottom: .3rem;
        }
        & > select {
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

export { SelectInputStyle }
