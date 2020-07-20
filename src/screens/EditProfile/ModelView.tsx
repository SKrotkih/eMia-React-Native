import {User} from '../../model/entities/user';
import {isEmpty} from "../../utils/validate";
import {number} from "prop-types";

export class ModelView {
  private _user: User;
  private _imageUrl: string;
  private _update: () => void;

  constructor(update: () => void) {
    this._update = update;
    this.submitData = this.submitData.bind(this);
  }

  set user(newValue: User) {
    this._user = newValue;
  }

  updateView() {
    this._update();
  }

  renderView() {
    this.setUpImage().then(() => {
      this.updateView();
    });
  }

  get title(): string {
    return this.name;
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
  get gender(): string {
    return  this._user.gender === null ? '' : this._user.gender.toString();
  }

  set gender(newValue) {
    if (isEmpty(newValue)) {
      this._user.gender = null;
    } else {
      this._user.gender = +newValue;
    }
    this.updateView();
  }

  // Year of birth
  get yearBirth(): string {
    return this._user.yearbirth === null ? '' : this._user.yearbirth.toString();
  }

  set yearBirth(newValue) {
    if (isEmpty(newValue)) {
      this._user.yearbirth = null;
    } else {
      this._user.yearbirth = +newValue;
    }
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

  set imageUrl(newValue: string) {
    this._imageUrl = newValue;
  }

  private setUpImage(): Promise<string> {
    return new Promise((resolve, reject) => {
      this._user
        .getDownloadURL()
        .then((url) => {
          this._imageUrl = url as string;
          resolve(this._imageUrl);
        })
        .catch((error) => {
          reject(error);
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
