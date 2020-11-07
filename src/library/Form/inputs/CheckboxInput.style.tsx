import styled from 'styled-components';

const CheckboxInputStyle = styled.div<{ $isChecked?: boolean }>`
    display: flex;
    margin: .3rem 0;
        & > input {
            display: none;
        }
        & > div {
            width: 100%;
            display: flex;
            flex-direction: ${({ $isChecked }) => $isChecked ? 'row' : 'row-reverse'};
        }
        & > div > * {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            padding: .5rem;
            border-style: solid;
            border-color: #DFEEF3;
            outline: none;
        }
        & > div > label {
            cursor: pointer;
            background-color: #FBFBFB;
            border-radius: ${({ $isChecked }) => $isChecked ? '.3rem 0 0 .3rem' : '0 .3rem .3rem 0'};
            border-width: 1px 1px 1px 1px;
        }
        & > div > span {
            border-radius: ${({ $isChecked }) => !$isChecked ? '.3rem 0 0 .3rem' : '0 .3rem .3rem 0'};
            border-width: ${({ $isChecked }) => !$isChecked ? '1px 0 1px 1px' : '1px 1px 1px 0'};;
        }
`;

export { CheckboxInputStyle }
