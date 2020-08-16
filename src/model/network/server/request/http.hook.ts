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
        url = BASE_URL + url;
        const response = await fetch(url, {method, body, headers});
        const data = await response.json();
        if (response.status !== 200 || !response.ok) {
          const message = `status: ${response.status}: ${
            data.message || 'Something went wrong'
          }`;
          throw new Error(message);
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

export const httpRequest = async (url, method = 'GET', body = null, headers = {}) => {
  try {
    let options;
    if (body) {
      body = JSON.stringify(body);
      headers['Content-Type'] = 'application/json';
      options = {method, body, headers};
    } else {
      options = {method};
    }
    url = BASE_URL + url;

    console.log(url);

    const response = await fetch(url, options);

    console.log('response=', response);

    if (response.status === 200 && response.ok) {
      const data = await response.json();
      return data;
    } else {
      const message = `response status: ${response.status}`;
      throw new Error(message);
    }
  } catch (e) {
    throw e;
  }
};
