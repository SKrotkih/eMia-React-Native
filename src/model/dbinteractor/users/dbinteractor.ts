/**
 * Sample React Native App
 * https://github.com/SKrotkih/eMia-React-Native
 *
 * @format
 * @flow
 */

import {AuthApi} from '../../network/interfaces';

export function register(data, successCB, errorCB) {
  AuthApi()
    .registerNewUser(data)
    .then((user) => {
      successCB(user);
    })
    .catch((error) => {
      errorCB(error);
    });
}

export function getCurrentUserId(callback) {
  AuthApi()
    .getFirebaseUserId()
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

export function uploadCurrentUserData(user): Promise<void> {
  return AuthApi().updateUser(user);
}

export function updateUserProfileData(user, successCB, errorCB) {
  AuthApi()
    .updateUser(user)
    .then(() => {
      successCB();
    })
    .catch((error) => {
      errorCB(error);
    });
}

export function fetchUser(uid, callback) {
  AuthApi()
    .getUser(uid)
    .then((user) => {
      callback(user);
    })
    .catch(() => {
      callback(null);
    })
}

export function fetchUsers(completion, failed) {
  AuthApi()
    .fetchAllUsers()
    .then((users) => {
      completion(users);
    })
    .catch((error) => {
      failed(error);
    })
}
