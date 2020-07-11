import AuthError from './AuthError';
import {
  confirmPassword,
  isEmpty,
  validateEmail,
  validatePassword,
} from '../../utils/validate';
import {GestureResponderEvent} from 'react-native';

export namespace AuthInputModel {
  export enum AuthInputType {
    Email,
    Password,
    ConfirmPassword,
    General,
    Undefined,
  }

  export class AuthInputItem {
    key: string;
    label: string | number;
    placeholder: string;
    autoFocus: boolean;
    secureTextEntry: boolean;
    value: string;
    type: AuthInputType;
    keyboardType: string;
  }

  export const LoginFields: AuthInputItem[] = [
    {
      key: 'email',
      label: 'Email Address',
      placeholder: 'Email Address',
      autoFocus: false,
      secureTextEntry: false,
      value: '',
      type: AuthInputType.Email,
      keyboardType: 'email-address',
    },
    {
      key: 'password',
      label: 'Password',
      placeholder: 'Password',
      autoFocus: false,
      secureTextEntry: true,
      value: '',
      type: AuthInputType.Password,
      keyboardType: 'default',
    },
  ];

  export const RegisterFields: AuthInputItem[] = [
    {
      key: 'email',
      label: 'Email Address',
      placeholder: 'Email Address',
      autoFocus: false,
      secureTextEntry: false,
      value: '',
      type: AuthInputType.Email,
      keyboardType: 'email-address',
    },
    {
      key: 'password',
      label: 'Password',
      placeholder: 'Password',
      autoFocus: false,
      secureTextEntry: true,
      value: '',
      type: AuthInputType.Password,
      keyboardType: 'default',
    },
    {
      key: 'confirm_password',
      label: 'Confirm Password',
      placeholder: 'Confirm Password',
      autoFocus: false,
      secureTextEntry: true,
      value: '',
      type: AuthInputType.ConfirmPassword,
      keyboardType: 'default',
    },
  ];

  export const ForgotPasswordFields: AuthInputItem[] = [
    {
      key: 'email',
      label: 'Email Address',
      placeholder: 'Email',
      autoFocus: false,
      secureTextEntry: false,
      value: '',
      type: AuthInputType.Email,
      keyboardType: 'email-address',
    },
  ];

  export class AuthParameters {
    fields: AuthInputItem[];
    onSubmit: ({}) => void;
    onForgotPassword: (event: GestureResponderEvent) => void;
    buttonTitle: string;
    showLabel: boolean;
    password: string;
    error: AuthError;
    constructor(
      fields,
      onSubmit,
      onForgotPassword,
      buttonTitle,
      showLabel,
      password,
      error,
    ) {
      this.fields = fields;
      this.onSubmit = onSubmit;
      this.onForgotPassword = onForgotPassword;
      this.buttonTitle = buttonTitle;
      this.showLabel = showLabel;
      this.password = password;
      this.error = error;
    }
  }

  export class AuthResult {
    success: boolean;
    error: AuthError;
    constructor(success: boolean, error: AuthError) {
      this.success = success;
      this.error = error;
    }
  }

  export function validateFields(fields: AuthInputItem[]): AuthResult {
    let _error = new AuthError();
    let _success = true;
    let i = 0;
    let password: string;
    while (_success && i < fields.length) {
      let field = fields[i];
      let type = field.type;
      let value = field.value;
      if (isEmpty(value)) {
        _error.type = type;
        _error.message = `'${field.label}' is required`;
        _success = false;
      } else if (type === AuthInputModel.AuthInputType.Email) {
        if (!validateEmail(value)) {
          _error.type = type;
          _error.message = 'Enter a valid email address';
          _success = false;
        }
      } else if (type === AuthInputModel.AuthInputType.Password) {
        password = value;
        if (!validatePassword(value)) {
          _error.type = type;
          _error.message = 'Password must be at least 6 characters';
          _success = false;
        }
      } else if (type === AuthInputModel.AuthInputType.ConfirmPassword) {
        if (!confirmPassword(value, password)) {
          _error.type = type;
          _error.message = 'Password does not match.';
          _success = false;
        }
      }
      i += 1;
    }
    return new AuthResult(_success, _error);
  }
}
