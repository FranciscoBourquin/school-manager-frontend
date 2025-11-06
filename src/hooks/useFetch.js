import { useState } from "react";

export const useFetch = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const run = async (serviceFn, ...args) => {
    setLoading(true);
    setError("");
    try {
      const result = await serviceFn(...args);
      setData(result);
      return result;
    } catch (e) {
      setError(e.message || "Request failed");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, run, setData, setError };
}
