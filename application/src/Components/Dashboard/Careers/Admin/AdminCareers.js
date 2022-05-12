import { useSelector } from "react-redux";
import EntityListOptions from "../../EntityListOptions";

const AdminCareers = () => {
  const user = useSelector(({ user }) => user.entity);
  if (user?.rol === null || user?.rol !== "ADMIN") return null;

  const options = [
    {
      name: "Crear una nueva carrera",
      path: "add",
    },
    {
      name: "Listar o editar una carrera",
      path: "list",
    },
  ];

  return (
    <div>
      <div>
        <h1>Carreras</h1>
        <EntityListOptions options={options} />
      </div>

      <h1>Gestionar materias</h1>
    </div>
  );
};

export default AdminCareers;
