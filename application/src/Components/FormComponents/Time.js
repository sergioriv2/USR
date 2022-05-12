import { useField, useFormikContext } from "formik";
import DatePicker from "react-datepicker";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";

import "react-datepicker/dist/react-datepicker.css";

const TimePicker = ({ label, ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField({ ...props });

  return (
    <div>
      <label>
        {label}
        <DatePicker
          {...field}
          {...props}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeCaption="Horas"
          dateFormat="h:mm aa"
          minTime={setHours(setMinutes(new Date(), 0), 6)}
          maxTime={setHours(setMinutes(new Date(), 30), 23)}
          selected={field.value}
          onChange={(val) => setFieldValue(field.name, val)}
          strictParsing
        ></DatePicker>
      </label>

      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default TimePicker;
