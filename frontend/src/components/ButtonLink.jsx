import { Link } from "react-router-dom";
import styled from "styled-components";

const ButtonStyle = styled(Link)`
  text-decoration: none;
  padding: 6px 20px;
  font-size: clamp(16px, 3vw, 18px);
  cursor: pointer;
  background-color: ${({ theme, variant }) =>
    variant === "header"
      ? theme.colors.button.header
      : theme.colors.button.default};
  color: ${({ theme }) => theme.colors.button.text};
  border: none;
  border-radius: 15px;
  box-shadow: 1px 1px 5px 0 ${({ theme }) => theme.colors.boxShadow.default};

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background-color: ${({ theme, variant }) =>
        variant === "header"
          ? theme.colors.button.headerHover
          : theme.colors.button.hover};
      box-shadow: 0.2px 0.2px 3px 0
        ${({ theme }) => theme.colors.boxShadow.default};
    }
  }

  @media (hover: none), (pointer: coarse) {
    &:active {
      background-color: ${({ theme, variant }) =>
        variant === "header"
          ? theme.colors.button.headerHover
          : theme.colors.button.hover};
      box-shadow: 0.2px 0.2px 3px 0
        ${({ theme }) => theme.colors.boxShadow.default};
    }
  }

  &.activeUserTariff {
    pointer-events: none;
  }

  @media (max-width: 580px) {
    padding: 4px 12px;
  }
`;

export const ButtonLink = ({ to, children, className, variant }) => {
  return (
    <ButtonStyle
      to={to}
      className={className}
      variant={variant}
    >
      {children}
    </ButtonStyle>
  );
};
