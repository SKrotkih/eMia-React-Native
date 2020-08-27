/**
 * Sample React Native App
 * https://github.com/SKrotkih/eMia-React-Native
 *
 * @format
 * @flow
 */

import {AuthApi, PostsApi, StorageApi} from '../network/interfaces';
import {isEmpty} from '../../utils/validate';
import {User} from './user';
import {ImagePickerResponse} from 'react-native-image-picker';

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
    this.imagePickerResponse = snapshot.imagePickerResponse ? snapshot.imagePickerResponse : null;

    this.uploadPost = this.uploadPost.bind(this);
  }

  update(): Promise<any> {
    return this.submitOnServer();
  }

  submitOnServer(): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        if (this.title === null || isEmpty(this.title)) {
          reject('Please, enter post title');
        } else if (this.body === null || isEmpty(this.body)) {
          reject(Error('Please, enter post body'));
        } else {
          await this.uploadPost();
          resolve();
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  async uploadPost() {
    try {
      const user = await AuthApi().getCurrentUser();
      this.uid = user._id;
      this.author = user.username;
      const postId = await PostsApi().uploadData(this.postDocument());
      this._id = postId;
      if (this.imagePickerResponse && this.imagePickerResponse.uri) {
        const imageUrl = await StorageApi().uploadImage(
          this.imagePickerResponse,
          postId,
        );
        this.url = imageUrl;
        // Update Post (new imageUrl and _id):
        await PostsApi().uploadData(this.postDocument());
      }
    } catch (error) {
      throw error;
    }
  }
}
