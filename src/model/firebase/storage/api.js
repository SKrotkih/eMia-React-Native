import {storage} from '@model/firebase/config';

export function getImageUrl(photoName, callback) {
  console.log('API. getImageUrl');
  const imageRef = storage.ref(photoName);
  imageRef.getDownloadURL().then(
    function (url) {
      callback(url);
    },
    function (error) {
      console.log(error);
      callback(null);
    },
  );
}

export function getDownloadURL(photoName, callback) {
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
