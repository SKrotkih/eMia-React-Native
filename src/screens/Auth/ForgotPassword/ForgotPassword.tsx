/**
 * Sample React Native App
 * https://github.com/SKrotkih/eMia-React-Native
 *
 * @format
 * @flow
 */

import React, {FunctionComponent, useState} from 'react';
import {Alert} from 'react-native';
import {actions as auth} from '../index';
import AuthForm from '../AuthForm';
import AuthError from '../AuthError';
import {AuthInputModel} from '../AuthModel';

const {remindPassword} = auth;

export const ForgotPassword: FunctionComponent = ({navigation}) => {
  const [error, setError] = useState(new AuthError());

  function onSubmit(fields: AuthInputModel.AuthInputItem[]) {
    setError(new AuthError()); // clear out error messages
    let data = {email: null};
    fields.forEach((field) => {
      if (field.type === AuthInputModel.AuthInputType.Email) {
        data.email = field.value;
      }
    });
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

  const params = new AuthInputModel.AuthParameters(
    AuthInputModel.ForgotPasswordFields,
    onSubmit,
    null,
    'SUBMIT',
    false,
    null,
    error,
  );

  return <AuthForm data={params} />;
};
