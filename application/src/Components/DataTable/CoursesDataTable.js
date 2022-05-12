import { useState } from "react";

import DataTable from "./DataTable";
import useFetch from "../../Hooks/useFetch";

const CoursesDataTable = () => {
  const definitions = [
    {
      headerName: "Detalles",
      marryChildren: true,
      children: [
        {
          headerName: "Información general del curso",
          marryChildren: true,
          children: [
            {
              field: "nombre",
              headerName: "Nombre del Curso",
              sortable: true,
              resizable: true,
              filter: false,
              editable: true,
            },
            {
              field: "materia.nombre",
              headerName: "Materia",
              sortable: true,
              resizable: true,
              filter: false,
            },
            {
              field: "carrera.descripcion",
              headerName: "Carrera",
              sortable: true,
              resizable: true,
              filter: false,
            },
            {
              field: "cuatrimestre",
              headerName: "Cuatrimestre",
              sortable: true,
              resizable: true,
              filter: false,
              editable: true,
              cellEditor: "agSelectCellEditor",
              cellEditorParams: {
                values: [1, 2],
              },
            },

            {
              headerName: "Estado",
              sortable: true,
              resizable: true,
              filter: false,
              valueGetter: ({ data }) => {
                return data.estado ? "EN CURSO" : "TERMINADO";
              },
            },
          ],
        },
      ],
    },
    {
      headerName: "Fechas",
      marryChildren: true,
      children: [
        {
          headerName: "Inscripcion",
          marryChildren: true,
          children: [
            {
              headerName: "Inicio",
              sortable: true,
              resizable: true,
              filter: false,
              valueGetter: ({ data }) => {
                const { fechas } = data;

                const inicio = new Date(fechas.inscripcion.inicio)
                  .toISOString()
                  .replace(/T.*/, "")
                  .split("-")
                  .reverse()
                  .join("-");

                return `${inicio}`;
              },
            },
            {
              headerName: "Fin",
              sortable: true,
              resizable: true,
              filter: false,
              valueGetter: ({ data }) => {
                const { fechas } = data;

                const fin = new Date(fechas.inscripcion.fin)
                  .toISOString()
                  .replace(/T.*/, "")
                  .split("-")
                  .reverse()
                  .join("-");

                return `${fin}`;
              },
            },
          ],
        },
        {
          headerName: "Cursada",
          marryChildren: true,
          children: [
            {
              headerName: "Inicio",
              sortable: true,
              resizable: true,
              filter: false,
              valueGetter: ({ data }) => {
                const { fechas } = data;

                const inicio = new Date(fechas.cursada.inicio)
                  .toISOString()
                  .replace(/T.*/, "")
                  .split("-")
                  .reverse()
                  .join("-");

                return `${inicio}`;
              },
            },
            {
              headerName: "Fin",
              sortable: true,
              resizable: true,
              filter: false,
              valueGetter: ({ data }) => {
                const { fechas } = data;

                const fin = new Date(fechas.cursada.fin)
                  .toISOString()
                  .replace(/T.*/, "")
                  .split("-")
                  .reverse()
                  .join("-");

                return `${fin}`;
              },
            },
          ],
        },
      ],
    },
  ];

  const [columnDefs] = useState(definitions);

  const {
    data: courses,
    refetch,
    error,
  } = useFetch("http://localhost:3001/api/cursos");

  return (
    <DataTable
      rowData={courses}
      columnsDef={columnDefs}
      refetch={refetch}
      error={error}
      updatePath={"http://localhost:3001/api/cursos/curso/"}
    ></DataTable>
  );
};

export default CoursesDataTable;
