import { useState, useEffect } from "react";

function useDataFetching(dataFetcher, params) {
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  console.log('useDataFetching');

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await dataFetcher(params);
        setLoading(false);
        setResults(data);
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }

      setLoading(false);
    }

    fetchData();
  }, [params]);

  return {
    error,
    loading,
    results
  };
}

export default useDataFetching;