import logoImage from '../assets/images/logo/logo-service2.png';
import logoWhiteImage from '../assets/images/logo/logo-serviceWhite.png';
import styled from "styled-components";
import { useSelector } from 'react-redux';

const FooterStyle = styled.footer`
  position: relative;
  background: ${({ theme }) => theme.footer.background};
  margin-bottom: 0;
  height: 115px;
  border-top: 1px solid ${({ theme }) => theme.footer.border};;

  >div {
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.footer.div.text};

    div {
      width: 76px;
      padding: 18px;

      img  {
        width: 100%;
      }
    }
  }

  p {
    text-align: center;
    margin-top: 0;
    padding-bottom: 10px;
    
    color: ${({ theme }) => theme.footer.p.text};
    font-size: 18px;

    @media (max-width: 580px) {
      font-size: 16px;
    }
  }
`;


export const Footer = () => {
  const theme = useSelector((action) => action.theme.value)

  return (
    <FooterStyle>
      <div>
        <div>
          <img src={theme === 'light' ? logoImage : logoWhiteImage} alt="Image logo brand" />
        </div>
        <span>MY-CAR</span>
      </div>
      <p>&copy; 2025 MY-CAR. All rights reserved.</p>
    </FooterStyle>
  )
};