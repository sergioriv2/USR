import { useSelector } from "react-redux";
import EntityListOptions from "../../EntityListOptions";

const AdminUsers = () => {
  const user = useSelector(({ user }) => user.entity);

  if (user?.rol === null || user?.rol !== "ADMIN") return null;

  const options = [
    {
      name: "Crear un nuevo usuario",
      path: "add",
    },
    {
      name: "Listar o editar un alumno",
      path: "list_students",
    },
    {
      name: "Listar o editar un docente",
      path: "list_teachers",
    },
  ];

  return (
    <div>
      <h1>Usuarios</h1>
      <EntityListOptions options={options} hght="250px" />
    </div>
  );
};

export default AdminUsers;
