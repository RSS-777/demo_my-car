import styled from "styled-components";
import { darkTheme } from "../styles/theme";

const StatusMessageStyle = styled.p`
  position: absolute;
  bottom: 0;
  margin-bottom: 5px;
  left: 50%;
  transform: translateX(-50%);
  width: 99%;
  display: flex;
  justify-content: center;
  text-align: center;
  font-size: clamp(12px, 5vw, 16px);

  > span {
    padding: 0 15px;
    color: ${({ theme }) => theme.statusMessage.span.text};
`;

export const StatusMessage = ({ children }) => {
  return (
    <StatusMessageStyle>
      <span>{children}</span>
    </StatusMessageStyle>
  );
};
