import {Alert} from 'react-native';
import {uploadImage} from '../../model/firebase/utils/uploadImage';
import {uploadCurrentUserData} from '../../model/dbinteractor/users/dbinteractor';
import {storage} from '../../model/firebase/config';

export class User {
  address: string;
  email: string;
  gender: number;
  id: string;
  tokenAndroid: string;
  tokenIOS: string;
  username: string;
  yearbirth: number;

  constructor(uid: string, name: string) {
    this.address = '';
    this.email = '';
    this.gender = 1;
    this.id = uid;
    this.tokenAndroid = '';
    this.tokenIOS = '';
    this.username = name;
    this.yearbirth = 1970;
  }

  // Snapshot from Firebase Users table item
  parse(snapshot: any) {
    this.id = snapshot.id;
    this.username = snapshot.username;
    this.address = snapshot.address === undefined ? '' : snapshot.address;
    this.email = snapshot.email === undefined ? '' : snapshot.email;
    this.gender = snapshot.gender === undefined ? 1 : snapshot.gender;
    this.tokenAndroid = snapshot.tokenAndroid === undefined ? '' : snapshot.tokenAndroid;
    this.tokenIOS = snapshot.tokenIOS === undefined ? '' : snapshot.tokenIOS;
    this.yearbirth = snapshot.yearbirth === undefined ? 0 : snapshot.yearbirth;
    if (this.id === undefined) {
      this.id = snapshot.uid;
    }
  }

  update(photoUrl: string, completed) {
    if (this.username === null || this.username.length === 0) {
      Alert.alert(
        `Please, enter your name`,
      )
      completed(false);
      return;
    }
    let _this = this;
    uploadCurrentUserData(_this)
      .then(() => {
        uploadImage(photoUrl, _this.id)
          .then(() => {
            completed(true);
          })
          .catch((error) => {
            if (error !== null) {
              Alert.alert(
                `Error while uploading photo`,
                `${error}`,
                [],
                { cancelable: false }
              )
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
          )
        }
        completed(false);
      });
  }

  getDownloadURL() {
    console.log('User. getDownloadURL');
    return new Promise((resolve, reject) => {
      const photoName = this.id + '.jpg';
      const imageRef = storage.ref(photoName);
      imageRef
        .getDownloadURL()
        .then((url) => {
          resolve(url);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
