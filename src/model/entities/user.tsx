/**
 * Sample React Native App
 * https://github.com/SKrotkih/eMia-React-Native
 *
 * @format
 * @flow
 */

import {Alert} from 'react-native';
import {uploadImage} from '../network/firebase/utils/uploadImage';
import {AuthApi} from '../network/interfaces';

export class User {
  _id: string;
  username: string;
  email: string;
  password: string;
  address: string;
  gender: number;
  tokenAndroid: string;
  tokenIOS: string;
  yearbirth: number;

  constructor(snapshot: any) {
    this._id = snapshot._id;
    this.username = snapshot.username;
    this.address = snapshot.address === undefined ? '' : snapshot.address;
    this.email = snapshot.email === undefined ? '' : snapshot.email;
    this.gender = snapshot.gender === undefined ? 1 : snapshot.gender;
    this.tokenAndroid = snapshot.tokenAndroid === undefined ? '' : snapshot.tokenAndroid;
    this.tokenIOS = snapshot.tokenIOS === undefined ? '' : snapshot.tokenIOS;
    this.yearbirth = snapshot.yearbirth === undefined ? 0 : snapshot.yearbirth;
    this.password = snapshot.password === undefined ? '' : snapshot.password;
    if (this._id === undefined) {
      this._id = snapshot.uid;
    }
  }

  update(photoUrl: string, completed) {
    let _this = this;
    AuthApi()
      .updateUser(_this)
      .then(() => {
        uploadImage(photoUrl, _this.id)
          .then(() => {
            completed(true);
          })
          .catch((error) => {
            if (error !== null) {
              Alert.alert('Error while uploading photo', `${error}`, [], {
                cancelable: false,
              });
            }
            completed(true); // Return OK in case of failed uploading photo
          });
      })
      .catch((error) => {
        if (error !== null) {
          Alert.alert(
            `Error while uploading data on the server`,
            `${error}`,
            [],
            { cancelable: false }
          );
        }
        completed(false);
      });
  }
}
