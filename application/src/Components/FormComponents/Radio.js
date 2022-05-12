import { useField } from "formik";
import styled from "styled-components";

const Layout = styled.div``;

const Label = styled.label`
  & > input {
    margin-right: 20px;
  }

  background-color: white;
  margin: 10px 0;
  width: 200px;
  display: flex;
  font-size: 15px;
  justify-content: center;
  align-items: center;
  height: 55px;
  border-radius: 8px;

  transition: border .3s;

  border: ${(props) =>
    !props.selected ? "2px solid rgb(0, 0, 0, 0.2);" : "2px solid #3096db;"}

  cursor: pointer;
`;

const Radio = ({ label, ...props }) => {
  const [field] = useField({ ...props, type: "radio" });

  return (
    <Layout>
      <Label selected={field.checked}>
        <input type="radio" {...field} {...props} />
        {label}
      </Label>
    </Layout>
  );
};

export default Radio;
