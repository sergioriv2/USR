import { useState } from "react";
import IntegerValueSetter from "../../Utils/DataTable/IntegerValueSetter";
import DataTable from "./DataTable";

const TeacherGradesDataTable = ({ notas, error }) => {
  const definitions = [
    {
      headerName: "Detalles",
      marryChildren: true,
      children: [
        {
          headerName: "Alumno",
          sortable: true,
          filter: false,
          valueGetter: function (params) {
            const { data } = params;
            return data.alumno.nombres + " " + data.alumno.apellidos;
          },
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
          editable: true,
          valueGetter: function (params) {
            const { data } = params;
            if (!data.parciales) return 0;
            if (!data.parciales[1]) return 0;
            return data.parciales[1];
          },
          valueSetter: (params) => IntegerValueSetter(params, "parcial_1"),
        },
        {
          headerName: "Parcial 2",
          resizable: true,
          filter: false,
          editable: true,
          valueGetter: (params) => {
            const { data } = params;
            if (!data.parciales) return 0;
            if (!data.parciales[2]) return 0;
            return data.parciales[2];
          },
          valueSetter: (params) => IntegerValueSetter(params, "parcial_2"),
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
          editable: true,
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
          editable: true,
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

  return (
    <DataTable
      rowData={notas}
      columnsDef={columnDefs}
      error={error}
    ></DataTable>
  );
};

export default TeacherGradesDataTable;
