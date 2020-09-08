import { useState, useCallback } from "react";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null |string>(null);
  
  const sendRequest = useCallback(
    async (url: RequestInfo, method = 'GET', body = null, headers = {}) => {
      setIsLoading(true);

      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
        });

        const responseData = await response.json();
        console.log(responseData, 'responseData')

        if (!response.ok) {
          setError(responseData.message);
        }

        setIsLoading(false);
        return responseData;
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
        throw err;
      }
    },
    []
  );

  return { isLoading, error, sendRequest, setError };
};