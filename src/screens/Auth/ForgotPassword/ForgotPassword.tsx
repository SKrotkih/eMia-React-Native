/**
 * Sample React Native App
 * https://github.com/SKrotkih/eMia-React-Native
 *
 * @format
 * @flow
 */

import React, {FunctionComponent, useState} from 'react';
import {Alert} from 'react-native';
import AuthForm from '../AuthForm';
import AuthError from '../AuthError';
import {AuthInputModel} from '../AuthModel';
import AuthApi from "../../../model/network/APIfactory/AuthApi";

// We use password reminder only for Firebase backend now

export const ForgotPassword: FunctionComponent = ({navigation}) => {
  const [error, setError] = useState(new AuthError());

  function onSubmit(fields: AuthInputModel.AuthInputItem[]) {
    setError(new AuthError()); // clear out error messages
    AuthApi().then((api) =>
      api
        .resetPassword(getEmail(fields))
        .then(() => {
          Alert.alert('Please check email box. Te password was sent to you.');
          navigation.goBack();
        })
        .catch((error) => {
          setError((prevState) => {
            return {...prevState, email: error.message};
          });
        })
    );
  }

  function getEmail(fields: AuthInputModel.AuthInputItem[]): string {
    let email: string = null;
    fields.forEach((field) => {
      if (field.type === AuthInputModel.AuthInputType.Email) {
        email = field.value;
      }
    });
    return email;
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
