import useFetch from "../../../../Hooks/useFetch";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import "react-loading-skeleton/dist/skeleton.css";

import styled from "styled-components";

const Layout = styled.div`
  margin: 40px 0;
  padding: 15px 10px;
`;

const Career = styled.li`
  ${(props) => (props.isselected ? "font-weight: bold;" : null)}
`;

const SelectCareer = () => {
  const user = useSelector(({ user }) => user.entity);
  const [selected, setSelected] = useState("");
  const dispatch = useDispatch();

  const handleClick = (uid) => {
    setSelected(uid);
    dispatch({ type: "career/set", payload: { uid } });
  };

  const apiEnpoint = `http://localhost:3001/api/usuarios/${user?._id}/carreras`;

  const { data: careers } = useFetch(apiEnpoint);

  useEffect(() => {
    // Si la lista de carreras es de 1 entonces selecciono esa
    if (careers.length === 1) {
      dispatch({
        type: "career/set",
        payload: { uid: careers[0].uid, descripcion: careers[0].descripcion },
      });
    }
  }, [careers, dispatch]);

  if (user.rol !== "ALUMNO" && user.rol !== "DOCENTE") return null;

  return (
    <Layout>
      <h2>Carrera</h2>
      <ul>
        {careers.map(({ uid, descripcion }) => (
          <Career
            key={uid}
            onClick={() => handleClick(uid)}
            isselected={selected === uid ? true : false}
          >
            {descripcion}
          </Career>
        ))}
      </ul>
    </Layout>
  );
};

export default SelectCareer;
