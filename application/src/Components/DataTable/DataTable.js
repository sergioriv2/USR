import { useRef, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import styled from "styled-components";

import useDeleteButton from "../../Hooks/DataTable/useDeleteButton";
import useSearchFilter from "../../Hooks/DataTable/useSearchFilter";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const FilterSearch = styled.input`
  padding: 10px 15px;
  width: 300px;
  border: 2px solid rgba(0, 0, 0, 0.2);
  outline: none;
  border-radius: 20px;
`;

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  padding: 10px 15px;
  margin: 0 20px;

  border: none;
  color: #eee;
  cursor: pointer;

  outline: none;
  border-radius: 20px;
`;

const SaveButton = styled(Button)`
  background-color: green;
`;

const DeleteButton = styled(Button)`
  background-color: red;
`;

const DataTable = (props) => {
  const [editedValues, setEditedValues] = useState([]);
  const [editedCellsIndexes, setEditedCellsIndexes] = useState([]);
  const { columnsDef, rowData, refetch, updatePath, error } = props;

  // Referencia para llama a la api de AgGrid
  const gridRef = useRef();

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      filter: "agTextColumnFilter",
    };
  }, []);

  const { hideButton, deleteRow, updateStateButton } = useDeleteButton(
    gridRef.current,
    updatePath
  );

  const showChangedValues = (params) => {
    const { colDef, node } = params;
    const { api } = gridRef.current;

    const { field } = colDef;

    colDef.cellStyle = (p) =>
      p.rowIndex.toString() === node.id
        ? { fontWeight: "bold", color: "green" }
        : null;

    api.refreshCells({
      columns: [field],
      rowNodes: [node],
      force: true,
    });

    setEditedCellsIndexes([
      ...editedCellsIndexes,
      { columnns: field, rowNodes: node, colDef },
    ]);
  };

  const cellValueChanged = (e) => {
    const { field } = e.colDef;

    if (e.newValue === e.oldValue || e.newValue === undefined) return;

    const objValue = {};

    objValue["uid"] = e.data.uid;
    objValue[field] = e.newValue;

    const found = editedValues.findIndex(
      (element) => element.uid === objValue.uid
    );

    if (found === -1) setEditedValues([...editedValues, objValue]);
    else {
      const newValues = editedValues.map((el) => {
        if (el.uid === objValue.uid) {
          return Object.assign(el, objValue);
        } else return el;
      });

      setEditedValues(newValues);
    }

    showChangedValues(e);
  };

  const saveEdit = () => {
    console.log(editedValues);
    editedValues.forEach(({ uid, ...values }) => {
      fetch(updatePath + uid, {
        method: "PUT",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "x-api-key": window.localStorage.getItem("token"),
        },
      }).then(async (res) => {
        const data = await res.json();
        console.log(data);
      });
    });
    setEditedValues([]);
  };

  const { setSearch } = useSearchFilter(gridRef.current);

  return (
    <div>
      {error?.msg !== null ? <h4>{error?.msg}</h4> : null}
      <Toolbar>
        <FilterSearch
          type="text"
          spellCheck="false"
          placeholder="Búsqueda"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        ></FilterSearch>
        <DeleteButton
          onClick={() => deleteRow(refetch)}
          style={{ display: hideButton === true ? "none" : "block" }}
        >
          Eliminar
        </DeleteButton>
        <SaveButton
          onClick={() => saveEdit()}
          style={{ display: editedValues.length === 0 ? "none" : "block" }}
        >
          Guardar Cambios
        </SaveButton>
      </Toolbar>

      <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
        <AgGridReact
          ref={gridRef}
          rowSelection={"multiple"}
          suppressRowClickSelection={true}
          rowData={error?.msg === null ? [] : rowData}
          defaultColDef={defaultColDef}
          columnDefs={columnsDef}
          pagination={true}
          paginationPageSize={10}
          onRowSelected={() => updateStateButton(gridRef.api)}
          editType="fullRow"
          undoRedoCellEditing={true}
          undoRedoCellEditingLimit={5}
          onCellValueChanged={cellValueChanged}
        ></AgGridReact>
      </div>
    </div>
  );
};

export default DataTable;
