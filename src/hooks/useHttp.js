import axios from "axios";
import { useCallback, useEffect, useState } from "react";

async function sendHttpRequest(url, data) {
  const response = await axios.post(url, data);

  const responseData = response.data;
  if (response.status >= 400) {
    throw new Error(
      response.message || "Something went wrong!Failed to send request."
    );
  }
  return responseData;
}

export default function useHttp(url, initialData) {
  const [data, setData] = useState(initialData);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  function clearData() {
    setData(initialData);
  }
  const sendRequest = useCallback(
    async function sendRequest(data) {
      setIsLoading(true);
      try {
        const responseData = await sendHttpRequest(url, data);
        setData(responseData);
      } catch (error) {
        setError(error.message || "Something went wrong!");
      }
      setIsLoading(false);
    },
    [url]
  );

  // useEffect(() => {
  //   sendRequest();
  // }, [sendRequest]);
  return {
    data,
    error,
    isLoading,
    sendRequest,
    clearData,
  };
}
