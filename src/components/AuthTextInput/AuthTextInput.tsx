import React, {Component} from 'react';
import {View, TextInput, Text} from 'react-native';
import {isEmpty} from '../../utils/validate';
import styles from './styles';

export class AuthTextInput extends Component {
  render() {
    const {
      showLabel,
      placeholder,
      autoFocus,
      onChangeText,
      secureTextEntry,
      type,
      label,
      value,
      error,
    } = this.props;

    return (
      <View style={styles.container}>
        {showLabel && <Text>{label}</Text>}
        <TextInput
          autoCapitalize="none"
          clearButtonMode="while-editing"
          underlineColorAndroid={'#fff'}
          placeholder={placeholder}
          autoFocus={autoFocus}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          style={styles.input}
          keyboardType={type}
          defaultValue={value}
        />
        {!isEmpty(error) && <Text style={styles.errorText}>{error}</Text>}
      </View>
    );
  }
}
