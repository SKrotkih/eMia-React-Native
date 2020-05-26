// Post
import {Alert} from '@theme/components/alerts/';
import {uploadImage} from '@model/firebase/utils/uploadImage';

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
    } else if (this.pictureUri === null || this.pictureUri.length === 0) {
      this.createNewPost(completed);
    } else {
      uploadImage(this.pictureUri)
        .then((resolve) => {
          this.url = resolve;
          this.createNewPost(completed);
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
  }

  createNewPost(completed) {
    console.log(`${this.title};\n${this.body};\n${this.url}`);
    completed(true);
  }
}
