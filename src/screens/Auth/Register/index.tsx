import React, {FunctionComponent, useState} from 'react';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {actions as auth} from '../index';
import {AuthForm} from '../AuthForm';
import {User} from '../../../model/entities/user';

const {register} = auth;

const Register: FunctionComponent = () => {
  const fields = [
    {
      key: 'email',
      label: 'Email Address',
      placeholder: 'Email Address',
      autoFocus: false,
      secureTextEntry: false,
      value: '',
      type: 'email-address',
    },
    {
      key: 'password',
      label: 'Password',
      placeholder: 'Password',
      autoFocus: false,
      secureTextEntry: true,
      value: '',
      type: 'default',
    },
    {
      key: 'confirm_password',
      label: 'Confirm Password',
      placeholder: 'Confirm Password',
      autoFocus: false,
      secureTextEntry: true,
      value: '',
      type: 'default',
    },
  ];

  const emptyError = {
    general: '',
    email: '',
    password: '',
    confirm_password: '',
  };

  const [error, setError] = useState(emptyError);

  function onSubmit(data) {
    setError(emptyError); // clear out error messages
    register(data, onSuccess, onError);
  }

  function onSuccess(data) {
    let user = new User(data.user.uid, '');
    Actions.EditProfile({
      user: user,
      completion: function () {
        Actions.Main();
      },
    });
  }

  function onError(_error) {
    let errObj = this.state.error;
    if (_error.hasOwnProperty('message')) {
      errObj.general = _error.message;
    } else {
      let keys = Object.keys(_error);
      keys.map((key, index) => {
        errObj[key] = _error[key];
      });
    }
    setError(errObj);
  }

  return (
    <AuthForm
      fields={fields}
      showLabel={false}
      onSubmit={onSubmit}
      onForgotPassword={null}
      buttonTitle={'DONE'}
      error={error}
      password={null}
    />
  );
}

export default connect(null, {register})(Register);
