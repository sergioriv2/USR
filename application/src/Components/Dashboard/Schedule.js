import { useSelector } from "react-redux";
import useFetch from "../../Hooks/useFetch";
import styled from "styled-components";
const Layout = styled.div`
  margin: 5% 0;
  h2 {
    margin: 30px 0 30px;
  }
`;

const Schedule = () => {
  const { uid: carrera } = useSelector(({ career }) => career.entity);
  const { entity } = useSelector(({ user }) => user);

  const apiEndpoint = `http://localhost:3001/api/cursos/usuario/${entity._id}/carrera/${carrera}`;

  const { data, loading } = useFetch(apiEndpoint);
  return (
    <Layout>
      <h2>Horarios</h2>
      <ul>
        {!loading
          ? data.anotados.map((el, i) => (
              <li key={i}>
                {el.materia.nombre}
                <ul>
                  {el.horario.horas.map((element, i) => (
                    <li key={i}>{element.dia}</li>
                  ))}
                </ul>
              </li>
            ))
          : null}
      </ul>
    </Layout>
  );
};

export default Schedule;
