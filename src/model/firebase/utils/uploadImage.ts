/**
 * Sample React Native App
 * https://github.com/SKrotkih/eMia-React-Native
 *
 * @format
 * @flow
 */

import {Platform} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import FirebaseClient from 'firebase';
import {isEmpty} from 'lodash';

export function uploadImage(uri, id) {
  return new Promise((resolve, reject) => {
    if (isEmpty(uri)) {
      reject(null);
    } else {
      const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
      const Blob = RNFetchBlob.polyfill.Blob;
      const fs = RNFetchBlob.fs;
      window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
      window.Blob = Blob;
      let uploadBlob = null;
      let fileName = `${id}.jpg`;
      const imageRef = FirebaseClient.storage().ref('').child(fileName);
      fs.readFile(uploadUri, 'base64')
        .then((data) => {
          const mime = 'application/octet-stream';
          return Blob.build(data, {type: `${mime}BASE64`});
        })
        .then((blob) => {
          uploadBlob = blob;
          const mime = 'application/octet-stream';
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
    }
  });
}
