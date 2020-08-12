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
import {Credentials} from '../../../model/network/firebase/auth/api';
import {LoginCredentials, LoginFunction, LoginResults, ServerType} from "./interface";
import {AuthContext} from "../../../model/context/AuthContext";
import {useHttp} from "../../../model/network/server/request/http.hook";
import {login} from "../../../model/dbinteractor/login/dbinteractor";
import Config from "react-native-config";

export const Login: FunctionComponent = ({navigation}) => {

  const MODEL_TYPE = Config.MODEL_TYPE;

  const [error, setError] = useState<AuthError>(new AuthError());

  const authContext = useContext(AuthContext);

  const {loading, request, networkError, clearError} = useHttp();

  function model(): LoginFunction {
    switch (MODEL_TYPE) {
      case Config.MODEL_TYPE_SERVER:
        return onServerLogIn;
      case Config.MODEL_TYPE_FIREBASE:
        return onFirebaseLogIn;
    }
  }

  const success = useCallback((result) => userDidSuccessLogIn(result), []);
  const failed = useCallback((error) => userDidFailLogIn(error), []);

  const onServerLogIn = async (credentials: LoginCredentials) => {
    try {
      const {token, userId} = await request('/api/auth/login', 'POST', credentials);
      authContext.login(token, userId);
      const result = {uid: userId, user: null};
      success(result);
    } catch (e) {
      failed(e);
    }
  };

  const onFirebaseLogIn = async (credentials: LoginCredentials) => {
    try {
      const {uid, user} = await login(credentials)
      const result = {uid: uid, user: user};
      success(result);
    } catch (e) {
      failed(e);
    }
  };

  function onSubmit(fields: AuthInputModel.AuthInputItem[]) {
    setError(new AuthError()); // clear out error messages
    const credentials = getCredentials(fields);
    model()(credentials);
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
