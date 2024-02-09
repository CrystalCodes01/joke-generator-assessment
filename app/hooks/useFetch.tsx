import { useState, useEffect } from 'react';

const useFetch = <T,>(url: string): {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
} => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null); // reset the error state

    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`error: ${res.status}`);
      }
      const jsonData = await res.json();
      setData(jsonData as T);
    } catch (err) {
      setError(err instanceof Error ? err.toString() : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch data on mount and whenever the url changes
  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, isLoading, error, refetch: fetchData };
};

export default useFetch;
