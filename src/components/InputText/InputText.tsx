import {Label} from 'native-base';
import {StyleSheet, TextInput, View} from 'react-native';
import {color} from '../../theme/styles';
import React from 'react';
import CategoryPicker from '../DropDownList';

export default function inputText(
  key: string,
  title: string,
  placeholder: string,
  defaultValue: any,
  darkTheme: boolean,
  onChangeText: (string) => void,
) {
  function getItem() {
    if (key === 'sex') {
      getGender();
    } else {
      return getText();
    }
  }

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
          defaultValue={defaultValue}
        />
      </>
    );
  }

  function getGender() {
    return CategoryPicker();
  }

  return (
    <View key={key}>
      <Label
        style={[styles.label, {color: darkTheme ? color.white : color.black}]}>
        {title}
      </Label>
      {getItem()}
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
