import { useCallback, useState } from "react";
import { Formik, Form, useFormikContext } from "formik";
import * as Yup from "yup";

import { TextField, Radio, DateField, Select } from "../../../FormComponents";

import useLocalStorage from "../../../../Hooks/useLocalStorage";
import useFetch from "../../../../Hooks/useFetch";

const CreateUser = () => {
  const { data: careers } = useFetch(
    "http://localhost:3001/api/carreras?limit=50"
  );
  const [token] = useLocalStorage("token");
  const [response, setResponse] = useState("");

  const CarrerasAlumno = () => {
    const { values } = useFormikContext();

    if (values.rol === "ADMIN") return null;

    return (
      <div>
        <Select name="carrera" label="Carrera">
          <option value="">Seleccione una carrera</option>
          {careers !== null
            ? careers.map(({ descripcion, uid }) => (
                <option key={uid} value={uid}>
                  {descripcion}
                </option>
              ))
            : null}
        </Select>
      </div>
    );
  };

  const handleSubmit = useCallback(
    (data, resetForm) => {
      const apiEndpoint = "http://localhost:3001/api/usuarios/usuario";

      fetch(apiEndpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-api-key": token,
        },
        body: JSON.stringify(data),
      })
        .then(async (res) => {
          const data = await res.json();
          if (data.ok) resetForm();
          setResponse(data.msg);
        })
        .catch((err) => console.log(err));
    },
    [token]
  );

  const initialValues = {
    nombres: "",
    apellidos: "",
    email: "",
    carrera: "",
    password: "",
    sexo: "HOMBRE",
    fecha_nacimiento: new Date(),
    domicilio: "",
    dni: "",
    rol: "ALUMNO",
  };

  const validationSchema = Yup.object({
    nombres: Yup.string().required("Obligatorio").trim(),
    apellidos: Yup.string().required("Obligatorio").trim(),
    email: Yup.string()
      .required("Obligatorio")
      .trim()
      .email("Ingresa un email válido."),
    password: Yup.string()
      .required("Obligatorio")
      .min(8, "La contraseña es muy corta, ingresa al menos 8 carácteres."),
    fecha_nacimiento: Yup.date().required("Obligatorio"),
    domicilio: Yup.string().required("Obligatorio"),
    dni: Yup.string()
      .required("Obligatorio")
      .max(8, "No puede superar los 8 carácteres."),
  });

  return (
    <div>
      <h1>Crear Nuevo Usuario</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { resetForm }) => handleSubmit(values, resetForm)}
        validationSchema={validationSchema}
      >
        <Form autoComplete="off">
          <Radio name="rol" value="ALUMNO" label="Alumno"></Radio>
          <Radio name="rol" value="DOCENTE" label="Docente"></Radio>
          <Radio name="rol" value="ADMIN" label="Administrador"></Radio>
          <CarrerasAlumno />
          <TextField name="nombres" label="Nombre(s)"></TextField>
          <TextField name="apellidos" label="Apellido(s)"></TextField>
          <TextField name="dni" label="DNI"></TextField>
          <p>Sexo</p>
          <Radio name="sexo" value="HOMBRE" label="Hombre"></Radio>
          <Radio name="sexo" value="MUJER" label="Mujer"></Radio>
          <Radio name="sexo" value="OTRO" label="Otro"></Radio>
          <TextField name="email" label="Email" type="email"></TextField>
          <TextField
            name="password"
            label="Contraseña"
            type="password"
          ></TextField>
          <DateField
            name="fecha_nacimiento"
            label="Fecha de nacimiento"
          ></DateField>
          <TextField name="domicilio" label="Domicilio"></TextField>
          <input type="submit" />
        </Form>
      </Formik>
      <p>{response}</p>
    </div>
  );
};

export default CreateUser;
