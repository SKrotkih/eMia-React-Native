import {User} from '../../../model/entities/user';
import {EditProfile} from "./index";

export class ModelView {

  private _user: User;
  private _view: EditProfile;
  private _imageUrl: string;

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
    this.setUpImage().then(() => {
      this.updateView();
    })
  }

  // Name
  get name(): string {
    return this._user.username === undefined ? '' : this._user.username;
  }

  set name(newValue) {
    this._user.username = newValue;
    this.updateView();
  }

  // Address
  get address(): string {
    return this._user.address;
  }

  set address(newValue) {
    this._user.address = newValue;
    this.updateView();
  }

  // Gender
  get gender(): number {
    return this._user.gender;
  }

  set gender(newValue) {
    this._user.gender = newValue;
    this.updateView();
  }

  // Year of birth
  get yearBirth(): number {
    return this._user.yearbirth;
  }

  set yearBirth(newValue) {
    this._user.yearbirth = newValue;
    this.updateView();
  }

  // Email
  get email(): string {
    return this._user.email;
  }

  set email(newValue) {
    this._user.email = newValue;
    this.updateView();
  }

  // Image
  get isImageEmpty(): boolean {
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

  private setUpImage(): Promise<void> {
    return new Promise((resolve, reject) => {
      this._user.getDownloadURL().then((url) => {
        this._imageUrl = url;
        resolve();
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
