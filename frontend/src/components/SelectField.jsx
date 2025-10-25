import styled from "styled-components";

const FildStyle = styled.div`
  display: flex;
  justify-content: space-between;

  > label {
    margin-right: 10px;
    text-align: left;
  }

  > select {
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

  @media (max-width: 580px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const SelectField = ({
  id,
  label,
  name,
  register,
  options,
  value,
  onChange,
}) => {
  return (
    <FildStyle>
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        name={name}
        {...(register || {})}
        {...(value !== undefined ? { value } : {})}
        {...(onChange ? { onChange } : {})}
      >
        {options.map((opt, index) =>
          opt.groupLabel ? (
            <optgroup label={opt.groupLabel} key={index}>
              {opt.options.map((o, ind) => (
                <option value={o.value} key={ind}>
                  {o.label}
                </option>
              ))}
            </optgroup>
          ) : (
            <option value={opt.value}>{opt.label}</option>
          )
        )}
      </select>
    </FildStyle>
  );
};
