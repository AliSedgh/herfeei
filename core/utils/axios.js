import axios from "axios";
import { useState, useEffect } from "react";
import deepEqual from "deep-equal";

export const ax = axios.create({
  withCredentials: true,
});

export const useAxios = (axiosConfig, disableCache= false) => {
  const [response, setResponse] = useState(undefined);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [cache, setCache] = useState({});

  const fetchData = async (params) => {
    try {
      const result = await ax.request(params);
      setResponse(result.data);
      setCache({ ...cache, [params.url]: params });
      return result.data
    } catch (error) {
      setError(error);
      return error
    } finally {
      setLoading(false);
    }
  };

  const call = async (config) => {
    if (!disableCache && deepEqual(config, cache?.[config.url])) {
    } else {
       return fetchData(config);
    }
  };

  const clean = (init) => {
      setResponse(init)
  }

  useEffect(() => {
    if (typeof axiosConfig === "object") {
      call(axiosConfig);
    }
  }, []); // execute once only

  return { response, error, loading, call, clean };
};
