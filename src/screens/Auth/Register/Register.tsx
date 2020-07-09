import React, {FunctionComponent, useState} from 'react';
import {actions as auth} from '../index';
import AuthForm from '../AuthForm';
import AuthError from '../AuthError';
import {AuthInputModel} from '../AuthModel';
import {User} from '../../../model/entities/user';
import store from '../../../redux/store';
import {LOGGED_IN} from '../../../redux/actionTypes';

const {register} = auth;

export const Register: FunctionComponent = ({navigation}) => {
  const [error, setError] = useState<AuthError>(new AuthError());

  function onSubmit(fields: AuthInputModel.AuthInputItem[]) {
    setError(new AuthError()); // clear out error messages
    let data = {};
    fields.forEach((field) => {
      if (field.type === AuthInputModel.AuthInputType.Email) {
        data['email'] = field.value;
      } else if (field.type === AuthInputModel.AuthInputType.Password) {
        data['password'] = field.value;
      } else if (field.type === AuthInputModel.AuthInputType.ConfirmPassword) {
        data['confirm_password'] = field.value;
      }
    });
    register(data, onSuccess, onError);
  }

  function onSuccess(data) {
    const uid = data.user.uid;
    const user = new User(uid, '');
    navigation.navigate('EditProfile', user, () => {
      store.dispatch({type: LOGGED_IN, data: user});
    });
  }

  function onError(_error) {
    setError(AuthError.parseMessage(_error));
  }

  return (
    <AuthForm
      fields={AuthInputModel.RegisterFields}
      showLabel={false}
      onSubmit={onSubmit}
      onForgotPassword={null}
      buttonTitle={'DONE'}
      error={error}
      password={null}
    />
  );
};
