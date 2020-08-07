/**
 * Sample React Native App
 * https://github.com/SKrotkih/eMia-React-Native
 *
 * @format
 * @flow
 */

import {database} from '../config';
import {getUser} from './users';
import {getFirebaseUserId} from '../auth/api';
import {Post} from '../../entities/post';
import {User} from "../../entities/user";

export interface PostItemModel {
  post: Post;
  imageUrl: string;
  avatarUrl: string;
  author: User;
}

export function fetchAllPosts(): Promise<PostItemModel[]> {
  console.log('API. fetchAllPosts');
  return new Promise<PostItemModel[]>((resolve, reject) => {
    database
      .ref('main')
      .child('posts')
      .once('value')
      .then((snapshot) => {
        let items: PostItemModel[] = [];
        parsePosts(snapshot, items, function (post) {
          return true;
        });
        assignImagesUrl(items)
          .then((items) => {
            resolve(items);
          })
          .catch((error) => {
            reject(error);
          })
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function fetchMyPosts(): Promise<PostItemModel[]> {
  console.log('API. fetchMyPosts');
  return new Promise<PostItemModel[]>((resolve, reject) => {
    getFirebaseUserId()
      .then((uid) => {
        database
          .ref('main')
          .child('posts')
          .once('value')
          .then((snapshot) => {
            let items: PostItemModel[] = [];
            parsePosts(snapshot, items, function (post) {
              return post.uid === uid;
            });
            assignImagesUrl(items)
              .then((items) => {
                resolve(items);
              })
              .catch((error) => {
                reject(error);
              })
          })
          .catch((error) => {
            reject(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  });
}

export function uploadData(post: Post): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    database
      .ref('main')
      .child('posts')
      .push({
        title: post.title,
      })
      .then((url) => {
        let id = url.key;
        console.log(`Data set uploaded on key: ${id}`);
        database
          .ref('main')
          .child('posts')
          .child(id)
          .set({
            id: id,
            author: post.author,
            body: post.body,
            title: post.title,
            uid: post.uid,
            created: Date.now() / 1000.0,
            photosize: '500.0;500.0',
            starCount: 0,
          })
          .then(() => {
            resolve(id);
          })
          .catch((error) => {
            console.log(`Error: ${error}`);
          });
      })
      .catch((error) => {
        console.log(`Error: ${error}`);
      });
  });
}

function parsePosts(snapshot, items: PostItemModel[], testPost) {
  console.log('API. parsePosts');
  if (snapshot.val() !== null) {
    snapshot.forEach((child) => {
      let post = child.val();
      if (testPost(post)) {
        const postItem: PostItemModel = {
          post: child.val(),
          imageUrl: '',
          avatarUrl: '',
          author: null,
        };
        items.push(postItem);
      }
    });
  }
}

function assignImagesUrl(items: PostItemModel[]): Promise<PostItemModel[]> {
  console.log('API. assignImagesUrl');
  return new Promise((resolve, reject) => {
    let bufferLength = items.length;
    if (bufferLength === 0) {
      resolve(items);
      return;
    }
    items.forEach((item) => {
      let postId = item.post.id;
      let userId = item.post.uid;
      Post.getDownloadURL(postId)
        .then((url) => {
          item.imageUrl = url;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          Post.getDownloadURL(userId)
            .then((url) => {
              item.avatarUrl = url;
            })
            .catch((error) => {
              console.log(error);
            })
            .finally(() => {
              getUser(userId)
                .then((user) => {
                  item.author = user;
                  bufferLength -= 1;
                  if (bufferLength === 0) {
                    resolve(items);
                  }
                })
                .catch(() => {
                  bufferLength -= 1;
                  if (bufferLength === 0) {
                    resolve(items);
                  }
                });
            });
        });
    });
  });
}
