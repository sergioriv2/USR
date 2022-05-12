import { useField } from "formik";
import styled from "styled-components";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  justify-content: center;
  height: auto;
`;

const Label = styled.label`
  margin: 5px 0;
  font-weight: 500;
  color: #5b5b5d;
  text-transform: uppercase;
`;

const SelectInput = styled.select`
  margin: 5px 0;
  width: 300px;
  padding: 15px 10px;
  font-family: inherit;
  cursor: pointer;
  outline: 0;
  border-radius: 7px;
  font-overflow: ellipsis;
  border: 1px solid rgb(0, 0, 0, 0.16);

  &:focus {
    border: 2px solid #3096db;
  }

  ${(props) =>
    !props?.multiple
      ? ` background: url("data:image/svg+xml,<svg height='10px' width='10px' viewBox='0 0 16 16' fill='%0' xmlns='http://www.w3.org/2000/svg'><path d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/></svg>")
    no-repeat;
  background-position: calc(100% - 0.85rem) center !important;
  background-color: white;
  -moz-appearance: none !important;
  -webkit-appearance: none !important;
  appearance: none !important;
  padding-right: 1.6rem !important;`
      : null}
`;

const ImportantSpan = styled.span`
  color: #bf1363;
  font-weight: bold;
`;

const ErrorMessage = styled.p`
  color: #4062cc;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 14px;
  margin: 0;
  margin-top: 10px;
  font-family: "Quicksand", sans-serif;
`;

const Select = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <Layout>
      <Label>
        <ImportantSpan>* </ImportantSpan>
        {label}
      </Label>
      <SelectInput {...field} {...props} selected={meta.touched} />
      {meta.touched && meta.error ? (
        <ErrorMessage>{meta.error}</ErrorMessage>
      ) : null}
    </Layout>
  );
};

export default Select;
