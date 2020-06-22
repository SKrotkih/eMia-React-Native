import React, {useState, FunctionComponent} from 'react';
import {
  GestureResponderEvent,
  Text,
  View,
  Button,
  SafeAreaView,
} from 'react-native';
import {Toast} from 'native-base';
import {
  confirmPassword,
  isEmpty,
  validateEmail,
  validatePassword,
} from '../../../utils/validate';
import {AuthTextInput} from '../../../components/AuthTextInput';
import styles from './styles';
import {color} from '../../../theme/styles';

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
  error: {};
}

export function getEmptyError(): any {
  return {
    general: '',
    email: '',
    password: '',
    confirm_password: '',
  };
}

export const AuthForm: FunctionComponent<IAuth> = (props) => {
  let array: FieldItem[] = [];
  props.fields.forEach((field) => {
    let fieldItem = new FieldItem(field);
    array = array.concat([fieldItem]);
  });

  const [parameters, setParameters] = useState<IAuth>({
    fields: array,
    onSubmit: props.onSubmit,
    onForgotPassword: props.onForgotPassword,
    buttonTitle: props.buttonTitle,
    showLabel: props.showLabel,
    password: props.password,
    error: props.error,
  });

  const [error, setError] = useState(props.error);

  function onSubmit() {
    const result = validate();
    if (result.success) {
      parameters.onSubmit(extractData());
    } else {
      setError(result.error);
    }
  }

  function validate() {
    let _error = getEmptyError();
    let _success = true;
    parameters.fields.forEach((field) => {
      let type = field.type;
      let value = field.value;
      let key = field.key;
      _error[key] = '';
      if (isEmpty(value)) {
        _error[key] = 'Your ' + key + ' is required';
        _success = false;
      } else if (type === 'email-address') {
        if (!validateEmail(value)) {
          _error[key] = 'Enter a valid email address';
          _success = false;
        }
      } else if (type === 'default') {
        if (!validatePassword(value)) {
          _error[key] = 'Password must be at least 6 characters';
          _success = false;
        }
      } else if (type === 'confirm_password') {
        if (!confirmPassword(value, parameters.password)) {
          _error[key] = 'Password does not match.';
          _success = false;
        }
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
    error[key] = '';
    setError(error);
    parameters.error[key] = '';
    setParameters(parameters);
  }

  function Separator() {
    return <View style={styles.separator} />;
  }

  function errorMessage(key: string): string {
    let message: string;
    parameters.fields.map((field) => {
      if (field.key === key) {
        if (!isEmpty(parameters.error[key])) {
          message = parameters.error[key];
        } else if (!isEmpty(error[key])) {
          message = error[key];
        }
      }
    });
    return message;
  }

  function errorMessageInGeneral(): string {
    let message: string;
    if (!isEmpty(parameters.error.general)) {
      message = parameters.error.general;
    } else if (!isEmpty(error.general)) {
      message = error.general;
    }
    return message;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        {!isEmpty(errorMessageInGeneral()) &&
          Toast.show({
            text: `${errorMessageInGeneral()}`,
            position: 'bottom',
            buttonText: 'Okay',
            type: 'warning',
            duration: 3000,
          })}
        {parameters.fields.map((field) => {
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
              error={errorMessage(field.key)}
            />
          );
        })}
        <Button
          title={parameters.buttonTitle}
          color={color.brand}
          onPress={() => onSubmit()}
        />
        <Separator />
        {parameters.onForgotPassword !== null && (
          <View style={styles.forgotButton}>
            <Text
              style={styles.forgotText}
              onPress={() => parameters.onForgotPassword()}>
              Forgot password?
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};
