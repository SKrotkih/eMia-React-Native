import React, {useState, FunctionComponent} from 'react';
import {GestureResponderEvent, Text, View} from 'react-native';
import {Button} from 'react-native-elements';
import {
  confirmPassword,
  isEmpty,
  validateEmail,
  validatePassword,
} from '../../utils/validate';
import AuthTextInput from '../AuthTextInput';
import styles from './styles';

class FieldItem {
  key: string;
  type: string;
  label: string | number;
  placeholder: string;
  autoFocus: boolean;
  secureTextEntry: boolean;
  value: string;

  constructor(field: any) {
    this.key = field.key;
    this.type = field.type;
    this.label = field.label;
    this.placeholder = field.placeholder;
    this.autoFocus = field.autoFocus;
    this.secureTextEntry = field.secureTextEntry;
    this.value = '';
  }
}

export interface IAuth {
  fields: FieldItem[];
  onSubmit: ({}) => void;
  onForgotPassword: (event: GestureResponderEvent) => void;
  buttonTitle: string;
  showLabel: boolean;
  password: string;
}

export const AuthForm: FunctionComponent<IAuth> = (props) => {
  const [parameters, setParameters] = useState<IAuth>({
    fields: [],
    onSubmit: props.onSubmit,
    onForgotPassword: props.onForgotPassword,
    buttonTitle: props.buttonTitle,
    showLabel: props.showLabel,
    password: props.password,
  });

  const [error, setError] = useState<any>(props.error);

  props.fields.forEach((field) => {
    let fieldItem = new FieldItem(field);
    parameters.fields = parameters.fields.concat([fieldItem]);
  });

  function onSubmit() {
    const result = validate();
    if (!result.success) {
      setError(result.error);
    } else {
      parameters.onSubmit(extractData());
    }
  }

  function validate() {
    let _error = {};
    let _success = true;
    parameters.fields.forEach((field) => {
      let type = field.type;
      let value = field.value;
      let key = field.key;
      if (isEmpty(value)) {
        _error[key] = 'Your ' + key + ' is required';
        _success = false;
      } else if (type === 'email' && !validateEmail(value)) {
        _error[key] = 'Enter a valid email address';
        _success = false;
      } else if (type === 'password' && !validatePassword(value)) {
        _error[key] = 'Password must be at least 6 characters';
        _success = false;
      } else if (type === 'confirm_password' && !confirmPassword(value, parameters.password)) {
        _error[key] = 'Password does not match.';
        _success = false;
      }
    });
    return {success: _success, error: _error};
  }

  function extractData(): {} {
    const retData = {};
    parameters.fields.forEach((field) => {
      let value = field.value;
      let key = field.key;
      if (key !== 'error') {
        retData[key] = value;
      }
    });
    return retData;
  }

  function onChange(key, text) {
    parameters.fields.forEach((field) => {
      if (key === field.key) {
        field.value = text;
      }
    });
    setParameters(parameters);
  }

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        {!isEmpty(error.general) && (
          <Text style={styles.errorText}>{error.general}</Text>
        )}
        {parameters.fields.map((field, idx) => {
          return (
            <AuthTextInput
              key={field.key}
              label={field.label}
              showLabel={parameters.showLabel}
              placeholder={field.placeholder}
              autoFocus={field.autoFocus}
              type={field.type}
              onChangeText={(text) => onChange(field.key, text)}
              secureTextEntry={field.secureTextEntry}
              value={field.value}
              error={error[field.key]}
            />
          );
        })}
        <Button
          raised
          title={parameters.buttonTitle}
          borderRadius={4}
          containerViewStyle={styles.containerView}
          buttonStyle={styles.button}
          textStyle={styles.buttonText}
          onPress={onSubmit}
        />
        {parameters.onForgotPassword !== null && (
          <Text style={styles.forgotText} onPress={parameters.onForgotPassword}>
            Forgot password?
          </Text>
        )}
      </View>
    </View>
  );
};
