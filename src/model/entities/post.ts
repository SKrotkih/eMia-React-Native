/**
 * Sample React Native App
 * https://github.com/SKrotkih/eMia-React-Native
 *
 * @format
 * @flow
 */

import {Alert} from 'react-native';
import {uploadImage} from '../network/firebase/utils/uploadImage';
import {AuthApi, PostsApi} from '../network/interfaces';
import {storage} from '../network/firebase/config';
import {isEmpty} from "../../utils/validate";
import { User } from './user';

export class Post {
  _id: string;
  author: string;
  body: string;
  title: string;
  url: string;
  pictureUri: string;
  uid: string;
  created: string;
  owner: User;

  constructor(snapshot: any) {
    if (snapshot._id !== undefined) {
      this._id = snapshot._id;
    }
    this.author = snapshot.author === undefined ? '' : snapshot.author;
    this.body = snapshot.body === undefined ? '' : snapshot.body;
    this.title = snapshot.title === undefined ? '' : snapshot.title;
    this.url = snapshot.url === undefined ? '' : snapshot.url;
    this.pictureUri = snapshot.pictureUri === undefined ? '' : snapshot.pictureUri;
    this.uid = snapshot.uid === undefined ? '' : snapshot.uid;
    this.created = snapshot.updatedAt === undefined ? null : snapshot.updatedAt;
    this.owner = snapshot.owner ? snapshot.owner : null;
  }

  static getDownloadURL(postId) {
    console.log('Post. getDownloadURL');
    return new Promise<string>((resolve, reject) => {
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
    });
  }

  submitOnServer(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.title === null || isEmpty(this.title)) {
        reject('Please, enter post title');
      } else if (this.body === null || isEmpty(this.body)) {
        reject(Error('Please, enter post body'));
      } else {
        this.addPost((success) => {
          if (success) {
            resolve();
          } else {
            reject(Error('System Error: Post has not uploaded on server'));
          }
        });
      }
    });
  }

  private addPost(completed) {
    let _this = this;
    AuthApi()
      .getCurrentUser()
      .then((user) => {
        _this.uid = user._id;
        _this.author = user.username;
        PostsApi().uploadData(_this)
          .then((id) => {
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
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        Alert.alert('Error', `${error}`);
        console.log(error);
      });
  }
}
