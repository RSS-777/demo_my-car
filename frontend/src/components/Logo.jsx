import styled from "styled-components";
import { useSelector } from "react-redux";
import logoServiceDefault from "../assets/images/logo/logo-service.png";
import logoServiceInverted from "../assets/images/logo/logo-service2.png";

const LogoBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  position: relative;
  z-index: 6;
  
  width:fit-content;
  height: 28px;

  img {
    width: 28px;
    height: 28px;
  }

  span {
    text-transform: uppercase;
    font-weight: 800;
    font-style: italic;
  }

  span:last-child {
    color: ${({ theme }) => theme.colors.text.linkActive};
  }
`;

export const Logo = () => {
  const theme = useSelector((state) => state.theme.value);

  return (
    <LogoBlock>
      <img
        src={theme === "light" ? logoServiceDefault : logoServiceInverted}
        alt="Image logo"
        width={28}
        height={28}
      />
      <span>my</span>
      <span>car</span>
    </LogoBlock>
  );
};
