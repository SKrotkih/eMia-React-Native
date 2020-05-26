// ForgotPassword
//
import React from 'react';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {Alert} from '@theme/components/alerts/';
import {actions as auth} from '@screens/Auth/index';
import AuthForm from '@components/AuthForm';

const {resetPassword} = auth;

const fields = [
  {
    key: 'email',
    label: 'Email Address',
    placeholder: 'Email',
    autoFocus: false,
    secureTextEntry: false,
    value: '',
    type: 'email-address',
  },
];

const error = {
  general: '',
  email: '',
};

class ForgotPassword extends React.Component {
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
    this.props.resetPassword(data, this.onSuccess, this.onError);
  }

  onSuccess() {
    Alert.alert('Password Reminder Sent');
    Actions.pop();
  }

  onError(error) {
    let errObj = this.state.error;

    if (error.hasOwnProperty('message')) {
      errObj.general = error.message;
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
      <AuthForm
        fields={fields}
        onSubmit={this.onSubmit}
        buttonTitle={'SUBMIT'}
        error={this.state.error}
      />
    );
  }
}

export default connect(null, {resetPassword})(ForgotPassword);
