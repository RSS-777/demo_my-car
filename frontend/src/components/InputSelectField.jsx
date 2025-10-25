import styled from "styled-components";

const FildStyle = styled.div`
  display: flex;
  justify-content: space-between;

  >label {
    margin-right: 10px;
    text-align: left;
  }

  >div {
    display: flex;
    gap: 10px;
    box-sizing: border-box;

    > input {
      width: 110px;
      border-radius: 8px;
      padding: 2px 5px;
      outline-style: none;
      border: none;
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

    > select {
      width: 120px;
      text-align: center;
      border-radius: 8px;
      padding: 2px 0;
      cursor: pointer;
      outline-style: none;
      border: none;
      background-color: ${({ theme }) => theme.colors.form.inputBg};
      color: ${({ theme }) => theme.colors.form.inputText};
      box-shadow: 1px 1px 3px 0 ${({ theme }) => theme.colors.form.inputShadow};

      optgroup {
        color: ${({ theme }) => theme.colors.text.heading3};

        option {
          color: ${({ theme }) => theme.colors.form.inputText};
        }
      }
    }
  }

  @media (max-width: 580px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const InputSelectField = ({
  label,
  id,
  type = "text",
  registerInput,
  registerSelect,
  options,
}) => {
  return (
    <FildStyle>
      <label htmlFor={id}>{label}</label>
      <div>
        <input type={type} id={id} {...registerInput} />
        <select id={`${id}-select`} {...registerSelect}>
          {options.map((opt, ind) => (
            <option value={opt.value} key={ind}>{opt.label}</option>
          ))}
        </select>
      </div>
    </FildStyle>
  );
};
