import React from 'react';

import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import {actions as auth} from '@screens/Auth/index';
import AuthForm from '@components/AuthForm';

const {register} = auth;

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

const error = {
  general: '',
  email: '',
  password: '',
  confirm_password: '',
}

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      error: error,
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.onError = this.onError.bind(this);
  }

  onSubmit(data) {
    this.setState({error: error}); // clear out error messages
    this.props.register(data, this.onSuccess, this.onError);
  }

  onSuccess(user) {
    Actions.CompleteProfile({user});
  }

  onError(error) {
    let errObj = this.state.error;

    if (error.hasOwnProperty('message')) {
      errObj['general'] = error.message;
    } else {
      let keys = Object.keys(error);
      keys.map((key, index) => {
        errObj[key] = error[key];
      });
    }
    this.setState({error: errObj});
  }

  render() {
    return (
      <AuthForm fields={fields}
        showLabel={false}
        onSubmit={this.onSubmit}
        buttonTitle={'SIGN UP'}
        error={this.state.error}/>
    );
  }
}

export default connect(null, {register})(Register);
