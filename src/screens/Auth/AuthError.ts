/**
 * Sample React Native App
 * https://github.com/SKrotkih/eMia-React-Native
 *
 * @format
 * @flow
 */

import {AuthInputModel} from './AuthModel';
import {isEmpty} from '../../utils/validate';

export default class AuthError {
  type: AuthInputModel.AuthInputType;
  message: string;

  constructor() {
    this.type = AuthInputModel.AuthInputType.Undefined;
    this.message = '';
  }

  get isEmpty(): boolean {
    return isEmpty(this.message);
  }

  getMessage(type: AuthInputModel.AuthInputType): string {
    if (this.type === type && !isEmpty(this.message)) {
      return this.message;
    } else {
      return '';
    }
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
