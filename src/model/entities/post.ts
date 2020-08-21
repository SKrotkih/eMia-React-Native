/**
 * Sample React Native App
 * https://github.com/SKrotkih/eMia-React-Native
 *
 * @format
 * @flow
 */

import {Alert} from 'react-native';
import {AuthApi, PostsApi, StorageApi} from '../network/interfaces';
import {isEmpty} from "../../utils/validate";
import {User} from './user';

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

  submitOnServer(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.title === null || isEmpty(this.title)) {
        reject('Please, enter post title');
      } else if (this.body === null || isEmpty(this.body)) {
        reject(Error('Please, enter post body'));
      } else {
        this.uploadPost((success) => {
          if (success) {
            resolve();
          } else {
            reject(Error('System Error: Post has not uploaded on server'));
          }
        });
      }
    });
  }

  private uploadPost(completed) {
    let _this = this;
    AuthApi()
      .getCurrentUser()
      .then((user) => {
        _this.uid = user._id;
        _this.author = user.username;
        PostsApi()
          .uploadData(_this)
          .then((id) => {
            let pictureUri = _this.pictureUri;
            if (pictureUri === null || pictureUri.length === 0) {
              completed(true);
            } else {
              StorageApi().uploadImage(pictureUri, id)
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

  update(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.title === null || isEmpty(this.title)) {
        reject('Please, enter post title');
      } else if (this.body === null || isEmpty(this.body)) {
        reject(Error('Please, enter post body'));
      } else {
        this.uploadPost((success) => {
          if (success) {
            resolve();
          } else {
            reject(Error('System Error: Post has not uploaded on server'));
          }
        });
      }
    });
  }
}
