import React, {FunctionComponent, useState} from 'react';
import {actions as auth} from '../index';
import AuthForm from '../AuthForm';
import AuthError from '../AuthError';
import {AuthInputModel} from '../AuthModel';
import {User} from '../../../model/entities/user';
import store from '../../../redux/store';
import {logIn, signUp} from '../../../redux/authActions';

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
          store.dispatch(signUp(newUser));
        },
      });
    } else {
      store.dispatch(logIn(currentUser));
    }
  }

  function onError(_error) {
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
