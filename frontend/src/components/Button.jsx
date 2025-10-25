import styled from "styled-components";

const ButtonStyle = styled.button`
  padding: 6px 20px;
  font-size: clamp(16px, 3vw, 18px);
  line-height: 1.5;
  cursor: pointer;
  background-color: ${({ theme, variant }) =>
    variant === "header"
      ? theme.colors.button.header
      : theme.colors.button.default};
  color: ${({ theme }) => theme.colors.button.text};
  border: none;
  border-radius: 15px;
  box-shadow: 1px 1px 5px 0 ${({ theme }) => theme.colors.boxShadow.default};

  &:disabled {
    background: ${({ theme }) => theme.colors.button.disabled};
    color: ${({ theme }) => theme.colors.button.text};
    cursor: not-allowed;
  }

  @media (hover: hover) and (pointer: fine) {
    &:not(:disabled):hover {
      background-color: ${({ theme, variant }) =>
        variant === "header"
          ? theme.colors.button.headerHover
          : theme.colors.button.hover};
      box-shadow: 0.2px 0.2px 3px 0
        ${({ theme }) => theme.colors.boxShadow.default};
    }
  }

  @media (hover: none), (pointer: coarse) {
    &:not(:disabled):active {
      background-color: ${({ theme, variant }) =>
        variant === "header"
          ? theme.colors.button.headerHover
          : theme.colors.button.hover};
      box-shadow: 0.2px 0.2px 3px 0
        ${({ theme }) => theme.colors.boxShadow.default};
    }
  }

  @media (max-width: 580px) {
    padding: 4px 12px;
  }
`;

export const Button = ({
  type = "button",
  onClick,
  children,
  disabled = false,
  variant,
}) => {
  return (
    <ButtonStyle
      type={type}
      onClick={onClick}
      disabled={disabled}
      variant={variant}
    >
      {children}
    </ButtonStyle>
  );
};
