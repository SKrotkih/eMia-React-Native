// Post
import {Alert} from 'react-native';
import {uploadImage} from '../../model/firebase/utils/uploadImage';
import {uploadData} from '../../model/firebase/database/posts';
import {getCurrentUserAsync} from '../../model/firebase/auth/api';
import {storage} from '../../model/firebase/config';

export class Post {
  author: string;
  body: string;
  title: string;
  url: string;
  pictureUri: string;
  uid: string;

  constructor(title, body, pictureUri) {
    this.author = '';
    this.body = body;
    this.title = title;
    this.url = '';
    this.pictureUri = pictureUri;
    this.uid = '';
  }

  static getDownloadURL(postId) {
    console.log('Post. getDownloadURL');
    return new Promise((resolve, reject) => {
      const photoName = postId + '.jpg';
      const imageRef = storage.ref(photoName);
      imageRef
        .getDownloadURL()
        .then((url) => {
          resolve(url);
        })
        .catch((error) => {
          reject(error);
        });
    })
  }

  submitOnServer(completed) {
    if (this.title === null || this.title.length === 0) {
      Alert.alert('Please, enter post title');
    } else {
      this.addPost(completed);
    }
  }

  private addPost(completed) {
    let _this = this;
    getCurrentUserAsync()
      .then((user) => {
        _this.uid = user.id;
        _this.author = user.username;
        uploadData(_this, (id) => {
          let pictureUri = _this.pictureUri;
          if (pictureUri === null || pictureUri.length === 0) {
            completed(true);
          } else {
            uploadImage(pictureUri, id)
              .then((pictureUrl) => {
                _this.url = pictureUrl;
                console.log(`Image's url: ${_this.url}`);
                completed(true);
              })
              .catch((error) => {
                if (error !== null) {
                  Alert.alert('Error', `${error}`);
                }
                completed(false);
              });
          }
        });
      })
      .catch((error) => {
        Alert.alert('Error', `${error}`);
        console.log(error);
      });
  }
}
