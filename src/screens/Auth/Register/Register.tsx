import React, {FunctionComponent, useState} from 'react';
import {actions as auth} from '../index';
import AuthForm from '../AuthForm';
import AuthError from '../AuthError';
import {AuthInputModel} from '../AuthModel';
import {User} from '../../../model/entities/user';
import store from '../../../redux/store';
import {signUp} from "../../../redux/authActions";

const {register} = auth;

export const Register: FunctionComponent = ({navigation}) => {
  const [error, setError] = useState<AuthError>(new AuthError());

  function onSubmit(fields: AuthInputModel.AuthInputItem[]) {
    setError(new AuthError()); // clear out error messages
    let data = {email: null, password: null, confirm_password: null};
    fields.forEach((field) => {
      if (field.type === AuthInputModel.AuthInputType.Email) {
        data.email = field.value;
      } else if (field.type === AuthInputModel.AuthInputType.Password) {
        data.password = field.value;
      } else if (field.type === AuthInputModel.AuthInputType.ConfirmPassword) {
        data.confirm_password = field.value;
      }
    });
    register(data, onSuccess, onError);
  }

  function onSuccess(data) {
    const uid = data.user.uid;
    const newUser = new User(uid, '');
    navigation.navigate('EditProfile', {
      newUser: newUser,
      completion: () => {
        store.dispatch(signUp(newUser));
      },
    });
  }

  function onError(_error) {
    setError(AuthError.parseMessage(_error));
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
