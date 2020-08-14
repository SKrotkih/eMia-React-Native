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
import {AuthApi, Credentials} from "../../../model/network/interfaces";
import {AuthContext} from "../../../model/context/AuthContext";
import {useHttp} from "../../../model/network/server/request/http.hook";
import {LoginCredentials, LoginFunction} from "../Login/interface";
import {MODEL_TYPE_SERVER, MODEL_TYPE, MODEL_TYPE_FIREBASE} from '../../../config/constants';
import {LoginData} from "../../../model/localStorage/auth.hook";

export const Register: FunctionComponent = ({navigation}) => {
  const [error, setError] = useState<AuthError>(new AuthError());

  const authContext = useContext(AuthContext);

  const {loading, request, networkError, clearError} = useHttp();

  function model(): LoginFunction {
    if (MODEL_TYPE === MODEL_TYPE_SERVER) {
      return registerOnServer;
    } else if (MODEL_TYPE === MODEL_TYPE_FIREBASE) {
      return registerOnFirebase;
    }
  }

  const success = useCallback((result) => userDidSuccess(result), []);
  const failed = useCallback((error) => userDidFail(error), []);

  const registerOnServer = async (credentials: LoginCredentials) => {
    try {
      const {uid, email, token} = await request(
        '/api/auth/register',
        'POST',
        credentials,
      );
      const loginData = new LoginData(uid, token);
      authContext.login(loginData);
      const result = {uid, email};
      success(result);
    } catch (e) {
      failed(e);
    }
  };

  const registerOnFirebase = async (credentials: LoginCredentials) => {
    try {
      const uid = await AuthApi().registerNewUser(credentials);
      const result = {uid, email: credentials.email};
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

  function userDidSuccess(response) {
    const {uid, email} = response;
    const newUser = new User(uid, '');
    newUser.email = email;
    navigation.navigate('EditProfile', {
      newUser: newUser,
      completion: () => {
        StateStorage.signUp(newUser);
      },
    });
  }

  function userDidFail(_error) {
    setError(AuthError.parseMessage(_error));
  }

  function getCredentials(
    fields: AuthInputModel.AuthInputItem[],
  ): Credentials {
    let email: string = null;
    let password: string = null;
    let confirm_password: string = null;
    fields.forEach((field) => {
      if (field.type === AuthInputModel.AuthInputType.Email) {
        email = field.value;
      } else if (field.type === AuthInputModel.AuthInputType.Password) {
        password = field.value;
      } else if (field.type === AuthInputModel.AuthInputType.ConfirmPassword) {
        confirm_password = field.value;
      }
    });
    return {email: email, password: password};
  }

  const params = new AuthInputModel.AuthParameters(
    AuthInputModel.RegisterFields,
    onSubmit,
    null,
    'DONE',
    false,
    null,
    error,
  );

  return <AuthForm data={params} />;
};
