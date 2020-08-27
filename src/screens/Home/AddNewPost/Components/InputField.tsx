/**
 * Sample React Native App
 * https://github.com/SKrotkih/eMia-React-Native
 *
 * @format
 * @flow
 */

import {Label} from "native-base";
import {color} from "../../../../theme/styles";
import {StyleSheet, TextInput} from "react-native";
import React from "react";

export default function InputData(props) {
  const {title, placeholder, fieldName, defaultValue, autoFocus, darkTheme, updateField} = props;
  return (
    <>
      <Label style={[styles.label, {color: darkTheme ? color.white : color.black}]}>{title}</Label>
      <TextInput
        style={[styles.input, {color: darkTheme ? color.white : color.black}]}
        autoCapitalize="none"
        clearButtonMode="while-editing"
        underlineColorAndroid="transparent"
        placeholder={placeholder}
        autoFocus={autoFocus}
        onChangeText={(text) => {
          updateField(fieldName, text);
        }}
        defaultValue={defaultValue}
      />
    </>
  )
}

const styles = StyleSheet.create({
  label: {
    marginLeft: 15,
    padding: 0,
    height: 20,
  },
  input: {
    margin: 15,
    paddingLeft: 15,
    height: 40,
    borderRadius: 8,
    borderColor: color.brand,
    borderWidth: 1,
  },
});

