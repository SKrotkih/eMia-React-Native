/**
 * Sample React Native App
 * https://github.com/SKrotkih/eMia-React-Native
 *
 * @format
 * @flow
 */

import {AuthApi, DBPostsInteractor, PostItemModel} from '../interfaces';
import {Post, PostDocument} from '../../entities/post';
import {httpRequest} from './request/http.hook';

export class PostsDBInteractor implements DBPostsInteractor {
  fetchPosts(uid: string): Promise<PostItemModel[]> {
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
            const postItem: PostItemModel = {
              post: _post,
              imageUrl: _post.url,
              avatarUrl: null,
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
    const uid = await AuthApi().then((api) => api.getCurrentUserId());
    return this.fetchPosts(uid);
  }

  fetchPost(id: string): Promise<Post> {
    return new Promise<Post>((resolve, reject) => {
      let endPoint = `/api/posts/${id}`;
      httpRequest(endPoint, 'GET')
        .then((result) => {
          const post = new Post(result.post);
          resolve(post);
        })
        .catch((error) => {
          reject(error);
        });
    })
  }

  uploadData(post: PostDocument): Promise<string> {
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

  assignImagesUrl(items: PostItemModel[]): Promise<PostItemModel[]> {
    return new Promise((resolve, reject) => {
      resolve([]);
    });
  }

  getImageURL(postId: string): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        const post = await this.fetchPost(postId);
        resolve(post.url);
      } catch (e) {
        reject(e);
      }
    });
  };
}
