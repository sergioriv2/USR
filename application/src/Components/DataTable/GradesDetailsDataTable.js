import { useState } from "react";

import DataTable from "./DataTable";
import useFetch from "../../Hooks/useFetch";

const GradeDetailsDataTable = ({ userId, careerId }) => {
  const definitions = [
    {
      headerName: "Detalles",
      marryChildren: true,
      children: [
        {
          headerName: "Materia",
          sortable: true,
          filter: false,
          resizable: true,
          field: "materia.descripcion",
        },
        {
          headerName: "Estado de cursada",
          sortable: true,
          filter: false,
          field: "estado_curso",
        },
      ],
    },
    {
      headerName: "Parciales",
      marryChildren: true,
      children: [
        {
          headerName: "Parcial 1",
          resizable: true,
          filter: false,
          valueGetter: function (params) {
            const { data } = params;
            if (!data.parciales) return 0;
            if (!data.parciales[1]) return 0;
            return data.parciales[1];
          },
        },
        {
          headerName: "Parcial 2",
          resizable: true,
          filter: false,
          valueGetter: (params) => {
            const { data } = params;
            if (!data.parciales) return 0;
            if (!data.parciales[2]) return 0;
            return data.parciales[2];
          },
        },
      ],
    },
    {
      headerName: "Recuperatorios",
      marryChildren: true,
      children: [
        {
          headerName: "Recuperatorio 1",
          resizable: true,
          filter: false,
          valueGetter: (params) => {
            const { data } = params;
            if (!data.recuperatorios) return 0;
            if (!data.recuperatorios[1]) return 0;
            return data.recuperatorios[1];
          },
        },
        {
          headerName: "Recuperatorio 2",
          resizable: true,
          filter: false,
          valueGetter: (params) => {
            const { data } = params;
            if (!data.recuperatorios) return 0;
            if (!data.recuperatorios[2]) return 0;
            return data.recuperatorios[2];
          },
        },
      ],
    },
  ];

  const [columnDefs] = useState(definitions);

  const { data: notas, error } = useFetch(
    `http://localhost:3001/api/notas/alumno/${userId}/carrera/${careerId}`
  );

  console.log(notas);

  return (
    <DataTable
      rowData={notas}
      columnsDef={columnDefs}
      error={error}
    ></DataTable>
  );
};

export default GradeDetailsDataTable;
