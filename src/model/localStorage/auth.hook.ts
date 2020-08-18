import {useState, useCallback, useEffect} from 'react';
import * as LocalStorage from './storage';

export class LoginData {
  readonly token: string;
  readonly uid: string;
  constructor(uid: string, token: string) {
    this.uid = uid;
    this.token = token;
  }
}

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [ready, setReady] = useState(false);
  const [userId, setUserId] = useState(null);

  const keyName = 'login';

  const login = useCallback((loginData: LoginData) => {
    LocalStorage.setStorageObjectItem(keyName, loginData).then(() => {
      setToken(loginData.token);
      setUserId(loginData.uid);
    });
  }, []);

  const logout = useCallback(() => {
    LocalStorage.removeStorageItem(keyName).then(() => {
      setToken(null);
      setUserId(null);
    });
  }, []);

  useEffect(() => {
    LocalStorage.getStorageObjectItem(keyName).then((data) => {
      const loginData = data as LoginData;
      if (loginData) {
        login(loginData);
      }
      setReady(true);
    });
  }, [login]);

  return {login, logout, token, userId, ready};
};
