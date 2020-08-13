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
import {LoginCredentials, LoginFunction, LoginResults} from "./interface";
import {AuthContext} from "../../../model/context/AuthContext";
import {useHttp} from "../../../model/network/server/request/http.hook";
import {AuthApi} from "../../../model/network/interfaces";
import {MODEL_TYPE_SERVER, MODEL_TYPE, MODEL_TYPE_FIREBASE} from '../../../config/constants';
import {LoginData} from "../../../model/localStorage/auth.hook";

export const Login: FunctionComponent = ({navigation}) => {
  const [error, setError] = useState<AuthError>(new AuthError());

  const authContext = useContext(AuthContext);

  const {loading, request, networkError, clearError} = useHttp();

  function model(): LoginFunction {
    if (MODEL_TYPE === MODEL_TYPE_SERVER) {
      return signInOnServer;
    } else if (MODEL_TYPE === MODEL_TYPE_FIREBASE) {
      return signInOnFirebase;
    }
  }

  const success = useCallback((result) => userDidSuccess(result), []);
  const failed = useCallback((error) => userDidFail(error), []);

  const signInOnServer = async (credentials: LoginCredentials) => {
    try {
      const {user, token} = await request('/api/auth/login', 'POST', credentials);
      const loginData = new LoginData(user._id, token);
      authContext.login(loginData);
      const result = {uid: user._id, user: user};

      console.log('LOGIN IS OK:' + JSON.stringify(result));

      success(result);
    } catch (e) {
      failed(e);
    }
  };

  const signInOnFirebase = async (credentials: LoginCredentials) => {
    try {
      const {uid, user} = await AuthApi().login(credentials);
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
