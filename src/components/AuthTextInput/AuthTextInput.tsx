import React, {FunctionComponent} from 'react';
import {View, TextInput, Text} from 'react-native';
import {isEmpty} from '../../utils/validate';
import {connect} from 'react-redux';
import styles from './styles';
import {color} from "../../theme/styles";
import {useTheme} from 'react-native-paper';

const AuthTextInput: FunctionComponent = (props) => {
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
    onEndEditing,
  } = props;

  const paperTheme = useTheme();
  const textColor = paperTheme.dark ? color.white : color.black;

  return (
    <View style={styles.container}>
      {showLabel && <Text>{label}</Text>}
      <TextInput
        autoCapitalize="none"
        clearButtonMode="while-editing"
        underlineColorAndroid={'#fff'}
        placeholder={placeholder}
        placeholderTextColor="#666666"
        autoFocus={autoFocus}
        secureTextEntry={secureTextEntry}
        style={[styles.textInput, {
          color: textColor,
        }]}
        keyboardType={type}
        defaultValue={value}
        onChangeText={onChangeText}
        onEndEditing={(e) => onEndEditing(e.nativeEvent.text)}
      />
      {!isEmpty(error) && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

export default connect(null, null)(AuthTextInput);
