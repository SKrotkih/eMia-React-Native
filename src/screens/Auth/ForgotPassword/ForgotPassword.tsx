
import React, {FunctionComponent, useState} from 'react';
import {Alert} from 'react-native';
import {actions as auth} from '../index';
import AuthForm from '../AuthForm';
import {getEmptyError} from '../AuthForm/AuthForm';

const {remindPassword} = auth;

export const ForgotPassword: FunctionComponent = ({route, navigation}) => {
  const fields = [
    {
      key: 'email',
      label: 'Email Address',
      placeholder: 'Email',
      autoFocus: false,
      secureTextEntry: false,
      value: '',
      type: 'email-address',
    },
  ];

  const [error, setError] = useState(getEmptyError());

  function onSubmit(data) {
    setError(getEmptyError()); // clear out error messages
    remindPassword(data, onSuccess, onError);
  }

  function onSuccess() {
    Alert.alert('Password Reminder Sent');
    navigation.goBack();
  }

  function onError(_error) {
    setError((prevState) => {
      return {...prevState, email: _error.message};
    });
  }

  return (
    <AuthForm
      fields={fields}
      onSubmit={onSubmit}
      onForgotPassword={null}
      buttonTitle={'SUBMIT'}
      error={error}
      showLabel={false}
      password={null}
    />
  );
};
