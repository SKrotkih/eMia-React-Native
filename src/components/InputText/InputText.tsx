/**
 * Sample React Native App
 * https://github.com/SKrotkih/eMia-React-Native
 *
 * @format
 * @flow
 */

import {StyleSheet, TextInput, View} from 'react-native';
import {color} from '../../theme/styles';
import React from 'react';

export default function inputText(
  key: string,
  title: string,
  placeholder: string,
  value: any,
  darkTheme: boolean,
  onChangeText: (string) => void,
) {
  function getText() {
    return (
      <>
        <TextInput
          style={[styles.input, {color: darkTheme ? color.white : color.black}]}
          autoCapitalize="none"
          clearButtonMode="while-editing"
          underlineColorAndroid="transparent"
          placeholder={placeholder}
          autoFocus={false}
          onChangeText={(text) => {
            onChangeText(text);
          }}
          defaultValue={value}
        />
      </>
    );
  }

  return (
    <View key={key}>
      {getText()}
    </View>
  );
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
