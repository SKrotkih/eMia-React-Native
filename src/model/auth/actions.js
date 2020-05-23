import * as t from './actionTypes';
import * as api from './api';
import {auth} from '@model/firebase';
export function register(data, successCB, errorCB) {
  return (dispatch) => {
    api.register(data, function (success, _data, error) {
      if (success) {
        successCB(_data);
      } else if (error) {
        errorCB(error);
      }
    });
  };
}

export function createUser(user, successCB, errorCB) {
  return (dispatch) => {
    api.createUser(user, function (success, data, error) {
      if (success) {
        dispatch({type: t.LOGGED_IN, data: user});
        successCB();
      } else if (error) {
        errorCB(error);
      }
    });
  };
}

export function login(data, successCB, errorCB) {
  return (dispatch) => {
    api.login(data, function (success, data, error) {
      if (success) {
        if (data.exists) {
          dispatch({type: t.LOGGED_IN, data: data.user});
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

export function getCurrentUser(callback) {
  api.getCurrentUser(function (user) {
    callback(user);
  });
}

export function getUser(uid, callback) {
  api.getUser(uid, function (success, data, error) {
    if (success && data.exists) {
      const user = data.user.user;
      callback(user);
    } else {
      console.log('API. GET USER failed request');
      callback(null);
    }
  });
}

export function checkLoginStatus(callback) {
  return (dispatch) => {
    auth.onAuthStateChanged((user) => {
      let isLoggedIn = user !== null;
      if (isLoggedIn) {
        dispatch({type: t.LOGGED_IN, data: user});
      } else {
        dispatch({type: t.LOGGED_OUT});
      }
      callback(isLoggedIn);
    });
  };
}
