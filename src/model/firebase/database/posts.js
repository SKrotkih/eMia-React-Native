import {database} from '@model/firebase/config';
import {getDownloadURL} from '@model/firebase/storage/api';
import {getUser} from '@model/firebase/database/users';

export function fetchAllPosts(callback) {
  console.log('API. fetchAllPosts');
  database
    .ref('main')
    .child('posts')
    .once('value')
    .then(function (snapshot) {
      var items = [];
      parsePosts(snapshot, items);
      putUrlsPhoto(items, callback);
    })
    .catch((error) => callback(null, error));
}

function parsePosts(snapshot, items) {
  console.log('API. parsePosts');
  if (snapshot.val() !== null) {
    snapshot.forEach((child) => {
      items.push({
        value: child.val(),
        url: '',
        avatarUrl: '',
        author: null,
        key: child.key,
      });
    });
  }
}

function putUrlsPhoto(items, completion) {
  console.log('API. putUrlsPhoto');
  var counter = items.length;
  if (counter > 0) {
    items.forEach((item) => {
      var photoName = item.value.id + '.jpg';
      getDownloadURL(photoName, function (url) {
        item.url = url;
        var avatarName = item.value.uid + '.jpg';
        getDownloadURL(avatarName, function (_url) {
          item.avatarUrl = _url;
          getUser(item.value.uid, function (user) {
            item.author = user;
            counter -= 1;
            if (counter === 0) {
              const data = {items};
              completion(data, null);
            }
          });
        });
      });
    });
  } else {
    const data = {items};
    completion(data, null);
  }
}
