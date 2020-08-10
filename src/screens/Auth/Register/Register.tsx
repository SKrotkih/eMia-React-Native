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
import {Credentials} from "../../../model/firebase/auth/api";

const {register} = auth;

export const Register: FunctionComponent = ({navigation}) => {
  const [error, setError] = useState<AuthError>(new AuthError());

  function onSubmit(fields: AuthInputModel.AuthInputItem[]) {
    setError(new AuthError()); // clear out error messages
    register(getUserCredentials(fields))
      .then((uid: string) => {
        const newUser = new User(uid, '');
        navigation.navigate('EditProfile', {
          newUser: newUser,
          completion: () => {
            StateStorage.signUp(newUser);
          },
        });
      })
      .catch((_error) => {
        setError(AuthError.parseMessage(_error));
      });
  }

  function getUserCredentials(
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
