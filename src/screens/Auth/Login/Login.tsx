import React, {FunctionComponent, useState} from 'react';
import {actions as auth} from '../index';
import AuthForm from '../AuthForm';
import AuthError from '../AuthError';
import {AuthInputModel} from '../AuthModel';
import {User} from '../../../model/entities/user';
import {LOGGED_IN} from "../../../redux/actionTypes";
import store from "../../../redux/store";

const {login} = auth;

export const Login: FunctionComponent = ({route, navigation}) => {
  const [error, setError] = useState<AuthError>(new AuthError);

  function onForgotPassword() {
    navigation.navigate('ForgotPassword');
  }

  function onSubmit(fields: AuthInputModel.AuthInputItem[]) {
    setError(new AuthError); // clear out error messages
    let data = {};
    fields.forEach( (field) => {
      if (field.type == AuthInputModel.AuthInputType.Email) {
        data['email'] = field.value;
      } else if (field.type == AuthInputModel.AuthInputType.Password) {
        data['password'] = field.value;
      }
    });
    login(data, onSuccess, onError);
  }

  function onSuccess(uid, currentUser) {
    if (currentUser === null) {
      let user = new User(uid, '');
      navigation.navigate('EditProfile', user, () => {
        store.dispatch({type: LOGGED_IN, data: user});
      });
    } else {
      store.dispatch({type: LOGGED_IN, data: currentUser});
    }
  }

  function onError(_error) {
    setError(AuthError.parseMessage(_error));
  }

  return (
    <AuthForm
      fields={AuthInputModel.LoginFields}
      showLabel={false}
      onSubmit={onSubmit}
      buttonTitle={'DONE'}
      error={error}
      onForgotPassword={onForgotPassword}
      password={null}
    />
  );
};
