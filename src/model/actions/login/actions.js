import {signIn, signOut, resetPassword} from '@model/firebase/auth/api';
import {LOGGED_IN} from '@model/actions/login/actionTypes';

export function login(data, successCB, errorCB) {
  return (dispatch) => {
    signIn(data, function (success, data, error) {
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

export function logOut(successCB, errorCB) {
  signOut(function (success, data, error) {
    if (success) {
      successCB();
    } else if (error) {
      errorCB(error);
    }
  });
}

export function forgetPassword(data, successCB, errorCB) {
  return (dispatch) => {
    resetPassword(data, function (success, _data, error) {
      if (success) {
        successCB();
      } else if (error) {
        errorCB(error);
      }
    });
  };
}
