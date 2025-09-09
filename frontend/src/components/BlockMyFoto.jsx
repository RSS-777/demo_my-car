import myFoto from '../assets/images/myFoto/myFoto.jpg';
import styled from 'styled-components';

const BlockImageStyle = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 2px 2px 16px 2px ${({theme}) => theme.blockImage.shadow};

  img {
    width: 100%;
    max-width: 100%;
  }
`;

export const BlockMyFoto = () => {
    return (
        <BlockImageStyle>
            <img src={myFoto} alt="Image is my photo" />
        </BlockImageStyle>
    )
};