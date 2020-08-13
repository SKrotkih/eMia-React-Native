/**
 * Sample React Native App
 * https://github.com/SKrotkih/eMia-React-Native
 *
 * @format
 * @flow
 */

import {auth} from './config';
import {getUser} from './database/users';
import {User} from "../../entities/user";
import {AuthApi, Credentials, DBInteractor} from "../interfaces";

export class UsersDBInteractor implements DBInteractor {
  // Sign user in with their email and password
  // returns uid
  signIn(credentials: Credentials): Promise<string> {
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

  login(credentials: Credentials) {
    return new Promise<{}>((resolve, reject) => {
      this.signIn(credentials)
        .then((uid) => {
          console.log('LOGIN SUCCESS. User UID=', uid);
          this.fetchUserData(uid)
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


// Register the user using email and password
  registerNewUser(credentials: Credentials): Promise<string> {
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
  resetPassword(email: string): Promise<any> {
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

  signOut(): Promise<any> {
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

  async isUserAuthenticated(): Promise<boolean> {
    try {
      const user = await getCurrentUserAsync();
      return Promise.resolve(user !== null);
    } catch (error) {
      console.log(error);
      return Promise.resolve(false);
    }
  }

  getFirebaseUserId(): Promise<string> {
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
  getCurrentUserAsync(): Promise<User> {
    console.log('API. getCurrentUserAsync');
    return new Promise((resolve, reject) => {
      this.getFirebaseUserId()
        .then((uid) => {
          this.fetchUserData(uid)
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

  fetchUserData(uid: string): Promise<User> {
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
}
