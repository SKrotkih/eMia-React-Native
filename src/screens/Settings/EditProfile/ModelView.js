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
    // Address
    get address() {
        return this.user.address;
    }
    set address(newValue) {
        this.user.address = newValue;
        this.updateView();
    }
    // Gender
    get gender() {
        return this.user.gender;
    }
    set gender(newValue) {
        this.user.gender = newValue;
        this.updateView();
    }
    // Year of birth
    get yearBirth() {
        return this.user.yearbirth;
    }
    set yearBirth(newValue) {
        this.user.yearbirth = newValue;
        this.updateView();
    }
    // Email
    get email() {
        return this.user.email;
    }
    set email(newValue) {
        this.user.email = newValue;
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
