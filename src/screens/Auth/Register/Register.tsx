/**
 * Sample React Native App
 * https://github.com/SKrotkih/eMia-React-Native
 *
 * @format
 * @flow
 */

import React, {FunctionComponent, useCallback, useContext, useState} from 'react';
import {actions as auth} from '../index';
import AuthForm from '../AuthForm';
import AuthError from '../AuthError';
import {AuthInputModel} from '../AuthModel';
import {User} from '../../../model/entities/user';
import * as StateStorage from '../../../redux/auth/actions';
import {Credentials} from "../../../model/network/firebase/auth/api";
import {AuthContext} from "../../../model/context/AuthContext";
import {useHttp} from "../../../model/network/server/request/http.hook";
import {LoginCredentials, LoginFunction} from "../Login/interface";
import {MODEL_TYPE_SERVER, MODEL_TYPE, MODEL_TYPE_FIREBASE} from '../../../config/constants';

const {register} = auth;

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
      const {token, userId} = await request(
        '/api/auth/register',
        'POST',
        credentials,
      );
      authContext.login(token, userId);
      const result = {uid: userId, user: null};
      success(result);
    } catch (e) {
      failed(e);
    }
  };

  const registerOnFirebase = async (credentials: LoginCredentials) => {
    try {
      const uid = await register(credentials);
      success(uid);
    } catch (e) {
      failed(e);
    }
  };

  function onSubmit(fields: AuthInputModel.AuthInputItem[]) {
    setError(new AuthError()); // clear out error messages
    const credentials = getCredentials(fields);
    model()(credentials);
  }

  function userDidSuccess(uid: string) {
    const newUser = new User(uid, '');
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
