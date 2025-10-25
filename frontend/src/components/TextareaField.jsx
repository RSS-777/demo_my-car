import styled from "styled-components";

const FildStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  > label {
    margin-right: 10px;
    text-align: left;
  }

  > textarea {
    resize: none;
    padding: 2px 5px;
    overflow: auto;
    border-radius: 8px;
    outline-style: none;
    border: none;
    height: 150px;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.form.inputBg};
    color: ${({ theme }) => theme.colors.form.inputText};
    box-shadow: 1px 1px 3px 0 ${({ theme }) => theme.colors.form.inputShadow};

    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
      -webkit-box-shadow: 0 0 0 1000px
          ${({ theme }) => theme.colors.form.inputBg} inset,
        1px 1px 3px 0 ${({ theme }) => theme.colors.form.inputShadow};
      -webkit-text-fill-color: ${({ theme }) =>
        theme.colors.form.inputText} !important;
      transition: background-color 5000s ease-in-out 0s;
    }
  }

  @media (max-width: 580px) {
    label {
      text-align: center;
    }

    textarea {
      width: 90%;
      margin: auto;
    }
  }
`;

export const TextareaField = ({
  label,
  id,
  register,
  defaultValue,
  placeholder,
  name,
  value,
  onChange
}) => {
  return (
    <FildStyle>
      <label htmlFor={id}>{label}</label>
      <textarea
        id={id}
        placeholder={placeholder}
        defaultValue={defaultValue}
        name={name}
        {...(value !== undefined ? { value } : {})}
        {...(register || { name })}
        {...(onChange ? { onChange } : {})}
      />
    </FildStyle>
  );
};
