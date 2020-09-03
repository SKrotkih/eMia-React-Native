/**
 * Sample React Native App
 * https://github.com/SKrotkih/eMia-React-Native
 *
 * @format
 * @flow
 */
import {User} from "../../entities/user";

export interface Credentials {
  email: string;
  password: string;
}

export interface DBUsersInteractor {
  login(credentials: Credentials): Promise<{}>;
  registerNewUser(credentials: Credentials): Promise<string>;
  resetPassword(email: string): Promise<any>;
  signOut(): Promise<any>;
  isUserAuthenticated(): Promise<boolean>;
  getCurrentUserId(): Promise<string>;
  updateUser(user): Promise<any>;
  getCurrentUser(): Promise<User>;
  getUser(uid: string): Promise<User>;
  fetchAllUsers(): Promise<Array<User>>;
  getUserAvatarURL(uid: string): Promise<string>;
}
