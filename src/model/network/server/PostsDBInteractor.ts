/**
 * Sample React Native App
 * https://github.com/SKrotkih/eMia-React-Native
 *
 * @format
 * @flow
 */

import {AuthApi, DBPostsInteractor, PostItemModel} from '../interfaces';
import {Post} from '../../entities/post';
import {httpRequest} from './request/http.hook';

export class PostsDBInteractor implements DBPostsInteractor {
  fetchAllPosts(uid: string): Promise<PostItemModel[]> {
    return new Promise<PostItemModel[]>((resolve, reject) => {
      let endPoint = '';
      if (uid) {
        endPoint = `/api/posts/posts/${uid}`;
      } else {
        endPoint = '/api/posts/posts';
      }
      httpRequest(endPoint, 'GET')
        .then((result) => {
          let allPosts: PostItemModel[] = [];
          result.forEach((element) => {
            const _post = new Post(element);
            const postItem = {
              post: _post,
              imageUrl: '',
              avatarUrl: '',
              author: _post.owner,
            };
            allPosts.push(postItem);
          });
          resolve(allPosts);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async fetchMyPosts(): Promise<PostItemModel[]> {
    const uid = await AuthApi().getCurrentUserId();
    return this.fetchAllPosts(uid);
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
