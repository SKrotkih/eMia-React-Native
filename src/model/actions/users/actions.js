import authApi from '@model/firebase/auth/api';
import {getCurrentUser} from '@model/firebase/auth/api';
import api from '@model/firebase/database/api';
import {LOGGED_IN} from '@model/actions/login/actionTypes';

export function register(data, successCB, errorCB) {
  return (dispatch) => {
    authApi.register(data, function (success, _data, error) {
      if (success) {
        successCB(_data);
      } else if (error) {
        errorCB(error);
      }
    });
  };
}

export function downloadCurrentUserData(callback) {
  getCurrentUser(function (user) {
    callback(user);
  });
}

export function createUser(user, successCB, errorCB) {
  return (dispatch) => {
    api.createUser(user, function (success, data, error) {
      if (success) {
        dispatch({type: LOGGED_IN, data: user});
        successCB();
      } else if (error) {
        errorCB(error);
      }
    });
  };
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

export function fetchUsers(completion, failed) {
  return (dispatch) => {
    api.fetchAllUsers(function (data, error) {
      if (data.items === null) {
        failed(error);
      } else {
        completion(data.items);
      }
    });
  };
}
