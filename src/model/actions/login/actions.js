import api from '@model/firebase/auth/api';
import {LOGGED_IN} from '@model/actions/login/actionTypes';

export function login(data, successCB, errorCB) {
  return (dispatch) => {
    api.login(data, function (success, data, error) {
      if (success) {
        if (data.exists) {
          dispatch({type: LOGGED_IN, data: data.user});
        }
        successCB(data);
      } else if (error) {
        errorCB(error);
      }
    });
  };
}

export function resetPassword(data, successCB, errorCB) {
  return (dispatch) => {
    api.resetPassword(data, function (success, _data, error) {
      if (success) {
        successCB();
      } else if (error) {
        errorCB(error);
      }
    });
  };
}

export function signOut(successCB, errorCB) {
  api.signOut(function (success, data, error) {
    if (success) {
      successCB();
    } else if (error) {
      errorCB(error);
    }
  });
}
