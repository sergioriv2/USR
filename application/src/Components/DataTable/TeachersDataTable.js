import { useState } from "react";

import DataTable from "./DataTable";
import useFetch from "../../Hooks/useFetch";

const deletePath = "http://localhost:3001/api/usuarios/usuario/";

const TeachersDataTable = () => {
  const definitions = [
    {
      headerName: "Nombre completo",
      field: "nombre_completo",
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
      headerName: "Imagen",
      field: "img",
      lockPosition: true,
    },
    {
      field: "nombres",
      headerName: "Nombre(s)",
      cellRenderer: "agAnimateShowChangeCellRenderer",
      lockPosition: true,
      sortable: true,
      editable: true,
    },
    {
      field: "apellidos",
      headerName: "Apellido(s)",
      lockPosition: true,
      sortable: true,
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
      field: "fecha_nacimiento",
      headerName: "Fecha de Nacimiento",
      lockPosition: true,
      sortable: true,
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
    data: teachers,
    refetch,
    error,
  } = useFetch("http://localhost:3001/api/docentes?limit=50");

  return (
    <DataTable
      rowData={teachers.docentes}
      columnsDef={columnDefs}
      refetch={refetch}
      updatePath={deletePath}
      error={error}
    ></DataTable>
  );
};

export default TeachersDataTable;
