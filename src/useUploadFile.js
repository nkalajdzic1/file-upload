import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import API from "API";

export const useUploadFile = () => {
  const [progress, setProgress] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [data, setData] = useState();

  const resetData = () => {
    setProgress(0);
    setIsSuccess(false);
    setIsError(false);
    setIsLoading(false);
    setError(null);
    setData(null);
  };

  const uploadAsync = async (file) => {
    const body = new FormData();
    body.append("File", file);

    resetData();

    try {
      setIsLoading(true);
      const api = new API();
      const data = await api.instance.post("", body, {
        onUploadProgress: ({ loaded, total }) => {
          const percentage = Math.floor((loaded * 100) / total);
          setProgress(percentage);
        },
      });

      setData(data.data);
      setIsLoading(false);
      setIsSuccess(true);
    } catch (error) {
      setIsError(true);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isError) return;
    toast("Error on file upload", { type: "error" });
  }, [isError]);

  useEffect(() => {
    if (!isSuccess) return;
    toast("Successfully uploaded file", { type: "success" });
  }, [isSuccess]);

  return { isLoading, isSuccess, isError, error, data, progress, uploadAsync };
};
