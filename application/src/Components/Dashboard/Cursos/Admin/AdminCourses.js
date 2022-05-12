import { useSelector } from "react-redux";
import EntityListOptions from "../../EntityListOptions";

const AdminCourses = () => {
  const user = useSelector(({ user }) => user.entity);

  if (user?.rol === null || user?.rol !== "ADMIN") return null;

  const options = [
    {
      name: "Crear un nuevo curso",
      path: "add",
    },
    {
      name: "Listar o editar una curso",
      path: "list",
    },
  ];

  return (
    <div>
      <h1>Cursos</h1>
      <EntityListOptions options={options} />
    </div>
  );
};

export default AdminCourses;
