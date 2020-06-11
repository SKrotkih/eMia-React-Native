import React from 'react';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {actions as auth} from '../index';
import {AuthForm} from '../../../components/AuthForm';
import {User} from '../../../model/entities/user';

const {login} = auth;

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
];

const error = {
  general: '',
  email: '',
  password: '',
};

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      error: error,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.onError = this.onError.bind(this);
  }

  onForgotPassword() {
    Actions.ForgotPassword();
  }

  onSubmit(data) {
    this.setState({error: error}); // clear out error messages
    this.props.login(data, this.onSuccess, this.onError);
  }

  onSuccess(uid, currentUser) {
    if (currentUser === null) {
      let user = new User(uid, '');
      Actions.EditProfile({
        user: user,
        completion: function() {
          Actions.Main();
        },
      });
    } else {
      Actions.Main();
    }
  }

  onError(_error) {
    let errObj = this.state.error;

    if (_error.hasOwnProperty('message')) {
      errObj.general = _error.message;
    } else {
      let keys = Object.keys(_error);
      keys.map((key, index) => {
        errObj[key] = _error[key];
      });
    }
    this.setState({error: errObj});
  }

  render() {
    return (
      <AuthForm
        fields={fields}
        showLabel={false}
        onSubmit={this.onSubmit}
        buttonTitle={`OK`}
        error={this.state.error}
        onForgotPassword={this.onForgotPassword}
      />
    );
  }
}

export default connect(null, {login})(Login);
