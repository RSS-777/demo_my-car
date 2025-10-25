import styled from "styled-components";

const ButtonStyle = styled.button`
  padding: 2px 10px;
  font-size: 16px;
  line-height: 1.2;
  cursor: pointer;
  background-color: ${({ theme, variant }) =>
    variant === "delete"
      ? theme.colors.button.cardDelete
      : theme.colors.button.cardView};
  color: ${({ theme, variant }) =>
    variant === "delete"
      ? theme.colors.button.cardDeleteText
      : theme.colors.button.cardViewText};
  border: none;
  border-radius: 8px;
  box-shadow: 1px 1px 5px 0 ${({ theme }) => theme.colors.boxShadow.default};

  &:disabled {
    background: ${({ theme }) => theme.colors.button.disabled};
    color: ${({ theme }) => theme.colors.button.text};
    cursor: not-allowed;
  }

  @media (hover: hover) and (pointer: fine) {
    &:not(:disabled):hover {
      background-color: ${({ theme, variant }) =>
        variant === "delete"
          ? theme.colors.button.cardDeleteHover
          : theme.colors.button.cardViewHover};
      box-shadow: 0.2px 0.2px 3px 0
        ${({ theme }) => theme.colors.boxShadow.default};
    }
  }

  @media (hover: none), (pointer: coarse) {
    &:not(:disabled):active {
      background-color: ${({ theme, variant }) =>
        variant === "delete"
          ? theme.colors.button.cardDeleteHover
          : theme.colors.button.cardViewHover};
      box-shadow: 0.2px 0.2px 3px 0
        ${({ theme }) => theme.colors.boxShadow.default};
    }
  }

  @media (max-width: 580px) {
    padding: 4px 12px;
  }
`;

export const ButtonCard = ({
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
