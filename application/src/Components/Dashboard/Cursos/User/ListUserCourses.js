import { useSelector } from "react-redux";
import styled from "styled-components";

import Course from "./Course";
import useLocalStorage from "../../../../Hooks/useLocalStorage";

const Content = styled.div``;

const ListUserCourses = (props) => {
  const { signedUp = true, cursos, refetch } = props;
  const { entity } = useSelector(({ user }) => user);
  const [token] = useLocalStorage("token");

  // Anotarse al curso
  const handleClick = (curso_uid) => {
    fetch(`http://localhost:3001/api/cursos/${curso_uid}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-api-key": token,
      },
      body: JSON.stringify({ usuarios: [entity._id] }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (res.status === 200) {
          refetch();
          return;
        }
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Content>
      {cursos.map((curso) => {
        // const { inscripcion } = curso.fechas;
        // if (new Date(inscripcion.fin) < Date.now() && signedUp === false)
        //   return null;
        return (
          <Course
            materia={curso.materia}
            signedUp={signedUp}
            key={curso.uid}
            curso_uid={curso.uid}
            handleClick={handleClick}
          ></Course>
        );
      })}
      {/* {error !== null ? error.msg : null} */}
    </Content>
  );
};

export default ListUserCourses;
