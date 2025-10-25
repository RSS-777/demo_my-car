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
    outline-style: none;
    border: none;
    width: ${({ $type }) => ($type === "number" ? "110px" : "auto")};
    background-color: ${({ theme }) => theme.colors.form.inputBg};
    color: ${({ theme }) => theme.colors.form.inputText};
    box-shadow: ${({ theme, $type }) =>
      $type === "checkbox"
        ? "none"
        : `1px 1px 3px 0 ${theme.colors.form.inputShadow}`};

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
    flex-direction: column;
    align-items: center;

    input {
      width: ${({ $type }) =>
        $type === "number" ? "110px" : ($type === "checkbox" ? "auto" : "90%")};
    }
  }
`;

export const InputField = ({
  label,
  id,
  type = "text",
  register,
  step,
  defaultValue,
  autoComplete,
  readOnly,
  value,
  checked,
  onChange,
  name,
}) => {
  return (
    <FildStyle $type={type}>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        step={step}
        defaultValue={defaultValue}
        autoComplete={autoComplete}
        readOnly={readOnly}
        {...(type === "checkbox" && checked !== undefined ? { checked } : {})}
        {...(value !== undefined ? { value } : {})}
        {...(onChange ? { onChange } : {})}
        {...(register || { name })}
      />
    </FildStyle>
  );
};
