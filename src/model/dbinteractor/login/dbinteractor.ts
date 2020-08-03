/**
 * Sample React Native App
 * https://github.com/SKrotkih/eMia-React-Native
 *
 * @format
 * @flow
 */

import {
  signIn,
  signOut,
  registerNewUser,
  resetPassword,
  fetchUserData,
} from '../../firebase/auth/api';

export function login(data) {
  return new Promise<{}>((resolve, reject) => {
    signIn(data)
      .then((uid) => {
        console.log('LOGIN SUCCESS. User UID=', uid);
        fetchUserData(uid)
          .then((currentUser) => {
            resolve({uid: uid, user: currentUser});
          })
          .catch((error) => {
            console.error(error);
            resolve({uid: uid, user: null});
          });
      })
      .catch((error) => {
        console.log('LOGIN ERROR: ', error);
        reject(error);
      });
  });
}

export function register(data): Promise<string> {
  return registerNewUser(data);
}

export function logOut(): Promise<any> {
  return signOut();
}

export function remindPassword(data): Promise<any> {
  return resetPassword(data);
}
