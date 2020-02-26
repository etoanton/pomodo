import { useState, useEffect } from 'react';

function useDataFetching(dataFetcher, ...params) {
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState({ data: {} });
  const [error, setError] = useState('');

  async function fetchData() {
    setLoading(true);
    try {
      // await new Promise(res => setTimeout(res, 2000));
      const data = await dataFetcher(...params);
      setLoading(false);
      setResults(data);
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, params);

  return {
    error,
    loading,
    results,
    refetch: fetchData,
  };
}

export default useDataFetching;
