import {AuthInputModel} from './AuthModel';
import {isEmpty} from '../../utils/validate';

export default class AuthError {
  type: AuthInputModel.AuthInputType;
  message: string;

  constructor() {
    this.type = AuthInputModel.AuthInputType.Undefined;
    this.message = '';
  }

  get isAbsent(): boolean {
    return isEmpty(this.message);
  }

  static parseMessage(_error): AuthError {
    let errObj = new AuthError();
    if (_error.hasOwnProperty('message')) {
      errObj.type = AuthInputModel.AuthInputType.General;
      errObj.message = _error.message;
    }
    return errObj;
  }
}
