import {getCurrentUserAsync, getUserAsync, registerNewUser} from '../../firebase/auth/api';
import {updateUser, fetchAllUsers, getUser} from '../../firebase/database/users';
import {LOGGED_IN} from '../../dbinteractor/login/actionTypes';

export function register(data, successCB, errorCB) {
  return (dispatch) => {
    registerNewUser(data)
      .then((user) => {
        successCB(user);
      })
      .catch((error) => {
        errorCB(error);
      });
  }
}

export function getCurrentUserId(callback) {
  getUserAsync()
    .then((uid) => {
      callback(uid);
    })
    .catch((error) => {
      console.log(error);
      callback(null);
    });
}

export function downloadCurrentUserData(callback) {
  getCurrentUserAsync()
    .then((user) => {
      callback(user);
    })
    .catch((error) => {
      console.log(error);
      callback(null);
    });
}

export function uploadCurrentUserData(user) {
  return new Promise((resolve, reject) => {
    updateUser(user)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function updateUserProfileData(user, successCB, errorCB) {
  return (dispatch) => {
    updateUser(user)
      .then(() => {
        dispatch({type: LOGGED_IN, data: user});
        successCB();
      })
      .catch((error) => {
        errorCB(error);
      });
  };
}

export function fetchUser(uid, callback) {
  getUser(uid)
    .then((user) => {
      callback(user);
    })
    .catch(() => {
      callback(null);
    })
}

export function fetchUsers(completion, failed) {
  return (dispatch) => {
    fetchAllUsers()
      .then((users) => {
        completion(users);
      })
      .catch((error) => {
        failed(error);
      })
  }
}
