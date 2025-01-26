import { useState, useEffect } from "react";
import axios from "axios";

axios.defaults.baseURL = "https://lpthinh-sparta.site/app/";

export const useAxios = (axiosParams, trigger = null) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = async (params) => {
    try {
      setLoading(true);
      const result = await axios.request(params);
      setResponse(result.data);
    } catch (error) {
      setError(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(axiosParams);
  }, [trigger]); // re-run when trigger changes

  return { response, error, loading };
};
