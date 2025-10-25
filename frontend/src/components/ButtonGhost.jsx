import styled from "styled-components";

const ButtonStyle = styled.button`
  position: relative;
  background-color: transparent;
  cursor: pointer;
  border: none;
  color: ${({ theme}) => theme.colors.text.linkActive};
  padding: 0;

  &::after {
    content: "";
    display: block;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: -3px;
    width: 0;
    height: 1.5px;
    background-color: ${({ theme }) => theme.colors.background.linkHover};
    transition: width 0.5s ease;
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover::after {
      width: 80%;
    }
  }
`;
export const ButtonGhost = ({ children, type = "button", onClick }) => {
  return (
    <ButtonStyle type={type} onClick={onClick}>
      {children}
    </ButtonStyle>
  );
};
