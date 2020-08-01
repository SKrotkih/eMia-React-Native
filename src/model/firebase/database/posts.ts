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

export function fetchAllPosts() {
  console.log('API. fetchAllPosts');
  return new Promise((resolve, reject) => {
    database
      .ref('main')
      .child('posts')
      .once('value')
      .then((snapshot) => {
        let items = [];
        parsePosts(snapshot, items, function (post) {
          return true;
        });
        putUrlsPhoto(items, (data, error) => {
          if (error) {
            reject(error);
          } else {
            resolve(data.items);
          }
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function fetchMyPosts() {
  console.log('API. fetchMyPosts');
  return new Promise((resolve, reject) => {
    getFirebaseUserId()
      .then((uid) => {
        database
          .ref('main')
          .child('posts')
          .once('value')
          .then((snapshot) => {
            let items = [];
            parsePosts(snapshot, items, function (post) {
              return post.uid === uid;
            });
            putUrlsPhoto(items, (data, error) => {
              if (error) {
                reject(error);
              } else {
                resolve(data.items);
              }
            });
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

export function uploadData(post, completion) {
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
          completion(id);
        })
        .catch((error) => {
          console.log(`Error: ${error}`);
        });
    })
    .catch((error) => {
      console.log(`Error: ${error}`);
    });
}

function parsePosts(snapshot, items, testPost) {
  console.log('API. parsePosts');
  if (snapshot.val() !== null) {
    snapshot.forEach((child) => {
      let post = child.val();
      if (testPost(post)) {
        items.push({
          post: child.val(),
          imageUrl: '',
          avatarUrl: '',
          author: null,
        });
      }
    });
  }
}

function putUrlsPhoto(items, completion) {
  console.log('API. putUrlsPhoto');
  let bufferLength = items.length;
  if (bufferLength === 0) {
    const data = {items};
    completion(data, null);
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
                  const data = {items};
                  completion(data, null);
                }
              })
              .catch(() => {
                bufferLength -= 1;
                if (bufferLength === 0) {
                  const data = {items};
                  completion(data, null);
                }
              });
          });
      });
  });
}
