/**
 * Sample React Native App
 * https://github.com/SKrotkih/eMia-React-Native
 *
 * @format
 * @flow
 */

import React, {FunctionComponent, useCallback, useContext, useState} from 'react';
import AuthForm from '../AuthForm';
import AuthError from '../AuthError';
import {AuthInputModel} from '../AuthModel';
import {User} from '../../../model/entities/user';
import * as StateStorage from '../../../redux/auth/actions';
import {Credentials} from '../../../model/network/interfaces';
import {LoginResults} from "./interface";
import {AuthApi} from "../../../model/network/interfaces";

export const Login: FunctionComponent = ({navigation}) => {
  const [error, setError] = useState<AuthError>(new AuthError());

  const success = useCallback((result) => userDidSuccess(result), []);
  const failed = useCallback((error) => userDidFail(error), []);

  function onSubmit(fields: AuthInputModel.AuthInputItem[]) {
    setError(new AuthError()); // clear out error messages
    const credentials = getCredentials(fields);
    login(credentials)
      .catch((error) => {
        console.log(error);
      })
  }

  async function login(credentials) {
    try {
      const {uid, user} = await AuthApi().login(credentials);
      success({uid, user});
    } catch (e) {
      failed(e);
    }
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

  function userDidSuccess(result: LoginResults) {
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

  function userDidFail(_error) {
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
