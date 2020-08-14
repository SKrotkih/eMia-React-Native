/**
 * Sample React Native App
 * https://github.com/SKrotkih/eMia-React-Native
 *
 * @format
 * @flow
 */

import {AuthApi} from '../../network/interfaces';
import {updateUser, fetchAllUsers, getUser} from '../../network/firebase/database/users';

export function register(data, successCB, errorCB) {
  AuthApi().registerNewUser(data)
    .then((user) => {
      successCB(user);
    })
    .catch((error) => {
      errorCB(error);
    });
}

export function getCurrentUserId(callback) {
  AuthApi().getFirebaseUserId()
    .then((uid) => {
      callback(uid);
    })
    .catch((error) => {
      console.log(error);
      callback(null);
    });
}

export function downloadCurrentUserData(callback) {
  AuthApi()
    .getCurrentUserAsync()
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
  updateUser(user)
    .then(() => {
      successCB();
    })
    .catch((error) => {
      errorCB(error);
    });
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
  fetchAllUsers()
    .then((users) => {
      completion(users);
    })
    .catch((error) => {
      failed(error);
    })
}
