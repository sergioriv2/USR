import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useFetch from "../../../../Hooks/useFetch";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CareerDetails = () => {
  const { id } = useParams();
  const user = useSelector(({ user }) => user);

  const { data: cursosAnotados, loading: loadCursosAnotados } = useFetch(
    user.loading !== "succeded"
      ? ""
      : `http://localhost:3001/api/cursos/alumno/${user.entity.id}/carrera/${id}/signedUp/true`
  );

  const { data: cursosNoAnotados, loading: loadCursosNoAnotados } = useFetch(
    user.loading !== "succeded"
      ? ""
      : `http://localhost:3001/api/cursos/alumno/${user.entity.id}/carrera/${id}/signedUp/false`
  );

  const handleClick = (curso) => {
    const inscDate = new Date(curso.fechas.inscripcion.fin);
    const today = new Date();

    const diffTime = (inscDate.getTime() - today.getTime()) / 1000;
    const diffMonth = Math.abs(Math.round(diffTime / (60 * 60 * 24 * 7 * 4)));
    const diffDays = Math.abs(Math.round(diffTime / (3600 * 24)));

    if (inscDate.getTime() < today.getTime())
      console.log(
        `Las fechas de inscrpción terminaron hace ${diffMonth} mes(es) y ${diffDays} día(s).`
      );
    else {
      // TODO: Modal?

      const request = {
        usuarios: user.entity.id,
      };

      console.log("Listo para anotarse!");

      fetch(`http://localhost:3001/api/cursos/curso/${curso.uid}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-api-key": window.localStorage.getItem("token"),
        },
        body: JSON.stringify(request),
      })
        .then(async (res) => {
          const data = await res.json();
          if (res.status === 200) console.log(data.msg);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div>
      <h4>Ver tus notas</h4>
      <h1>Horarios</h1>
      <ul>
        {loadCursosAnotados ? (
          <Skeleton count={5} />
        ) : (
          cursosAnotados.map((el) => (
            <li key={el.uid}>
              <div>
                <p>{el.materia.nombre}</p>
                <ul>
                  {el.horario.horas.map((fecha, index) => {
                    const dateInicio = new Date(fecha.inicio);
                    const dateFin = new Date(fecha.fin);

                    return (
                      <li key={index}>
                        <p>
                          {fecha.dia} de:{" "}
                          {dateInicio.toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}{" "}
                          -{" "}
                          {dateFin.toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </li>
          ))
        )}
      </ul>
      <h1>Materias que estás cursando</h1>
      <ul>
        {loadCursosAnotados ? (
          <Skeleton count={2} />
        ) : (
          cursosAnotados.map((el) => <li key={el.uid}>{el.materia.nombre}</li>)
        )}
      </ul>
      <h1>Materias que NO estás cursando</h1>
      <ul>
        {loadCursosNoAnotados ? (
          <Skeleton count={2} />
        ) : (
          cursosNoAnotados.map((el) => (
            <li key={el.uid}>
              <div>
                <p>{el.materia.nombre}</p>
                <p onClick={() => handleClick(el)}>Anotarse</p>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};
export default CareerDetails;
