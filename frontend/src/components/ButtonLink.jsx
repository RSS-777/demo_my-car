import { Link } from "react-router-dom";
import styled from "styled-components";

const ButtonStyle = styled(Link)`
  text-align: center;
  text-decoration: none;
  padding: 6px 20px;
  font-size: clamp(16px, 3vw, 18px);
  background: ${({ theme }) => theme.buttonLink.background};
  color: ${({ theme }) => theme.buttonLink.text};
  border-radius: 15px;
  box-shadow: 2px 2px 8px 0 ${({ theme }) => theme.buttonLink.shadow};
  position: relative;
  z-index: 3;

  &:hover {
    background: ${({ theme }) => theme.buttonLink.hover.background};
    box-shadow: 0 0 3px 0 ${({ theme }) => theme.buttonLink.hover.shadow};
    color: ${({ theme }) => theme.buttonLink.hover.text};
  }

  &.activeUserTariff {
    background: ${({ theme }) => theme.buttonLink.active.background};
    box-shadow: 0 0 3px 0 ${({ theme }) => theme.buttonLink.active.shadow};
    color: ${({ theme }) => theme.buttonLink.active.text};
    pointer-events: none;
  }

  @media (max-width: 580px) {
    padding: 4px 12px;
  }
`;

export const ButtonLink = ({ to, children, onClick, className }) => {
  return (
    <ButtonStyle to={to} onClick={onClick} className={className}>
      {children}
    </ButtonStyle>
  );
};
