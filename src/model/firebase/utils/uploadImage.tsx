import {Platform} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import FirebaseClient from 'firebase';
import {isEmpty} from 'lodash';

export function uploadImage(uri, id) {
  return new Promise((resolve, reject) => {
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    if (isEmpty(uploadUri)) {
      reject('Source file name to upload is not presented!');
    } else {
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
