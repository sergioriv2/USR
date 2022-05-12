import { Formik, Form } from "formik";
import { DateField, Select } from "../../Components/FormComponents";
import { useState } from "react";
import * as Yup from "yup";

import useFetch from "../../Hooks/useFetch";
import CareersStatsDataTable from "../../Components/DataTable/CareersStatsDataTable";

const initialValues = {
  carrera: "",
  fecha: new Date(),
};

const StatsViews = () => {
  const { data: careers } = useFetch(
    "http://localhost:3001/api/carreras?limit=50"
  );

  const [statsQuery, setStatsQuery] = useState(null);

  const handleSubmit = async (values) => {
    const newData = {
      carrera: values.carrera,
      fecha: {
        month: values.fecha.getMonth() + 1,
        year: values.fecha.getFullYear(),
      },
    };

    setStatsQuery(newData);
  };

  return (
    <section>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => handleSubmit(values)}
        validationSchema={Yup.object({
          carrera: Yup.string().required("Obligatorio."),
          fecha: Yup.date().required("Obligatorio."),
        })}
      >
        <Form autoComplete="off">
          <Select label="Carrera" name="carrera">
            <option value="">Seleccione una carrera</option>
            {careers !== null
              ? careers.map(({ descripcion, uid }) => (
                  <option key={uid} value={uid}>
                    {descripcion}
                  </option>
                ))
              : null}
          </Select>
          <DateField
            label="Fecha"
            name="fecha"
            dateFormat="MM/yyyy"
          ></DateField>
          <input type="submit" value="Submit" />
        </Form>
      </Formik>
      {statsQuery !== null ? (
        <CareersStatsDataTable bodyQuery={statsQuery} />
      ) : null}
    </section>
  );
};

export default StatsViews;
