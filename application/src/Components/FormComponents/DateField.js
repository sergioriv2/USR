import { useField, useFormikContext } from "formik";
import DatePicker from "react-datepicker";
import es from "date-fns/locale/es";

import "react-datepicker/dist/react-datepicker.css";

const DateField = ({ label, dateFormat = "dd/MM/yyyy", ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField({ ...props });

  return (
    <div>
      <label>{label}</label>
      <DatePicker
        dateFormat={dateFormat}
        {...field}
        {...props}
        locale={es}
        selected={field.value}
        onChange={(val) => setFieldValue(field.name, val)}
        showMonthYearPicker={dateFormat === "MM/yyyy" ? true : false}
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        strictParsing
      ></DatePicker>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default DateField;
