import styled from "styled-components";
import { Logo } from "./Logo";

const FooterStyle = styled.footer`
  min-height: 95px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 10px;
  margin-top: 10px;

  p {
    font-style: italic;
    text-align: center;
    color: ${({ theme }) => theme.colors.text.subtitle};
    margin: 0;
  }
`;

export const Footer = () => {
  return (
    <FooterStyle>
      <Logo />
      <p>&copy; 2025 MY-CAR. All rights reserved.</p>
    </FooterStyle>
  );
};
