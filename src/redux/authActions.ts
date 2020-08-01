/**
 * Sample React Native App
 * https://github.com/SKrotkih/eMia-React-Native
 *
 * @format
 * @flow
 */

import ACTIONS from './types';
import {User} from '../model/entities/user';
import {
  removeStorageItem,
  setStorageObjectItem,
} from '../model/LocalStorage/storage';

// Async Redux Actions (with using Middleware)

export function logIn(user: User) {
  return function (dispatch) {
    setStorageObjectItem('user', user)
      .then(() => {
        dispatch(ACTIONS.loggedIn(user));
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function logOut() {
  return function (dispatch) {
    removeStorageItem('user')
      .then(() => {
        dispatch(ACTIONS.loggedOut());
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function signUp(user: User) {
  return function (dispatch) {
    setStorageObjectItem('user', user)
      .then(() => {
        dispatch(ACTIONS.registeredNewUser(user));
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
