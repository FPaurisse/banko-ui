import styled from 'styled-components';

const CheckboxInputStyle = styled.div<{ $isChecked?: boolean }>`
    display: flex;
    margin: .5rem 0;
        & > input {
            display: none;
        }
        & > label {
            display: flex;
            width: 100%;
            cursor: pointer;
        }
        & > label > span {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            position: relative;
            width: 1rem;
            height: 1rem;
            margin-right: .5rem;
            border: 1px solid #E8ECF1;
            background-color: ${({ $isChecked }) => $isChecked ? '#6C737E': '#FFFFFF'};
            border-radius: 100%;
            font-size: .6rem;
            color: #E8ECF1;
        }
`;

export { CheckboxInputStyle }
