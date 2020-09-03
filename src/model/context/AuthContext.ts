/**
 * Sample React Native App
 * https://github.com/SKrotkih/eMia-React-Native
 *
 * @format
 * @flow
 */
import {createContext} from 'react';
import {LoginData} from '../../model/localStorage/auth.hook';

function noop() {}
function ld(_: LoginData) {}

export const AuthContext = createContext({
  token: null,
  userId: null,
  login: ld,
  logout: noop,
  isAuthenticated: false,
});
