import { useState, useEffect } from "react";

function useDataFetching(dataFetcher, params = {}) {
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const paramsList = Object.values(params);

  async function fetchData() {
    try {
      const data = await dataFetcher(...paramsList);
      setLoading(false);
      setResults(data);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return {
    error,
    loading,
    results
  };
}

export default useDataFetching;