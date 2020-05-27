import {storage} from '@model/firebase/config';

export function getDownloadURL(photoName, callback) {
  console.log('API. getDownloadURL');
  const imageRef = storage.ref(photoName);
  imageRef
    .getDownloadURL()
    .then((url) => {
      callback(url);
    })
    .catch((error) => {
      console.log(error);
      callback(null);
    });
}
