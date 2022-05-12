import SelectCareer from "../User/SelectCareer";
import { useSelector } from "react-redux";

const UserCareers = () => {
  const user = useSelector(({ user }) => user.entity);
  if (user?.rol === null || user?.rol !== "USUARIO") return null;

  return (
    <div>
      <div>
        <h1>Carreras</h1>
        <h4>
          Selecciona una carrera para empezar a ver horarios y cursos de la
          misma.
        </h4>
        <SelectCareer></SelectCareer>
      </div>
    </div>
  );
};

export default UserCareers;
