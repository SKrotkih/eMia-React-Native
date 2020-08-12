import {useState, useCallback} from 'react';
import {BASE_URL} from '../../../../config/constants';

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [networkError, setNetworkError] = useState(null);

  const request = useCallback(
    async (url, method = 'GET', body = null, headers = {}) => {
      setLoading(true);
      try {
        if (body) {
          body = JSON.stringify(body);
          headers['Content-Type'] = 'application/json';
        }

        console.log(body);

        url = BASE_URL + url;

        console.log(url);

        const response = await fetch(url, {method, body, headers});
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Something went wrong');
        }

        setLoading(false);

        return data;
      } catch (e) {
        setLoading(false);
        setNetworkError(e.message);
        throw e;
      }
    },
    [],
  );

  const clearError = useCallback(() => setNetworkError(null), []);

  return {loading, request, networkError, clearError};
};
