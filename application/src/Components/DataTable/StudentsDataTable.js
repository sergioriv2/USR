import { useState } from "react";

import DataTable from "./DataTable";
import useFetch from "../../Hooks/useFetch";

const path = "http://localhost:3001/api/usuarios/usuario/";

const StudentsDataTable = () => {
  const definitions = [
    {
      field: "Nombre completo",
      lockPosition: true,
      sortable: true,
      checkboxSelection: true,
      editable: false,
      width: 400,
      valueGetter: (params) => {
        return `${params.data.nombres} ${params.data.apellidos}`;
      },
    },
    {
      headerName: "Nombre(s)",
      lockPosition: true,
      sortable: true,
      field: "nombres",
      editable: true,
    },
    {
      headerName: "Apellido(s)",
      lockPosition: true,
      sortable: true,
      field: "apellidos",
      editable: true,
    },

    {
      field: "sexo",
      lockPosition: true,
      headerName: "Sexo",
      sortable: true,
      editable: true,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: ["HOMBRE", "MUJER", "OTRO"],
      },
    },
    {
      field: "email",
      lockPosition: true,
      headerName: "Email",
      editable: true,
    },
    {
      field: "fecha_alta",
      headerName: "Fecha de Alta",
      lockPosition: true,
      sortable: true,
    },
  ];

  const [columnDefs] = useState(definitions);

  const {
    data: students,
    refetch,
    error,
  } = useFetch("http://localhost:3001/api/alumnos?limit=50");

  return (
    <DataTable
      rowData={students}
      columnsDef={columnDefs}
      refetch={refetch}
      path={path}
      error={error}
    ></DataTable>
  );
};

export default StudentsDataTable;
