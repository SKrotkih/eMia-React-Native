import {User} from '@model/entities/user';

export class ModelView {
  constructor(user, view) {
    this._user = user;
    this._view = view;
    this._imageUrl = '';
    this.setUpImage = this.setUpImage.bind(this);
    this.submitData = this.submitData.bind(this);
  }

  updateView() {
    this._view.updateView();
  }

  renderView() {
    this.setUpImage();
  }

  // Name
  get name() {
    return this._user.username === undefined ? '' : this._user.username;
  }

  set name(newValue) {
    this._user.username = newValue;
    this.updateView();
  }

  // Address
  get address() {
    return this._user.address;
  }

  set address(newValue) {
    this._user.address = newValue;
    this.updateView();
  }

  // Gender
  get gender() {
    return this._user.gender;
  }

  set gender(newValue) {
    this._user.gender = newValue;
    this.updateView();
  }

  // Year of birth
  get yearBirth() {
    return this._user.yearbirth;
  }

  set yearBirth(newValue) {
    this._user.yearbirth = newValue;
    this.updateView();
  }

  // Email
  get email() {
    return this._user.email;
  }

  set email(newValue) {
    this._user.email = newValue;
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
    return new Promise((resolve, reject) => {
      this._user.getDownloadURL().then((url) => {
        this._imageUrl = url;
        this.updateView();
      });
    });
  }

  // Send user data on server
  submitData() {
    return new Promise((resolve, reject) => {
      this._user.update(this._imageUrl, (result) => {
        resolve();
      });
    });
  }
}
