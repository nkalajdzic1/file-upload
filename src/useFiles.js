import { useCallback, useEffect, useState } from "react";

import API from "API";

export const useFiles = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [data, setData] = useState();

  const getFiles = useCallback(async () => {
    try {
      setIsLoading(true);
      const api = new API();
      const data = await api.instance.get("");

      setData(data.data);
      setIsLoading(false);
      setIsSuccess(true);
    } catch (error) {
      setIsError(true);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getFiles();
    //eslint-disable-next-line
  }, []);

  return { isLoading, isSuccess, isError, error, data, refetch: getFiles };
};
