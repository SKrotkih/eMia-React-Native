import React, {FunctionComponent, useState} from 'react';
import {actions as auth} from '../index';
import AuthForm from '../AuthForm';
import {getEmptyError} from '../AuthForm/AuthForm';
import {User} from '../../../model/entities/user';
import store from '../../../redux/store';
import {LOGGED_IN} from '../../../redux/actionTypes';

const {register} = auth;

export const Register: FunctionComponent = ({navigation}) => {
  const fields = [
    {
      key: 'email',
      label: 'Email Address',
      placeholder: 'Email Address',
      autoFocus: false,
      secureTextEntry: false,
      value: '',
      type: 'email-address',
    },
    {
      key: 'password',
      label: 'Password',
      placeholder: 'Password',
      autoFocus: false,
      secureTextEntry: true,
      value: '',
      type: 'default',
    },
    {
      key: 'confirm_password',
      label: 'Confirm Password',
      placeholder: 'Confirm Password',
      autoFocus: false,
      secureTextEntry: true,
      value: '',
      type: 'default',
    },
  ];

  const [error, setError] = useState(getEmptyError());

  function onSubmit(data) {
    setError(getEmptyError()); // clear out error messages
    register(data, onSuccess, onError);
  }

  function onSuccess(data) {
    const uid = data.user.uid;
    const user = new User(uid, '');
    navigation.navigate('EditProfile', user, () => {
      store.dispatch({type: LOGGED_IN, data: user});
    });
  }

  function onError(_error) {
    let errObj = getEmptyError();
    if (_error.hasOwnProperty('message')) {
      errObj.general = _error.message;
    } else {
      let keys = Object.keys(_error);
      keys.map((key) => {
        errObj[key] = _error[key];
      });
    }
    setError(errObj);
  }

  return (
    <AuthForm
      fields={fields}
      showLabel={false}
      onSubmit={onSubmit}
      onForgotPassword={null}
      buttonTitle={'DONE'}
      error={error}
      password={null}
    />
  );
};
