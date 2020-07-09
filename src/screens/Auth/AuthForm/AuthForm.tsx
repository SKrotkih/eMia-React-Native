import React, {FunctionComponent, useState} from 'react';
import {Button, GestureResponderEvent, SafeAreaView, StyleSheet, Text, View,} from 'react-native';
import {Toast} from 'native-base';
import {isEmpty,} from '../../../utils/validate';
import AuthTextInput from '../../../components/AuthTextInput/AuthTextInput';
import {color, fontSize} from '../../../theme/styles';
import {AuthInputModel} from '../AuthModel';
import AuthError from '../AuthError';

export interface IAuth {
  fields: AuthInputModel.AuthInputItem[];
  onSubmit: ({}) => void;
  onForgotPassword: (event: GestureResponderEvent) => void;
  buttonTitle: string;
  showLabel: boolean;
  password: string;
  error: AuthError;
}

export const AuthForm: FunctionComponent<IAuth> = (props) => {
  const [parameters, setParameters] = useState<IAuth>({
    fields: props.fields,
    onSubmit: props.onSubmit,
    onForgotPassword: props.onForgotPassword,
    buttonTitle: props.buttonTitle,
    showLabel: props.showLabel,
    password: props.password,
    error: props.error,
  });

  const [error, setError] = useState<AuthError>(props.error as AuthError);

  function onSubmit() {
    const result = AuthInputModel.validateFields(parameters.fields);
    if (result.success) {
      parameters.onSubmit(parameters.fields);
    } else {
      setError(result.error);
    }
  }

  function onChange(type: AuthInputModel.AuthInputType, text) {
    setParameters((prevState) => {
      prevState.fields.forEach((field) => {
        if (type === field.type) {
          field.value = text;
        }
      });
      if (error.type === type) {
        setError(new AuthError());
      }
      prevState.error = new AuthError();
      return prevState;
    });
  }

  function Separator() {
    return <View style={styles.separator} />;
  }

  function errorMessage(type: AuthInputModel.AuthInputType): string {
    let externalError = parameters.error as AuthError;
    if (!isEmpty(externalError.message)) {
      return externalError.message;
    } else if (error.type === type && !isEmpty(error.message)) {
      return error.message;
    } else {
      return '';
    }
  }

  function errorMessageInGeneral(): string {
    let message: string;
    let externalError = parameters.error as AuthError;
    if (externalError.type === AuthInputModel.AuthInputType.General) {
      message = externalError.message;
    } else if (error.type === AuthInputModel.AuthInputType.General) {
      message = error.message;
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
              onChangeText={(text) => onChange(field.type, text)}
              onEndEditing={(text) => console.log(text)}
              secureTextEntry={field.secureTextEntry}
              value={field.value}
              error={errorMessage(field.type)}
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

const styles = StyleSheet.create({
  separator: {
    marginVertical: 8,
    borderBottomColor: color.tableSeparator,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    marginTop: 30,
    marginHorizontal: 16,
  },
  forgotButton: {
    marginVertical: 8,
  },
  forgotText: {
    textAlign: 'center',
    color: color.brand,
    fontSize: fontSize.regular,
    fontWeight: 'normal',
  },
});
