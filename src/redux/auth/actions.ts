/**
 * Sample React Native App
 * https://github.com/SKrotkih/eMia-React-Native
 *
 * @format
 * @flow
 */

import ACTIONS from '../types';
import {User} from '../../model/entities/user';
import {
  removeStorageItem,
  setStorageObjectItem,
} from '../../model/localStorage/storage';
import store from '../store';

export function logIn(user: User) {
  setStorageObjectItem('user', user)
    .then(() => {
      store.dispatch(ACTIONS.loggedIn(user));
    })
    .catch((error) => {
      console.log(error);
    });
}

export function signUp(user: User) {
  setStorageObjectItem('user', user)
    .then(() => {
      store.dispatch(ACTIONS.registeredNewUser(user));
    })
    .catch((error) => {
      console.log(error);
    });
}

export function logOut() {
  removeStorageItem('user')
    .then(() => {
      store.dispatch(ACTIONS.loggedOut());
    })
    .catch((error) => {
      console.log(error);
    });
}
