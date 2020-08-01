/**
 * Sample React Native App
 * https://github.com/SKrotkih/eMia-React-Native
 *
 * @format
 * @flow
 */

import React, {FunctionComponent, useEffect, useState} from 'react';
import {Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {warningToast} from '../../../components/Toast/WarningToast';
import {isEmpty} from '../../../utils/validate';
import InputAuthText from '../../../components/InputAuthText/InputAuthText';
import {color, fontSize} from '../../../theme/styles';
import {AuthInputModel} from '../AuthModel';
import AuthError from '../AuthError';

export const AuthForm: FunctionComponent<AuthInputModel.AuthParameters> = ({data}) => {
  const [parameters, setParameters] = useState<AuthInputModel.AuthParameters>(data);

  const [error, setError] = useState<AuthError>(new AuthError());
  const [generalError, setGeneralError] = useState<AuthError>(data.error);

  useEffect(() => {
    setGeneralError(data.error);
  }, [data]);

  function onSubmit() {
    const result = AuthInputModel.validateFields(parameters.fields);
    if (result.success) {
      parameters.onSubmit(parameters.fields);
    } else {
      setError(result.error);
    }
  }

  function onFieldChange(type: AuthInputModel.AuthInputType, text) {
    setGeneralError(new AuthError());
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

  function generalMessage(): string {
    let message = generalError.getMessage(AuthInputModel.AuthInputType.General);
    if (error.isEmpty && !isEmpty(message)) {
      return message;
    }
    return '';
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        {warningToast(generalMessage())}
        {parameters.fields.map((field) => {
          return (
            <InputAuthText
              key={field.key}
              label={field.label}
              showLabel={parameters.showLabel}
              placeholder={field.placeholder}
              autoFocus={field.autoFocus}
              type={field.keyboardType}
              onChangeText={(text) => onFieldChange(field.type, text)}
              onEndEditing={(text) => console.log(text)}
              secureTextEntry={field.secureTextEntry}
              value={field.value}
              error={error.getMessage(field.type)}
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
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    marginTop: 30,
    marginHorizontal: 16,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: color.tableSeparator,
    borderBottomWidth: StyleSheet.hairlineWidth,
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
