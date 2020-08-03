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
    remindPassword(getCredentials(fields))
      .then(() => {
        Alert.alert('Please check email box. Te password was sent to you.');
        navigation.goBack();
      })
      .catch((error) => {
        setError((prevState) => {
          return {...prevState, email: error.message};
        });
      });
  }

  function getCredentials(fields: AuthInputModel.AuthInputItem[]): {email: string} {
    let email: string = null;
    fields.forEach((field) => {
      if (field.type === AuthInputModel.AuthInputType.Email) {
        email = field.value;
      }
    });
    return {email: email};
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
