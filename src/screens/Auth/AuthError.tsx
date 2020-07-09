import {AuthInputModel} from "./AuthModel";

export default class AuthError {
  type: AuthInputModel.AuthInputType
  message: string

  constructor() {
    this.type = AuthInputModel.AuthInputType.Undefined;
  }

  static parseMessage(_error): AuthError {
    let errObj = new AuthError;
    if (_error.hasOwnProperty('message')) {
      errObj.type = AuthInputType.General;
      errObj.message = _error.message;
    } else {
      let keys = Object.keys(_error);
      keys.map((key) => {
        errObj[key] = _error[key];
      });
    }
    return errObj;
  }
}
