import {User} from '@model/entities/user';

export class ModelView {
    constructor(user, view) {
        this.user = user;
        this.view = view;
        this._imageUrl = '';
    }

    updateView() {
        this.view.updateView();
    }

    renderView() {
        this.setUpImage();
    }

    // Name
    get name() {
        return this.user.username === undefined ? '' : this.user.username;
    }

    set name(newValue) {
        this.user.username = newValue;
        this.updateView();
    }

    // Image
    get isImageEmpty() {
        let value = this._imageUrl === null || this._imageUrl === '';
        return value;
    }

    get imageUrl() {
        return this._imageUrl;
    }

    set imageUrl(newValue) {
        this._imageUrl = newValue;
        this.updateView();
    }

    createState() {
        const state = {
            userName: this.name,
            photoUrl: '',
        };
        return state;
    }

    setUpImage() {
        let self = this;
        return new Promise((resolve, reject) => {
            self.user.getDownloadURL()
                .then((url) => {
                    self._imageUrl = url
                    self.updateView();
                })
        });
    }

    // Send user data on server
    submitData() {
        let self = this;
        return new Promise((resolve, reject) => {
            self.user.update(this._imageUrl, (result) => {
                resolve();
            });
        })
    }
}
