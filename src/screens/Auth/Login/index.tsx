import React, {FunctionComponent, useState} from 'react';
import {connect} from 'react-redux';
import {actions as auth} from '../index';
import {AuthForm, getEmptyError} from '../AuthForm';
import {User} from '../../../model/entities/user';

const {login} = auth;

const Login: FunctionComponent = ({route, navigation}) => {
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
  ];

  const [error, setError] = useState(getEmptyError());

  function onForgotPassword() {
    navigation.navigate('ForgotPassword');
  }

  function onSubmit(data) {
    setError(getEmptyError()); // clear out error messages
    login(data, onSuccess, onError);
  }

  function onSuccess(uid, currentUser) {
    if (currentUser === null) {
      let user = new User(uid, '');
      navigation.navigate('EditProfile', user, () => {
        navigation.navigate('Main');
      });
    } else {
      navigation.navigate('Main');
    }
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
      buttonTitle={'DONE'}
      error={error}
      onForgotPassword={onForgotPassword}
      password={null}
    />
  );
};

export default connect(null, {login})(Login);
