import styled from "styled-components";

const ErrorStyle = styled.div`
  line-height: 16px;
  font-size: 12px;
  min-height: 16px;
  text-align: right;
  color: ${({ theme }) => theme.colors.text.mistake};

  @media (max-width: 580px) {
    text-align: center;
  }
`;

export const InputError = ({ error }) => {
  return <ErrorStyle>{error}</ErrorStyle>;
};
