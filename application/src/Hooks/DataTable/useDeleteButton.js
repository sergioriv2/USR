import { useState, useCallback } from "react";
import useLocalStorage from "../useLocalStorage";

const useDeleteButton = (gridRef, path) => {
  const [hideButton, setHideButton] = useState(true);
  const [deletePath] = useState(path);

  const [token] = useLocalStorage("token");

  // Metodo para dar de baja las filas seleccionadas (TODO: Confirmación)
  const deleteRow = useCallback(
    (refetch) => {
      if (gridRef.api === null) return;

      const selRows = gridRef.api.getSelectedRows();

      selRows.forEach((row) => {
        fetch(deletePath + row.uid, {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-api-key": token,
          },
        })
          .then(async (res) => {
            const data = await res.json();
            console.log(data);
            refetch();
          })
          .catch((err) => console.error(err));
      });
      setHideButton(true);
    },

    [token, gridRef, deletePath]
  );

  const updateStateButton = useCallback(() => {
    if (gridRef.api === null) return;
    const selRows = gridRef.api.getSelectedRows();

    if (selRows.length > 0) setHideButton(false);
    else setHideButton(true);
  }, [gridRef]);

  return { hideButton, deleteRow, updateStateButton };
};

export default useDeleteButton;
