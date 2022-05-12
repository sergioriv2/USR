import { useSelector } from "react-redux";
import GradesDetails from "./GradesDetails";

const UserGrades = () => {
  const user = useSelector(({ user }) => user.entity);

  if (user?.rol === null || user?.rol !== "ALUMNO") return null;

  return <GradesDetails></GradesDetails>;
};

export default UserGrades;
