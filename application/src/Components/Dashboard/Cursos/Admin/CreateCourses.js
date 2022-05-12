import { Formik, Form, useFormikContext } from "formik";
import { useCallback, useEffect, useState } from "react";

import * as Yup from "yup";

import useFetch from "../../../../Hooks/useFetch";
import useLocalStorage from "../../../../Hooks/useLocalStorage";
import styled from "styled-components";

import {
  TextField,
  Select,
  Radio,
  DateField,
  TimePicker,
} from "../../../FormComponents";

const Container = styled.div`
  & > form {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    min-height: 85vh;
  }
`;

const CareerDetails = styled.div`
  width: 50%;

  & > div {
    margin: 0;
    margin-bottom: 25px;
  }
`;
const CareerDates = styled.div``;

const SelectMateria = () => {
  const { values, setFieldValue } = useFormikContext();
  const {
    data: materias,
    loading,
    refetch,
  } = useFetch(
    `http://localhost:3001/api/materias/carrera/${values.carrera}?limit=50`
  );

  useEffect(() => {
    setFieldValue("materia", "");
    refetch();
  }, [values.carrera, refetch, setFieldValue]);

  return (
    <Select label="Materia" name="materia">
      <option value=""> Seleccione una materia</option>
      {loading
        ? null
        : materias.map(({ nombre, uid }) => (
            <option key={uid} value={uid}>
              {nombre}
            </option>
          ))}
    </Select>
  );
};

const Horarios = () => {
  const { values, setFieldValue } = useFormikContext();

  if (!values.horario.dias) return null;

  return (
    <div>
      {values.horario.dias.map((dia, index) => {
        return (
          <div key={dia}>
            <p>{dia}</p>
            <TimePicker
              label="Inicio"
              name={`horario.horas[${index}].inicio`}
              onBlur={() => setFieldValue(`horario.horas[${[index]}].dia`, dia)}
            ></TimePicker>
            <TimePicker
              label="Fin"
              name={`horario.horas[${index}].fin`}
            ></TimePicker>
          </div>
        );
      })}
    </div>
  );
};

const AltaCursos = () => {
  const [token] = useLocalStorage("token");
  const [response, setResponse] = useState("");

  const { data: careers } = useFetch(
    "http://localhost:3001/api/carreras?limit=50"
  );

  const initialValues = {
    carrera: "",
    materia: "",
    nombre: "",
    horario: {
      dias: [],
      horas: [
        {
          dia: "",
          inicio: "",
          fin: "",
        },
      ],
    },
    cuatrimestre: "1",
    fechas: {
      inscripcion: {
        inicio: "",
        fin: "",
      },
      cursada: {
        inicio: "",
        fin: "",
      },
    },
  };

  const validationSchema = Yup.object({
    carrera: Yup.string().required("Selecciona una carrera.").trim(),
    materia: Yup.string().required("Selecciona una materia.").trim(),
    nombre: Yup.string().required("Obligatorio").trim(),
    horario: Yup.object().shape({
      dias: Yup.array().min(1, "Selecciona una opción."),
      horas: Yup.array().of(
        Yup.object().shape({
          inicio: Yup.date()
            .required("Obligatorio")
            .typeError("Ingresa una fecha valida."),
          fin: Yup.date()
            .required("Obligatorio")
            .typeError("Ingresa una fecha valida."),
        })
      ),
    }),
    fechas: Yup.object().shape({
      inscripcion: Yup.object().shape({
        inicio: Yup.date()
          .required("Obligatorio")
          .typeError("Ingresa una fecha valida."),
        fin: Yup.date()
          .required("Obligatorio")
          .typeError("Ingresa una fecha valida."),
      }),
      cursada: Yup.object().shape({
        inicio: Yup.date()
          .required("Obligatorio")
          .typeError("Ingresa una fecha valida."),
        fin: Yup.date()
          .required("Obligatorio")
          .typeError("Ingresa una fecha valida."),
      }),
    }),
  });

  const handleSubmit = useCallback(
    (submit, resetForm) => {
      const { carrera, materia, ...data } = submit;

      fetch(
        `http://localhost:3001/api/cursos/curso/carrera/${carrera}/materia/${materia}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-api-key": token,
          },
          body: JSON.stringify(data),
        }
      )
        .then(async (res) => {
          const data = await res.json();
          setResponse(data.msg);

          if (data.ok) resetForm();
        })
        .catch((err) => console.log(err));
    },
    [token]
  );

  return (
    <Container>
      <h1>Agregar un Nuevo Curso</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { resetForm }) => handleSubmit(values, resetForm)}
        validationSchema={validationSchema}
      >
        <Form autoComplete="off" spellCheck="false">
          <CareerDetails>
            <h3>Datos del Curso</h3>
            <TextField name="nombre" label="Nombre"></TextField>

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
            <SelectMateria />

            <div>
              <h3>Cuatrimestre</h3>
              <Radio name="cuatrimestre" value="1" label="1° Cuatrimestre" />
              <Radio name="cuatrimestre" value="2" label="2° Cuatrimestre" />
            </div>
          </CareerDetails>
          <CareerDates>
            <h3>Fechas importantes</h3>
            <div>
              <h4>Inscripciones del Curso</h4>
              <p>Inicio</p>
              <DateField
                name="fechas.inscripcion.inicio"
                label="Mes"
              ></DateField>
              <DateField name="fechas.inscripcion.fin" label="Día"></DateField>
            </div>

            <div>
              <h4>Duración de la Cursada</h4>
              <DateField
                name="fechas.cursada.inicio"
                label="Inicio"
              ></DateField>
              <DateField name="fechas.cursada.fin" label="Fin"></DateField>
            </div>
            <div>
              <h4>Horarios de Cursada</h4>
              <Select label="Dias" name="horario.dias" multiple>
                <option value="Lunes">Lunes</option>
                <option value="Martes">Martes</option>
                <option value="Miercoles">Miércoles</option>
                <option value="Jueves">Jueves</option>
                <option value="Viernes">Viernes</option>
              </Select>
            </div>

            <Horarios></Horarios>
          </CareerDates>

          <input type="submit" value="Submit" />
        </Form>
      </Formik>
      <p>{response}</p>
    </Container>
  );
};

export default AltaCursos;
