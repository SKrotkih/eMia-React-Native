/**
 * Sample React Native App
 * https://github.com/SKrotkih/eMia-React-Native
 *
 * @format
 * @flow
 */

import {Alert} from 'react-native';
import {uploadImage} from '../firebase/utils/uploadImage';
import {uploadData} from '../firebase/database/posts';
import {getCurrentUserAsync} from '../firebase/auth/api';
import {storage} from '../../model/firebase/config';
import {isEmpty} from "../../utils/validate";

export class Post {
  author: string;
  body: string;
  title: string;
  url: string;
  pictureUri: string;
  uid: string;

  constructor(title, body, pictureUri) {
    this.author = '';
    this.body = body;
    this.title = title;
    this.url = '';
    this.pictureUri = pictureUri;
    this.uid = '';
  }

  static getDownloadURL(postId) {
    console.log('Post. getDownloadURL');
    return new Promise((resolve, reject) => {
      const photoName = postId + '.jpg';
      const imageRef = storage.ref(photoName);
      imageRef
        .getDownloadURL()
        .then((url) => {
          resolve(url);
        })
        .catch((error) => {
          reject(error);
        });
    })
  }

  submitOnServer() {
    return new Promise((resolve, reject) => {
      if (this.title === null || isEmpty(this.title)) {
        reject('Please, enter post title');
      } else if (this.body === null || isEmpty(this.body)) {
        reject('Please, enter post body');
      } else {
        this.addPost((success) => {
          if (success) {
            resolve();
          }  else {
            reject('');
          }
        });
      }
    })
  }

  private addPost(completed) {
    let _this = this;
    getCurrentUserAsync()
      .then((user) => {
        _this.uid = user.id;
        _this.author = user.username;
        uploadData(_this, (id) => {
          let pictureUri = _this.pictureUri;
          if (pictureUri === null || pictureUri.length === 0) {
            completed(true);
          } else {
            uploadImage(pictureUri, id)
              .then((pictureUrl) => {
                _this.url = pictureUrl;
                console.log(`Image's url: ${_this.url}`);
                completed(true);
              })
              .catch((error) => {
                if (error !== null) {
                  Alert.alert('Error', `${error}`);
                }
                completed(false);
              });
          }
        });
      })
      .catch((error) => {
        Alert.alert('Error', `${error}`);
        console.log(error);
      });
  }
}
