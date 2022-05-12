import { useSelector } from "react-redux";
import useFetch from "../../../../Hooks/useFetch";
import ListCourses from "./ListUserCourses";

import styled from "styled-components";
const Layout = styled.div`
  margin: 5% 0;

  h2 {
    margin: 20px 0;
  }
`;

const CoursesContainer = styled.div`
  margin: 20px 0;
`;
const Options = styled.div`
  display: flex;
  h3 {
    padding-bottom: 5px;
    margin: 20px 0 30px;
    padding-right: 40px;
    margin-right: 20px;
  }
`;

const UserCourses = () => {
  const { entity } = useSelector(({ user }) => user);
  const career = useSelector(({ career }) => career.entity);

  const {
    data: cursos,
    loading: loadCursos,
    refetch,
  } = useFetch(
    `http://localhost:3001/api/cursos/usuario/${entity._id}/carrera/${career.uid}/`
  );

  if (entity?.rol !== "ALUMNO" && entity?.rol !== "DOCENTE") return null;

  return (
    <Layout>
      <h2>Cursos</h2>
      <CoursesContainer>
        <Options>
          <h3>{entity.rol === "ALUMNO" ? "Cursando" : "Enseñando"}</h3>
          <h3>No anotados</h3>
        </Options>

        {loadCursos ? (
          <p>Cargando</p>
        ) : (
          <ListCourses
            cursos={cursos.anotados}
            refetch={refetch}
            signedUp={true}
          ></ListCourses>
        )}
      </CoursesContainer>
      <CoursesContainer>
        {loadCursos ? (
          <p>Cargando</p>
        ) : (
          <ListCourses
            cursos={cursos.sin_anotar}
            refetch={refetch}
            signedUp={false}
          ></ListCourses>
        )}
      </CoursesContainer>
    </Layout>
  );
};

export default UserCourses;
