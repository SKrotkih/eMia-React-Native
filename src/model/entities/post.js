// Post
import {Alert} from '@theme/components/alerts/';
import {uploadImage} from '@model/firebase/utils/uploadImage';
import {uploadData} from '@model/firebase/database/posts';

export class Post {
  constructor(title, body, pictureUri) {
    this.title = title;
    this.body = body;
    this.url = '';
    this.pictureUri = pictureUri;
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
    let pictureUri = this.pictureUri;
    uploadData(this, (id) => {
      if (pictureUri === null || pictureUri.length === 0) {
        completed(true);
      } else {
        uploadImage(pictureUri, id)
          .then((resolve) => {
            this.url = resolve;
            console.log(`Image's url: ${this.url}`);
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
  }
}
