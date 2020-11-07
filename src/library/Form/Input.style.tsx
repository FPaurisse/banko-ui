import styled from 'styled-components';

const InputStyle = styled.div<{ $hidden?: boolean }>`
    display: ${({ $hidden }) => $hidden ? 'none' : 'flex'};
    flex-direction: column;
`;

export { InputStyle };
