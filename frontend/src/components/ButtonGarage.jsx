import styled from "styled-components";

const ButtonStyle = styled.button`
  text-decoration: none;
  padding: 12px 40px;
  border-radius: 15px;
  background: ${({ theme }) => theme.buttonGarage.background};
  color: ${({ theme }) => theme.buttonGarage.text};
  box-shadow: 2px 2px 8px 0 ${({ theme }) => theme.buttonGarage.shadow};
  position: relative;
  z-index: 3;
  font-size: 18px;
  border: none;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.buttonGarage.hover.background};
    box-shadow: 0 0 3px 0 ${({ theme }) => theme.buttonGarage.hover.shadow};
    color: ${({ theme }) => theme.buttonGarage.hover.text};
  }

  &:disabled {
    background: ${({ theme }) => theme.buttonGarage.disabled.background};
    color: ${({ theme }) => theme.buttonGarage.disabled.text};
    box-shadow: ${({ theme }) => theme.buttonGarage.disabled.shadow};
    cursor: not-allowed;
  }

  @media (max-width: 580px) {
    padding: 8px 20px;
    min-width: 130px;
  }
`;

export const ButtonGarage = ({ onClick, children, disabled = false }) => {
  return (
    <ButtonStyle type="button" onClick={onClick} disabled={disabled}>
      {children}
    </ButtonStyle>
  );
};
