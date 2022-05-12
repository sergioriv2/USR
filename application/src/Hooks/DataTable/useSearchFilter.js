import { useCallback, useEffect, useState } from "react";

const useSearchFilter = (gridRef) => {
  const [search, setSearch] = useState("");

  const filterDataTable = useCallback(() => {
    if (gridRef === null) return;

    gridRef?.api?.setQuickFilter(search);
  }, [gridRef, search]);

  useEffect(() => {
    filterDataTable();
  }, [search, filterDataTable]);

  return { setSearch };
};

export default useSearchFilter;
