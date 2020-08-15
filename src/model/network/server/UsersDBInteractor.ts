/**
 * Sample React Native App
 * https://github.com/SKrotkih/eMia-React-Native
 *
 * @format
 * @flow
 */

import {Credentials, DBInteractor} from '../interfaces';
import {User} from '../../entities/user';
import {httpRequest} from "./request/http.hook";

export class UsersDBInteractor implements DBInteractor {

  login(credentials: Credentials): Promise<{}> {
    return new Promise<{}>((resolve, reject) => {
      httpRequest('/api/auth/login', 'POST', credentials)
        .then((result) => {
          const {user, token} = result;
          // const authContext = useContext(AuthContext);
          //
          // const loginData = new LoginData(user._id, token);
          // authContext.login(loginData);
          resolve({uid: user._id, user: user});
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

// Register the user using email and password
  registerNewUser(credentials: Credentials): Promise<string> {
    return new Promise<{string}>((resolve, reject) => {
      httpRequest('/api/auth/register', 'POST', credentials)
        .then((result) => {
          const {uid, email, token} = result;
          // const loginData = new LoginData(user._id, token);
          // authContext.login(loginData);
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
      reject(Error('This functionality for "Node.js" backend has not implemented yet.'));
    });
  }

  signOut(): Promise<any> {
    return new Promise((resolve, reject) => {
    });
  }

  async isUserAuthenticated(): Promise<boolean> {
    return Promise.resolve(false);
  }

  getFirebaseUserId(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
    });
  }

// Get current registered user from the Authentication Firebase database
  getCurrentUserAsync(): Promise<User> {
    console.log('API. getCurrentUserAsync');
    return new Promise((resolve, reject) => {
    });
  }

  fetchUserData(uid: string): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      this.getUser(uid)
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

  updateUser(user): Promise<any> {
    return new Promise<User>((resolve, reject) => {
      reject(Error('Not implemented yet'));
    });
  }

  getUser(uid: string): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      reject(Error('Not implemented yet'));
    });
  }

  fetchAllUsers(): Promise<Array<User>> {
    return new Promise<User>((resolve, reject) => {
      reject(Error('Not implemented yet'));
    });
  }

}
