import { useField } from "formik";

import styled from "styled-components";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  justify-content: center;
  height: auto;
  margin-top: 15px;
  margin-bottom: 25px;
`;

const Label = styled.label`
  margin: 5px 0;
  font-weight: 700;
  color: #5b5b5d;
  text-transform: uppercase;
`;

const Input = styled.input`
  &:focus {
    border: 2px solid #3096db;
  }

  &:not(:focus) {
    border: ${(params) =>
      params.meta.touched && params.meta.error
        ? "2px solid #BF4342;"
        : "1px solid rgba(0, 0, 0, 0.16);"};
  }

  margin: 5px 0;
  padding: 12px 10px;
  font-family: inherit;
  outline: 0;
  border-radius: 7px;
  transition: all 0.1s;
`;

const ErrorMessage = styled.p`
  color: #bf4342;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 15px;
  margin: 0;
  margin-top: 10px;
  font-family: "Quicksand", sans-serif;
`;

const InputField = ({
  label,
  type = "text",
  min,
  max,
  disabled = false,
  ...props
}) => {
  const [field, meta] = useField(props);
  return (
    <Layout>
      <Label>{label}</Label>
      <Input
        meta={meta}
        {...field}
        disabled={disabled}
        type={type}
        min={min}
        max={max}
      ></Input>
      {meta.touched && meta.error ? (
        <ErrorMessage>{meta.error}</ErrorMessage>
      ) : null}
    </Layout>
  );
};

export default InputField;
