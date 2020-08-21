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
import {ImagePickerResponse} from "react-native-image-picker";

export class PostDocument {
  _id: string;
  author: string;
  body: string;
  title: string;
  url: string;
  uid: string;
  created: string;
  owner: User;
}

export class Post {
  _id: string;
  author: string;
  body: string;
  title: string;
  url: string;
  uid: string;
  created: string;
  owner: User;

  imagePickerResponse: ImagePickerResponse;

  postDocument(): PostDocument {
    const doc = new PostDocument();
    doc._id = this._id;
    doc.author = this.author;
    doc.body = this.body;
    doc.title = this.title;
    doc.url = this.url;
    doc.uid = this.uid;
    doc.created = this.created;
    doc.owner = this.owner;
    return doc;
  }

  constructor(snapshot: any) {
    if (snapshot._id !== undefined) {
      this._id = snapshot._id;
    }
    this.author = snapshot.author === undefined ? '' : snapshot.author;
    this.body = snapshot.body === undefined ? '' : snapshot.body;
    this.title = snapshot.title === undefined ? '' : snapshot.title;
    this.url = snapshot.url === undefined ? '' : snapshot.url;
    this.uid = snapshot.uid === undefined ? '' : snapshot.uid;
    this.created = snapshot.updatedAt === undefined ? null : snapshot.updatedAt;
    this.owner = snapshot.owner ? snapshot.owner : null;
  }

  submitOnServer(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
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
          .uploadData(this.postDocument())
          .then((id) => {
            let imagePickerResponse = _this.imagePickerResponse;
            if (imagePickerResponse === null || imagePickerResponse.length === 0) {
              completed(true);
            } else {
              StorageApi().uploadImage(imagePickerResponse, id)
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
