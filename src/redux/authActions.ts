import {LOGGED_IN, LOGGED_OUT, REGISTERED_NEW_USER} from './actionTypes';
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
        dispatch({type: LOGGED_IN, payload: user});
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
        dispatch({type: LOGGED_OUT});
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
        dispatch({type: REGISTERED_NEW_USER, payload: user});
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
