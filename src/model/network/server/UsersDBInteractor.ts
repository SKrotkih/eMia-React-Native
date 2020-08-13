/**
 * Sample React Native App
 * https://github.com/SKrotkih/eMia-React-Native
 *
 * @format
 * @flow
 */

import {Credentials, DBInteractor} from "../interfaces";
import {User} from "../../entities/user";

export class UsersDBInteractor implements DBInteractor {
  // Sign user in with their email and password
  // returns uid
  signIn(credentials: Credentials): Promise<string> {
    return new Promise<string>((resolve, reject) => {
    });
  }

  login(credentials: Credentials) {


  }

// Register the user using email and password
  registerNewUser(credentials: Credentials): Promise<string> {
    return new Promise<string>((resolve, reject) => {
    });
  }

// Send Password Reset Email
  resetPassword(email: string): Promise<any> {
    return new Promise((resolve, reject) => {
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
    });
  }
}
