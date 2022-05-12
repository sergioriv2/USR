import { useCallback } from "react";

import useFetch from "../useFetch";
import useLocalStorage from "../useLocalStorage";

const useFetchGetData = (apiEndpoint) => {
  const [token] = useLocalStorage("token");

  const fetchData = useCallback(() => {
    return new Promise((resolve, reject) => {
      fetch(apiEndpoint, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-api-key": token,
        },
      })
        .then(async (res) => {
          const data = await res.json();
          if (res.status === 200) return resolve(data);

          return reject(data);
        })
        .catch((err) => {
          console.log(err);
          return reject(err);
        });
    });
  }, [token, apiEndpoint]);

  const { data, loading, error, refetch } = useFetch(fetchData);

  return { data, loading, error, refetch };
};

export default useFetchGetData;
