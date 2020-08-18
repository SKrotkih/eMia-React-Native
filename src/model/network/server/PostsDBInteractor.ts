/**
 * Sample React Native App
 * https://github.com/SKrotkih/eMia-React-Native
 *
 * @format
 * @flow
 */

import {DBPostsInteractor} from '../interfaces';
import {PostItemModel} from "../firebase/PostsDBInteractor";
import {Post} from "../../entities/post";

export class PostsDBInteractor implements DBPostsInteractor {

  fetchAllPosts(): Promise<PostItemModel[]> {
    return new Promise<PostItemModel[]>((resolve, reject) => {
      resolve([]);
    });
  }

  fetchMyPosts(): Promise<PostItemModel[]> {
    return new Promise<PostItemModel[]>((resolve, reject) => {
      resolve([]);
    });
  }

  uploadData(post: Post): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      resolve('');
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

