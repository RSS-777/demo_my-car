import styled from 'styled-components';

const ButtonStyle = styled.button`
   text-decoration: none;
   padding: 6px 20px;
   font-size: clamp(16px, 3vw, 18px);
   border-radius: 15px;
   background: ${({ theme }) => theme.buttonForm.background};
   color: ${({ theme }) => theme.buttonForm.text};
   box-shadow: 2px 2px 8px 0 ${({ theme }) => theme.buttonForm.shadow};
   position: relative;
   z-index: 3;
   border: none;
   cursor: pointer;

   &.disableButton {
        background: ${({theme}) => theme.buttonForm.disableButton.background};
        color: ${({theme}) => theme.buttonForm.disableButton.text};
        cursor: not-allowed;

         &:hover {
            background: ${({theme}) => theme.buttonForm.disableButton.hover.background};
            box-shadow: 2px 2px 8px 0 ${({ theme }) => theme.buttonForm.disableButton.hover.shadow};
            color: ${({ theme }) => theme.buttonForm.disableButton.hover.text};
        }
   }

    &:disabled {
        background: ${({theme}) => theme.buttonForm.disabled.background};
        color: ${({theme}) => theme.buttonForm.disabled.text};
        cursor: not-allowed;
        box-shadow: ${({theme}) => theme.buttonForm.disabled.shadow};

        &:hover {
            background: ${({theme}) => theme.buttonForm.disabled.hover.background};
            color: ${({theme}) => theme.buttonForm.disabled.hover.text};
            box-shadow: ${({theme}) => theme.buttonForm.disabled.hover.shadow};
        }
    }
   
   &:hover {
        background: ${({ theme }) => theme.buttonForm.hover.background};
        box-shadow: 0 0 3px 0 ${({ theme }) => theme.buttonForm.hover.shadow};
        color: ${({ theme }) => theme.buttonForm.hover.text};
   }

    @media (max-width: 580px) {
       padding: 4px 12px;
   }
`;

export const ButtonForm = ({ type = "submit", disabled, className, children, onClick }) => {
    return (
        <ButtonStyle
            type={type}
            disabled={disabled}
            className={className}
            onClick={onClick}
        >
            {children}
        </ButtonStyle>
    )
};