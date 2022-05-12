import { useField } from "formik";

const CheckBox = ({ children, ...props }) => {
  const [field] = useField({ ...props, type: "checkbox" });
  return (
    <div>
      <label>
        <input type="checkbox" {...field} {...props} />
        {children}
      </label>
    </div>
  );
};

export default CheckBox;
