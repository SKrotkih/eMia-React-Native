// ForgotPassword
//
import React, {FunctionComponent, useState} from 'react';
import {Alert} from 'react-native';
import {connect} from 'react-redux';
import {actions as auth} from '../index';
import {AuthForm, getEmptyError} from '../AuthForm';

const {remindPassword} = auth;

const ForgotPassword: FunctionComponent = ({route, navigation}) => {
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
    error.email = _error.message;
    setError(error);
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

export default connect(null, {remindPassword})(ForgotPassword);
