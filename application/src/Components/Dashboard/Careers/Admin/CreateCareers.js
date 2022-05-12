import { Formik, Form } from "formik";
import { TextField, Radio, Select } from "../../../FormComponents";

import useLocalStorage from "../../../../Hooks/useLocalStorage";
import useFetch from "../../../../Hooks/useFetch";

const AltaCarreras = () => {
  const [token] = useLocalStorage("token");

  // const { refetch } = useFetchGetData("http://localhost:3001/api/carreras");

  const { data: materias } = useFetch("http://localhost:3001/api/materias");

  const submitCareer = (data) => {
    fetch(`http://localhost:3001/api/carreras/carrera`, {
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
        // refetch();
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  const submitMateria = async (data) => {
    await Promise.all(
      data.materias.map(async (materia) => {
        fetch(`http://localhost:3001/api/materias/materia/${materia}`, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-api-key": token,
          },
          body: JSON.stringify(data),
        })
          .then(async (res) => {
            const data = await res.json();
            // refetch();
            console.log(data);
          })
          .catch((err) => console.log(err));
      })
    );
  };

  const submitData = (data) => {
    submitCareer(data);
    submitMateria(data);
    console.log(data);
  };

  const initialValues = {
    descripcion: "",
    horas_totales: "",
    cupo: {
      max: "",
      min: "",
    },
    duracion: "",
    mensualidad: 0,
    nivel: "INGENIERIA",
    materias: [],
  };

  // TODO: Usar yup para validar

  return (
    <div>
      <h1>Agregar una Nueva Carrera</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => submitData(values)}
      >
        <Form>
          <p>Nivel de la carrera</p>
          <Radio name="nivel" value="INGENIERIA" label="INGENIERIA"></Radio>
          <Radio name="nivel" value="LICENCIATURA" label="LICENCIATURA"></Radio>
          <Radio name="nivel" value="TECNICATURA" label="TECNICATURA"></Radio>
          <TextField
            name="descripcion"
            label="Nombre de la carrera"
          ></TextField>
          <TextField
            name="horas_totales"
            label="Horas totales de la carrera"
            type="number"
            min="1"
          ></TextField>
          <p>Vacantes de la carrera</p>
          <TextField
            name="cupo.max"
            label="MAX Vacantes"
            type="number"
            min="1"
          ></TextField>
          <TextField
            name="cupo.min"
            label="MIN Vacantes"
            type="number"
            min="1"
          ></TextField>
          <TextField
            name="duracion"
            label="Duracion (en años) de la carrera"
            type="number"
            min="1"
          ></TextField>
          <TextField
            name="mensualidad"
            label="Mensualidad (Si no tiene, no ingresar nada)"
            min="0"
            type="number"
          ></TextField>
          <Select multiple label="Materias" name="materias">
            {materias.map((materia) => (
              <option value={materia.uid} key={materia.uid}>
                {materia.nombre}
              </option>
            ))}
          </Select>
          <input type="submit" />
        </Form>
      </Formik>
    </div>
  );
};

export default AltaCarreras;
