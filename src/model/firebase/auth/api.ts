/**
 * Sample React Native App
 * https://github.com/SKrotkih/eMia-React-Native
 *
 * @format
 * @flow
 */

import {auth} from '../config';
import {getUser} from '../database/users';
import {User} from "../../entities/user";

export interface Credentials {
  email: string;
  password: string;
}

// Sign user in with their email and password
// returns uid
export function signIn(credentials: Credentials): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    console.log('API. LOGIN email: ', credentials.email, 'password: ', credentials.password);
    auth
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then((value) => {
        const uid = value.user.uid;
        resolve(uid);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Register the user using email and password
export function registerNewUser(credentials: Credentials): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    console.log('API. REGISTER email: ', credentials.email, 'password: ', credentials.password);
    auth
      .createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then((value) => {
        const uid = value.user.uid;
        resolve(uid);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Send Password Reset Email
export function resetPassword(email: string): Promise<any> {
  return new Promise((resolve, reject) => {
    auth
      .sendPasswordResetEmail(email)
      .then((user) => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function signOut(): Promise<any> {
  return new Promise((resolve, reject) => {
    auth
      .signOut()
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function checkLoginStatus(): Promise<boolean> {
  return new Promise((resolve, reject) => {
    getCurrentUserAsync()
      .then((user) => {
        if (user === null) {
          resolve(false);
        } else {
          resolve(true);
        }
      })
      .catch(() => {
        resolve(false);
      });
  });
}

export function getFirebaseUserId(): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    auth.onAuthStateChanged((user) => {
      if (user === null) {
        reject('The User has not signed in yet');
      } else {
        resolve(user.uid);
      }
    });
  });
}

// Get current registered user from the Authentication Firebase database
export function getCurrentUserAsync(): Promise<User> {
  console.log('API. getCurrentUserAsync');
  return new Promise((resolve, reject) => {
    getFirebaseUserId()
      .then((uid) => {
        fetchUserData(uid)
          .then((user) => {
            resolve(user);
          })
          .catch((error) => {
            reject(`Error while fetch user data: ${error}`);
          });
      })
      .catch((error) => {
        reject(`Could not get Auth User response. Error: ${error}`);
      });
  });
}

export function fetchUserData(uid: string): Promise<User> {
  return new Promise<User>((resolve, reject) => {
    getUser(uid)
      .then((user) => {
        if (user === null) {
          reject(`User with uid=${uid} is not presented in the data base`);
        } else {
          resolve(user);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}
