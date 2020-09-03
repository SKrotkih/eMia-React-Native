/**
 * Sample React Native App
 * https://github.com/SKrotkih/eMia-React-Native
 *
 * @format
 * @flow
 */

import {StorageDBInteractor as FirebaseStorageDBInteractor} from "../firebase/StorageDBInteractor";
import {StorageDBInteractor as ServerStorageDBInteractor} from "../server/StorageDBInteractor";
import {DBStorageInteractor} from "../interfaces/DBStorageInteractor";
import {BackendTypeState, TypeBackend} from "../backend.dispatch.hook";

const firebaseStorageInteractor = new FirebaseStorageDBInteractor();
const serverStorageInteractor = new ServerStorageDBInteractor();

export default function StorageApi(): Promise<DBStorageInteractor> {
  return new Promise<DBStorageInteractor>((resolve, reject) => {
    BackendTypeState.getBackend().then((backend) => {
      switch (backend) {
        case TypeBackend.Nodejs:
          resolve(serverStorageInteractor);
          break;
        case TypeBackend.Firebase:
          resolve(firebaseStorageInteractor);
          break;
      }
    });
  });
}
