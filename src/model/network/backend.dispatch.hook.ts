/**
 * Sample React Native App
 * https://github.com/SKrotkih/eMia-React-Native
 *
 * @format
 * @flow
 */
/*
  Custom Hook
 */
import {useState, useEffect} from 'react';
import * as LocalStorage from '../localStorage/storage';
import * as StateActionsStorage from "../../redux/control/actions";
import * as StateAuthStorage from "../../redux/auth/actions";
import AuthApi from "./APIfactory/AuthApi";
import {Alert} from "react-native";

export enum TypeBackend {
  Firebase = 'firebase',
  Nodejs = 'nodejs',
}

export const useBackend = () => {
  const [backend, setBackend] = useState<TypeBackend>(null);
  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    BackendTypeState.getBackend().then((_backend) => {
      setBackend(_backend);
      setReady(true);
    });
  }, []);

  const toggleBackend = async () => {
    switch (backend) {
      case TypeBackend.Firebase:
        await BackendTypeState.setBackend(TypeBackend.Nodejs);
        setBackend(TypeBackend.Nodejs);
        break;
      case TypeBackend.Nodejs:
        await BackendTypeState.setBackend(TypeBackend.Firebase);
        setBackend(TypeBackend.Firebase);
        break;
    }
  };

  return {backend, ready, toggleBackend};
};

export class BackendTypeState {
  static keyName = 'backend';
  static defaultBackendType: TypeBackend = TypeBackend.Firebase;

  static async setBackend(value: TypeBackend) {
    await LocalStorage.setStorageObjectItem(this.keyName, value);
    StateActionsStorage.changeBackendType(value);
    setTimeout(() => {
      AuthApi().then((api) =>
        api
          .signOut()
          .then(() => {
            StateAuthStorage.logOut();
          })
          .catch((error) => {
            Alert.alert('Oops!', error.message);
          })
      );
    }, 500);
  }

  static async getBackend(): Promise<TypeBackend> {
    try {
      const backend = await LocalStorage.getStorageObjectItem(this.keyName);
      return backend;
    } catch (e) {
      await this.setBackend(this.defaultBackendType);
    }
    return Promise.resolve(this.defaultBackendType);
  }
}
