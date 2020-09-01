/**
 * Sample React Native App
 * https://github.com/SKrotkih/eMia-React-Native
 *
 * @format
 * @flow
 */

import {Alert} from 'react-native';
import {AuthApi, StorageApi} from '../network/interfaces';
import {ImagePickerResponse} from 'react-native-image-picker';
import {isEmpty} from "../../utils/validate";

export class User {
  _id: string;
  username: string;
  email: string;
  avatarUrl: string;
  password: string;
  address: string;
  gender: number;
  tokenAndroid: string;
  tokenIOS: string;
  yearbirth: number;

  constructor(snapshot: any) {
    this.username = snapshot.username;
    this.avatarUrl = snapshot.avatarUrl === undefined ? '' : snapshot.avatarUrl;
    this.address = snapshot.address === undefined ? '' : snapshot.address;
    this.email = snapshot.email === undefined ? '' : snapshot.email;
    this.gender = snapshot.gender === undefined ? 1 : snapshot.gender;
    this.tokenAndroid = snapshot.tokenAndroid === undefined ? '' : snapshot.tokenAndroid;
    this.tokenIOS = snapshot.tokenIOS === undefined ? '' : snapshot.tokenIOS;
    this.yearbirth = snapshot.yearbirth === undefined ? 0 : snapshot.yearbirth;
    this.password = snapshot.password === undefined ? '' : snapshot.password;
    if (snapshot._id) {
      this._id = snapshot._id;
    } else if (snapshot.id) {
      this._id = snapshot.id;
    }
    this.update = this.update.bind(this);
  }

  get id(): string {
    return this._id;
  }

  async update(photo: ImagePickerResponse, completed) {
    try {
      if (photo && photo.uri) {
        const avatarUrl = await StorageApi().then((api) => api.uploadImage(photo, this.id));
        if (avatarUrl && !isEmpty(avatarUrl)) {
          this.avatarUrl = avatarUrl;
        }
      }
      await AuthApi().then((api) => api.updateUser(this));
      completed(true);
    } catch (error) {
      Alert.alert('Failed uploading photo!', `${error}`, [], {
        cancelable: false,
      });
      completed(false);
    }
  }
}
