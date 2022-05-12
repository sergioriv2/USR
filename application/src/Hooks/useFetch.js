import { useCallback, useEffect, useState } from "react";

export default function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const dataRequest = {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "x-api-key": window.localStorage.getItem("token"),
        },
      };

      const response = await fetch(url, dataRequest);
      const data = await response.json();
      if (data.ok) setData(data.results);
      else setError(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
