import {database} from '@model/firebase/config';
import {getDownloadURL} from '@model/firebase/storage/api';
import {getUser} from '@model/firebase/database/users';

export function fetchAllPosts(callback) {
  console.log('API. fetchAllPosts');
  database
    .ref('main')
    .child('posts')
    .once('value')
    .then((snapshot) => {
      var items = [];
      parsePosts(snapshot, items);
      putUrlsPhoto(items, callback);
    })
    .catch((error) => {
      callback(null, error);
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

function parsePosts(snapshot, items) {
  console.log('API. parsePosts');
  if (snapshot.val() !== null) {
    snapshot.forEach((child) => {
      items.push({
        value: child.val(),
        url: '',
        avatarUrl: '',
        key: child.key,
      });
    });
  }
}

function putUrlsPhoto(items, completion) {
  console.log('API. putUrlsPhoto');
  var bufferLength = items.length;
  if (bufferLength === 0) {
    const data = {items};
    completion(data, null);
    return;
  }
  items.forEach((item) => {
    var photoName = item.value.id + '.jpg';
    getDownloadURL(photoName, (photoUrl) => {
      item.url = photoUrl;
      var avatarName = item.value.uid + '.jpg';
      getDownloadURL(avatarName, (avatarUrl) => {
        item.avatarUrl = avatarUrl;
        getUser(item.value.uid, (user) => {
          item.author = user;
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
