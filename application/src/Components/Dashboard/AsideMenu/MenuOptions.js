import { useSelector } from "react-redux";
import styled from "styled-components";

import SidebarOption from "./SidebarOption";
import options from "./options.json";
import SelectCareer from "./SelectCareer";

const menuConfig = {
  admin: [
    options.inicio,
    options.pagos,
    options.estadisticas,
    options.carreras,
    options.cursos,
    options.usuarios,
    // options.ajustes,
    options.signOut,
  ],
  docente: [
    options.inicio,
    options.cursos,
    options.notas,
    // options.ajustes,
    options.signOut,
  ],
  alumno: [
    options.inicio,
    // options.carreras,
    options.notas,
    options.pagos,
    // options.ajustes,
    options.signOut,
  ],
};

const SidebarLayout = styled.div`
  margin-top: 30px;
  display: flex;
  width: 100%;
  height: 88%;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
`;

const SideBarOptions = () => {
  const { loading, entity } = useSelector(({ user }) => user);

  return (
    <SidebarLayout>
      <SelectCareer></SelectCareer>
      {loading !== "succeded"
        ? null
        : menuConfig[entity.rol.toLowerCase()].map((element, index) => (
            <SidebarOption
              className="sidebarOption"
              key={index}
              option={element}
            ></SidebarOption>
          ))}
    </SidebarLayout>
  );
};

export default SideBarOptions;
