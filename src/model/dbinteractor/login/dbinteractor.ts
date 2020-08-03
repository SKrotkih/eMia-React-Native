/**
 * Sample React Native App
 * https://github.com/SKrotkih/eMia-React-Native
 *
 * @format
 * @flow
 */

import {
  Credentials,
  signIn,
  signOut,
  registerNewUser,
  resetPassword,
  fetchUserData,
} from '../../firebase/auth/api';

export function login(credentials: Credentials) {
  return new Promise<{}>((resolve, reject) => {
    signIn(credentials)
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

export function register(credentials: Credentials): Promise<string> {
  return registerNewUser(credentials);
}

export function logOut(): Promise<any> {
  return signOut();
}

export function remindPassword(email: string): Promise<any> {
  return resetPassword(email);
}
