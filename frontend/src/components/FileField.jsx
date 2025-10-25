import styled from "styled-components";

const FildStyle = styled.div`
  display: flex;
  justify-content: space-between;

  > label {
    margin-right: 10px;
    text-align: left;
  }

  > input {
    border-radius: 8px;
    padding: 2px 5px;
    outline: none;
    border: none;
    position: relative;
    z-index: 1;
    width: 250px;
    height: 24px;
    font-size: 14px;
    box-shadow: 1px 1px 3px 0 ${({ theme }) => theme.colors.form.inputShadow};

    &::-webkit-file-upload-button {
      visibility: hidden;
    }

    &::before {
      position: absolute;
      z-index: 2;
      left: 0;
      top: 0;
      content: "${(props) => props.$nameInput}";
      width: 110px;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 8px 0 0 8px;
      cursor: pointer;
      background-color: ${({ theme }) => theme.colors.form.inputBg};
      color: ${({ theme }) => theme.colors.form.placeholder};
    }

    &::after {
      position: absolute;
      right: 0;
      top: 0;
      content: "${(prop) =>
        prop.$nameFile ? prop.$nameFile : prop.$nameNotFile}";
      width: 145px;
      height: 100%;
      background-color: ${({ theme }) => theme.colors.form.overlay};
      color: ${({ theme }) => theme.colors.text.reverse};
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding: 0 8px;
      box-sizing: border-box;
      line-height: 24px;
      text-align: center;
    }

    @media (hover: hover) and (pointer: fine) {
      &:hover::before {
        color: ${({ theme }) => theme.colors.text.linkActive};
      }
    }

    @media (hover: none), (pointer: coarse) {
      &:active::before {
        color: ${({ theme }) => theme.colors.text.linkActive};
      }
    }
  }

  @media (max-width: 580px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const FileField = ({
  label,
  id,
  register,
  nameFile,
  nameInput,
  nameNotFile,
}) => {
  return (
    <FildStyle
      $nameFile={nameFile}
      $nameInput={nameInput}
      $nameNotFile={nameNotFile}
    >
      <label htmlFor={id}>{label}</label>
      <input type="file" id={id} {...register} />
    </FildStyle>
  );
};
