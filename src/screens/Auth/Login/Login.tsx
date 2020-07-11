import React, {FunctionComponent, useState} from 'react';
import {actions as auth} from '../index';
import AuthForm from '../AuthForm';
import AuthError from '../AuthError';
import {AuthInputModel} from '../AuthModel';
import {User} from '../../../model/entities/user';
import {LOGGED_IN} from '../../../redux/actionTypes';
import store from '../../../redux/store';

const {login} = auth;

export const Login: FunctionComponent = ({navigation}) => {
  const [error, setError] = useState<AuthError>(new AuthError());

  function onSubmit(fields: AuthInputModel.AuthInputItem[]) {
    setError(new AuthError()); // clear out error messages
    let email = '';
    let password = '';
    fields.forEach((field) => {
      if (field.type === AuthInputModel.AuthInputType.Email) {
        email = field.value;
      } else if (field.type === AuthInputModel.AuthInputType.Password) {
        password = field.value;
      }
    });
    login({email, password}, onSuccess, onError);
  }

  function onSuccess(uid, currentUser) {
    if (currentUser === null) {
      let newUser = new User(uid, '');
      navigation.navigate('EditProfile', {
        newUser: newUser,
        completion: () => {
          store.dispatch({type: LOGGED_IN, data: newUser});
        },
      });
    } else {
      store.dispatch({type: LOGGED_IN, data: currentUser});
    }
  }

  function onError(_error) {
    setError(AuthError.parseMessage(_error));
  }

  function onForgotPassword() {
    navigation.navigate('ForgotPassword');
  }

  function parameters(): AuthInputModel.AuthParameters {
    const params = new AuthInputModel.AuthParameters(
      AuthInputModel.LoginFields,
      onSubmit,
      onForgotPassword,
      'DONE',
      false,
      null,
      error,
    );
    return params;
  }

  return <AuthForm data={parameters()} />;
};
