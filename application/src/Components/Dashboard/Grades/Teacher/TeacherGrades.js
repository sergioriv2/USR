import styled from "styled-components";
import { useState } from "react";
import { useSelector } from "react-redux";
import useFetch from "../../../../Hooks/useFetch";
import TeacherGradesDataTable from "../../../DataTable/TeachersGradesDataTable";

const Layout = styled.div``;

const TeacherGrades = () => {
  const { entity } = useSelector(({ user }) => user);

  const [cursoSeleccionado, setCursoSeleccionado] = useState("");

  const { data: cursos, error } = useFetch(
    `http://localhost:3001/api/notas/curso/${cursoSeleccionado}`
  );

  const { data: cursosLista } = useFetch(
    `http://localhost:3001/api/cursos/usuario/${entity._id}`
  );

  if (entity?.rol !== "DOCENTE") return null;

  return (
    <Layout>
      <select onChange={(e) => setCursoSeleccionado(e.currentTarget.value)}>
        <option>Seleccione un curso</option>
        {cursosLista.map((el) => {
          return (
            <option key={el.uid} value={el.uid}>
              {el.materia.nombre}
            </option>
          );
        })}
      </select>
      <h1>Notas del curso seleccionado</h1>
      <TeacherGradesDataTable
        notas={cursos}
        error={error}
      ></TeacherGradesDataTable>
    </Layout>
  );
};

export default TeacherGrades;
