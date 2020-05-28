import {Platform} from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import FirebaseClient from 'firebase';

export function uploadImage(uri, id) {
  const Blob = RNFetchBlob.polyfill.Blob;
  const fs = RNFetchBlob.fs;
  window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
  window.Blob = Blob;
  return new Promise((resolve, reject) => {
    const mime = 'application/octet-stream';
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    let uploadBlob = null;
    let fileName = `${id}.jpg`;
    const imageRef = FirebaseClient.storage().ref('').child(fileName);
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