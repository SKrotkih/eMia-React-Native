/**
 * Sample React Native App
 * https://github.com/SKrotkih/eMia-React-Native
 *
 * @format
 * @flow
 */

import React, {FunctionComponent, useState} from 'react';
import AuthForm from '../AuthForm';
import AuthError from '../AuthError';
import {AuthInputModel} from '../AuthModel';
import {User} from '../../../model/entities/user';
import * as StateStorage from '../../../redux/auth/actions';
import {Credentials} from '../../../model/network/firebase/auth/api';
import {LoginResults, LoginViewModel, ServerType} from "./viewModel/interface";
import {ServerViewModel} from "./viewModel/server";
import {FirebaseViewModel} from "./viewModel/firebase";

export const Login: FunctionComponent = ({navigation}) => {
  const [error, setError] = useState<AuthError>(new AuthError());

  // TODO: Remove to the config
  const MODEL_TYPE: ServerType = ServerType.Firebase;

  function model(): LoginViewModel {
    switch (MODEL_TYPE) {
      case ServerType.Server:
        return new ServerViewModel();
      case ServerType.Firebase:
        return new FirebaseViewModel();
    }
  }

  function onSubmit(fields: AuthInputModel.AuthInputItem[]) {
    setError(new AuthError()); // clear out error messages
    const credentials = getCredentials(fields);
    model()
      .action(credentials)
      .then((result) => {
        userDidSuccessLogIn(result);
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

  function userDidSuccessLogIn(result: LoginResults) {
    if (result.user === null) {
      let newUser = new User(result.uid, '');
      navigation.navigate('EditProfile', {
        newUser: newUser,
        completion: () => {
          StateStorage.signUp(newUser);
        },
      });
    } else {
      StateStorage.logIn(result.user);
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
