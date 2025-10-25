import styled from "styled-components";

const ButtonStyle = styled.button`
  padding: 2px 10px;
  font-size: 16px;
  line-height: 1.2;
  cursor: pointer;
  background-color: ${({ theme, active }) =>
    active ? theme.colors.button.tabActive : theme.colors.button.tab};
  color: ${({ theme, active }) =>
    active ? theme.colors.button.tabTextActive : theme.colors.button.tabText};
  border: none;
  border-bottom: 3px solid transparent;
  border-radius: 5px 5px 0 0;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      border-bottom: 3px solid ${({ theme }) => theme.colors.button.tabHover};
    }
  }

  @media (hover: none), (pointer: coarse) {
    &:not(:disabled):active {
      border-bottom: 3px solid ${({ theme }) => theme.colors.button.tabHover};
    }
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
    background-color: ${({ theme }) => theme.colors.button.disabled};
  }

  @media (max-width: 580px) {
    padding: 4px 12px;
  }
`;

export const ButtonTabs = ({
  type = "button",
  onClick,
  children,
  active,
  disabled,
}) => {
  return (
    <ButtonStyle
      type={type}
      onClick={onClick}
      active={active}
      disabled={disabled}
    >
      {children}
    </ButtonStyle>
  );
};
