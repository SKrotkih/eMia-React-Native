import {Alert} from '@theme/components/alerts/';
import {uploadImage} from '@model/firebase/utils/uploadImage';
import {uploadCurrentUserData} from '@model/actions/users/actions';
import {storage} from '@model/firebase/config';

export class User {
    constructor(uid, name) {
        this.address = '';
        this.email = '';
        this.gender = 1;
        this.id = uid;
        this.tokenAndroid = '';
        this.tokenIOS = '';
        this.username = name;
        this.yearbirth = 1970;
    }

    update(photoUrl, completed) {
        if (this.username === null || this.username.length === 0) {
            Alert.show('Please, enter your name', {
                type: 'info',
                duration: 3000,
            });
            completed(false);
            return;
        }
        var _this = this;
        uploadCurrentUserData(_this)
            .then(() => {
                _this.getDownloadURL()
                    .then((url) => {
                        if (url === photoUrl) {
                            completed(true);
                        } else {
                            uploadImage(photoUrl, _this.id)
                                .then((resolve) => {
                                    completed(true);
                                })
                                .catch((error) => {
                                    if (error !== null) {
                                        Alert.show(`Error while uploading photo: ${error}`, {
                                            type: 'info',
                                            duration: 3000,
                                        });
                                    }
                                    completed(false);
                                });
                        }
                    })
                    .catch((error) => {
                        completed(true);
                    })
            })
            .catch((error) => {
                if (error !== null) {
                    Alert.show(`Error while uploading photo: ${error}`, {
                        type: 'info',
                        duration: 3000,
                    });
                }
                completed(false);
            });
    }

    getDownloadURL() {
        console.log('User. getDownloadURL');
        return new Promise((resolve, reject) => {
            const photoName = this.id + '.jpg';
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
}
