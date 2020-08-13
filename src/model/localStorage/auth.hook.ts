import {useState, useCallback, useEffect} from 'react';
import * as LocalStorage from './storage';

export class LoginData {
  private readonly _jwtToken: string;
  private readonly _userId: string;
  get token(): string {
    return this._jwtToken;
  }
  get uid(): string {
    return this._userId;
  }
  constructor(uid: string, token: string) {
    this._userId = uid;
    this._jwtToken = token;
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
