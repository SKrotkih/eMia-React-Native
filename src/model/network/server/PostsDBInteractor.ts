/**
 * Sample React Native App
 * https://github.com/SKrotkih/eMia-React-Native
 *
 * @format
 * @flow
 */

import {DBPostsInteractor} from '../interfaces';
import {PostItemModel} from '../firebase/PostsDBInteractor';
import {Post} from '../../entities/post';
import {httpRequest} from './request/http.hook';
import {User} from '../../entities/user';

export class PostsDBInteractor implements DBPostsInteractor {
  fetchAllPosts(): Promise<PostItemModel[]> {
    return new Promise<PostItemModel[]>((resolve, reject) => {
      httpRequest('/api/posts/posts', 'GET')
        .then((result) => {

         console.log(result)

          resolve([]);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  fetchMyPosts(): Promise<PostItemModel[]> {
    return new Promise<PostItemModel[]>((resolve, reject) => {
      resolve([]);
    });
  }

  uploadData(post: Post): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      httpRequest('/api/posts/post', 'POST', {post})
        .then((result) => {
          console.log(result);
          resolve(result._id);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  parsePosts(snapshot, items: PostItemModel[], testPost) {

  }

  assignImagesUrl(items: PostItemModel[]): Promise<PostItemModel[]> {
    return new Promise((resolve, reject) => {
      resolve([]);
    });
  }
}

