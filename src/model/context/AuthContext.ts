import {createContext} from 'react';

function noop() {}
function ld(LoginData) {}

export const AuthContext = createContext({
  token: null,
  userId: null,
  login: ld,
  logout: noop,
  isAuthenticated: false,
});
