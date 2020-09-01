import { useState, useCallback, useRef, useEffect } from "react";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null |string>(null);

  const activeHttpRequests: any = useRef([]);
  
  const sendRequest = useCallback(
    async (url: RequestInfo, method = 'GET', body = null, headers = {}) => {
      setIsLoading(true);
      const httpAbortCtrl: any = new AbortController()
      activeHttpRequests.current.push(httpAbortCtrl);

      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortCtrl.signal
        });

        const responseData = await response.json();

        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl: any) => {
            return reqCtrl !== httpAbortCtrl;
          }
        );

        if (!response.ok) {
          throw new Error(responseData.message);
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


  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      activeHttpRequests.current.forEach((abortCtrl: { abort: () => any; }) => abortCtrl.abort());
    };
  }, []);

  return { isLoading, error, sendRequest };
};