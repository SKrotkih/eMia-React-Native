/**
 * Sample React Native App
 * https://github.com/SKrotkih/eMia-React-Native
 *
 * @format
 * @flow
 */

import {UsersDBInteractor as FirebaseDBInteractor} from "../firebase/UsersDBInteractor";
import {UsersDBInteractor as ServerDBInteractor} from "../server/UsersDBInteractor";
import {DBUsersInteractor} from "../interfaces/DBUsersInteractor";
import {BackendTypeState, TypeBackend} from "../backend.dispatch.hook";

const firebaseInteractor = new FirebaseDBInteractor();
const serverInteractor = new ServerDBInteractor();

export default function AuthApi(): Promise<DBUsersInteractor> {
  return new Promise<DBUsersInteractor>((resolve, reject) => {
    BackendTypeState.getBackend().then((backend) => {
      switch (backend) {
        case TypeBackend.Nodejs:
          resolve(serverInteractor);
          break;
        case TypeBackend.Firebase:
          resolve(firebaseInteractor);
          break;
      }
    });
  });
}
