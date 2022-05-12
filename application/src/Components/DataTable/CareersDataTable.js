import { useState } from "react";

import DataTable from "./DataTable";
import IntegerValueSetter from "../../Utils/DataTable/IntegerValueSetter";
import useFetch from "../../Hooks/useFetch";

const deletePath = "http://localhost:3001/api/carreras/carrera/";

const CareersDataTable = () => {
  const definitions = [
    {
      headerName: "Detalles",
      marryChildren: true,
      children: [
        {
          field: "descripcion",
          lockPosition: true,
          sortable: true,
          checkboxSelection: true,
          width: 300,
          resizable: true,
          editable: true,
        },
        {
          field: "nivel",
          lockPosition: true,
          sortable: true,
          editable: true,
          cellEditor: "agSelectCellEditor",
          cellEditorParams: {
            values: ["INGENIERIA", "LICENCIATURA", "TECNICATURA"],
          },
        },
        {
          field: "mensualidad",
          lockPosition: true,
          headerName: "Mensualidad ($.)",
          editable: true,
          sortable: true,
          valueSetter: (params) => IntegerValueSetter(params, "mensualidad"),
        },
        {
          field: "duracion",
          lockPosition: true,
          sortable: true,
          headerName: "Duración (años)",
          editable: true,
          valueSetter: (params) => IntegerValueSetter(params, "duracion"),
        },

        {
          field: "horas_totales",
          headerName: "Hs. totales",
          lockPosition: true,
          editable: true,
          valueSetter: (params) => IntegerValueSetter(params, "horas_totales"),
        },

        {
          field: "cupo.max",
          headerName: "Cupo (Máx.)",
          lockPosition: true,
          editable: true,
          valueSetter: (params) => IntegerValueSetter(params, "cupo.max"),
        },
        {
          field: "cupo.min",
          headerName: "Cupo (Min.)",
          lockPosition: true,
          editable: true,
          valueSetter: (params) => IntegerValueSetter(params, "cupo.min"),
        },
      ],
    },
  ];

  const [columnDefs] = useState(definitions);

  const {
    data: careers,
    refetch,
    error,
  } = useFetch("http://localhost:3001/api/carreras");

  console.log(careers);

  return (
    <DataTable
      rowData={careers}
      columnsDef={columnDefs}
      refetch={refetch}
      error={error}
      deletePath={deletePath}
    ></DataTable>
  );
};

export default CareersDataTable;
