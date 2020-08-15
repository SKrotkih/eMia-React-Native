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
import {LoginCredentials} from "../Login/interface";

export const Register: FunctionComponent = ({navigation}) => {
  const [error, setError] = useState<AuthError>(new AuthError());

  function onSubmit(fields: AuthInputModel.AuthInputItem[]) {
    setError(new AuthError()); // clear out error messages
    const credentials = getCredentials(fields);
    signUp(credentials)
      .catch((error) => {
        console.log(error);
      })
  }

  const signUp = async (credentials: LoginCredentials) => {
    try {
      const uid = await AuthApi().registerNewUser(credentials);
      const newUser = new User(uid, '');
      newUser.email = credentials.email;
      navigation.navigate('EditProfile', {
        newUser: newUser,
        completion: () => {
          StateStorage.signUp(newUser);
        },
      });
    } catch (e) {
      setError(AuthError.parseMessage(e));
    }
  };

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
