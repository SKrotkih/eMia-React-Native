import {Alert} from "../../screens/Settings/EditProfile";
import {uploadImage} from '@model/firebase/utils/uploadImage';
import {uploadData} from '@model/firebase/database/profiles';

export class Profile {
    constructor(uid, name, avatarUrl) {
        this.uid = uid;
        this.name = name;
        this.avatarUrl = avatarUrl;
    }

    upload(completed) {
        if (name === null || name.length === 0) {
            Alert.show('Please, enter your name', {
                type: 'info',
                duration: 3000,
            });
            completed(false);
        } else {
            this.createProfile(completed);
        }
    }

    createProfile(completed) {
        var _this = this;
        uploadData(_this, (id) => {
            if (_this.avatarUrl === null || _this.avatarUrl.length === 0) {
                completed(true);
            } else {
                uploadImage(_this.avatarUrl, _this.uid)
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
    }
}