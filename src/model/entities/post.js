// Post
import {Alert} from '@theme/components/alerts/';
import {uploadImage} from '@model/firebase/utils/uploadImage';
import {uploadData} from '@model/firebase/database/posts';
import {getCurrentUserAsync} from '@model/firebase/auth/api';

export class Post {
  constructor(title, body, pictureUri) {
    this.title = title;
    this.body = body;
    this.url = '';
    this.pictureUri = pictureUri;
    this.uid = '';
    this.author = '';
  }

  upload(completed) {
    if (this.title === null || this.title.length === 0) {
      Alert.show('Please, enter post title', {
        type: 'info',
        duration: 3000,
      });
    } else {
      this.createNewPost(completed);
    }
  }

  createNewPost(completed) {
    var _this = this;
    getCurrentUserAsync()
      .then((user) => {
        _this.uid = user.uid;
        _this.author = user.username;
        uploadData(_this, (id) => {
          let pictureUri = _this.pictureUri;
          if (pictureUri === null || pictureUri.length === 0) {
            completed(true);
          } else {
            uploadImage(pictureUri, id)
              .then((resolve) => {
                _this.url = resolve;
                console.log(`Image's url: ${_this.url}`);
                completed(true);
              })
              .then((reject) => {
                if (reject === undefined) {
                  completed(false);
                  return;
                } else {
                  Alert.show(`Error while uploading photo: ${reject}`, {
                    type: 'info',
                    duration: 3000,
                  });
                  completed(false);
                }
              });
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
