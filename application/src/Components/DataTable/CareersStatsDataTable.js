import { useState } from "react";

import DataTable from "./DataTable";
import useFetch from "../../Hooks/useFetch";

const CareerStatsDataTable = ({ bodyQuery }) => {
  const definitions = [
    {
      headerName: "Detalles",
      marryChildren: true,
      children: [
        {
          field: "nombre_carrera",
          headerName: "Carrera",
          sortable: true,
          resizable: true,

          filter: false,
        },
        {
          field: "cantidad_alumnos",
          headerName: "Alumnos",
          sortable: true,
          resizable: true,
          filter: false,
        },
      ],
    },
    {
      headerName: "Cuotas",
      marryChildren: true,

      children: [
        {
          field: "cuotas.pagadas",
          headerName: "Pagadas",
          filter: false,
        },
        {
          field: "cuotas.sin_pagar",
          headerName: "Sin pagar",
          filter: false,
        },
        {
          field: "cuotas.pagadas_parcialmente",
          headerName: "Pagadas parcialmente",
          filter: false,
        },
      ],
    },
    {
      headerName: "Matriculas",
      children: [
        {
          field: "matriculas.pagadas",
          headerName: "Pagadas",
          filter: false,
        },
        {
          field: "matriculas.sin_pagar",
          headerName: "Sin pagar",
          filter: false,
        },
        {
          field: "matriculas.pagadas_parcialmente",
          headerName: "Pagadas parcialmente",
          filter: false,
        },
      ],
    },
  ];

  const [columnDefs] = useState(definitions);

  const { careers, refetch, error } = useFetch(bodyQuery);

  return (
    <DataTable
      rowData={careers}
      columnsDef={columnDefs}
      refetch={refetch}
      error={error}
    ></DataTable>
  );
};

export default CareerStatsDataTable;
