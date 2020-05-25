import {database, storage} from '@model/firebase';
import * as usersActions from '@model/auth/actions';
import {Platform} from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import FirebaseClient from 'firebase';

export function fetchAllUsers(callback) {
  console.log('API. fetchAllUsers');
  database
    .ref('main')
    .child('users')
    .once('value')
    .then(function (snapshot) {
      var items = [];
      if (snapshot.val() !== null) {
        snapshot.forEach((child) => {
          items.push({
            value: child.val(),
            key: child.key,
          });
        });
      }
      const data = {items};
      callback(data, null);
    })
    .catch((error) => callback(null, error));
}

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

export function uploadImage(uri) {
  // Prepare Blob support
  const Blob = RNFetchBlob.polyfill.Blob;
  const fs = RNFetchBlob.fs;
  window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
  window.Blob = Blob;
  return new Promise((resolve, reject) => {
    const mime = 'application/octet-stream';
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    let uploadBlob = null;
    const imageRef = FirebaseClient.storage().ref('images').child('image_001');
    fs.readFile(uploadUri, 'base64')
      .then((data) => {
        return Blob.build(data, {type: `${mime}BASE64`});
      })
      .then((blob) => {
        uploadBlob = blob;
        return imageRef.put(blob, {contentType: mime});
      })
      .then(() => {
        uploadBlob.close();
        return imageRef.getDownloadURL();
      })
      .then((url) => {
        resolve(url);
      })
      .catch((error) => {
        reject(error);
      });
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
          usersActions.getUser(item.value.uid, function (user) {
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

function getDownloadURL(photoName, callback) {
  const imageRef = storage.ref(photoName);
  imageRef.getDownloadURL().then(
    (url) => {
      callback(url);
    },
    function (error) {
      console.log(error);
    },
  );
}
