import {LOGGED_IN, LOGGED_OUT} from './actionTypes';
import {User} from '../model/entities/user';
import {removeStorageItem, setStorageObjectItem} from '../model/LocalStorage/storage';

export function logIn(user: User) {
  return function (dispatch) {
    setStorageObjectItem('user', user)
      .then(() => {
        dispatch({type: LOGGED_IN, data: user});
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
  }
}
