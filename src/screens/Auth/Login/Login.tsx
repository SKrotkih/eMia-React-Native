/**
 * Sample React Native App
 * https://github.com/SKrotkih/eMia-React-Native
 *
 * @format
 * @flow
 */

import React, {FunctionComponent, useState} from 'react';
import {actions as auth} from '../index';
import AuthForm from '../AuthForm';
import AuthError from '../AuthError';
import {AuthInputModel} from '../AuthModel';
import {User} from '../../../model/entities/user';
import * as StateStorage from '../../../redux/auth/actions';
import {Credentials} from '../../../model/network/firebase/auth/api';

const {login} = auth;

export const Login: FunctionComponent = ({navigation}) => {
  const [error, setError] = useState<AuthError>(new AuthError());

  function onSubmit(fields: AuthInputModel.AuthInputItem[]) {
    setError(new AuthError()); // clear out error messages
    login(getCredentials(fields))
      .then((result) => {
        let {uid, user} = result;
        userDidSuccessLogIn(uid, user);
      })
      .catch((error) => {
        userDidFailLogIn(error);
      });
  }

  function getCredentials(fields: AuthInputModel.AuthInputItem[]): Credentials {
    let email = '';
    let password = '';
    fields.forEach((field) => {
      if (field.type === AuthInputModel.AuthInputType.Email) {
        email = field.value;
      } else if (field.type === AuthInputModel.AuthInputType.Password) {
        password = field.value;
      }
    });
    return {email: email, password: password};
  }

  function userDidSuccessLogIn(uid, currentUser) {
    if (currentUser === null) {
      let newUser = new User(uid, '');
      navigation.navigate('EditProfile', {
        newUser: newUser,
        completion: () => {
          StateStorage.signUp(newUser);
        },
      });
    } else {
      StateStorage.logIn(currentUser);
    }
  }

  function userDidFailLogIn(_error) {
    setError(AuthError.parseMessage(_error));
  }

  function onForgotPassword() {
    navigation.navigate('ForgotPassword');
  }

  const params = new AuthInputModel.AuthParameters(
    AuthInputModel.LoginFields,
    onSubmit,
    onForgotPassword,
    'DONE',
    false,
    null,
    error,
  );

  return <AuthForm data={params} />;
};
