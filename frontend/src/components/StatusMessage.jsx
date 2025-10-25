import styled from "styled-components";

const StatusMessageStyle = styled.p`
  margin: 0 10px 30px;
  text-align: center;
  font-size: clamp(12px, 5vw, 16px);

  > span {
    padding: 0 15px;
    color: ${({theme}) => theme.colors.text.mistake};
`;

export const StatusMessage = ({ children }) => {
  return (
    <StatusMessageStyle>
      <span>{children}</span>
    </StatusMessageStyle>
  );
};
