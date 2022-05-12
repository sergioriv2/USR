import CoursesDataTable from "../../../DataTable/CoursesDataTable";

const ListCourses = () => {
  return <CoursesDataTable />;
};

export default ListCourses;

// const ListarCursos = ({ signedUp = true, career }) => {
//   const user = useSelector(({ user }) => user);

//   const {
//     data: cursos,
//     loading,
//     error,
//   } = useFetchGetData(
//     `http://localhost:3001/api/cursos/alumno/${user.entity.id}/carrera/${career}/signedUp/${signedUp}`
//   );

//   if (loading) return <p>Cargando...</p>;

//   return (
//     <Content>
//       {cursos.map(({ materia, carrera, uid }) => (
//         <Course
//           materia={materia.nombre}
//           carrera={carrera.descripcion}
//           signedUp={signedUp}
//           key={uid}
//           uid={uid}
//         ></Course>
//       ))}
//       {error !== null ? error.msg : null}
//     </Content>
//   );
// };

// export default ListarCursos;
