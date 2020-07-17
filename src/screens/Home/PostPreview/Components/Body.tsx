import {Text} from "native-base";
import {color} from "../../../../theme/styles";
import React from "react";
import {StyleSheet} from "react-native";

export default function Body(props) {
  const  {text, darkTheme} = props;
  return (
    <Text style={[styles.textDescription, {color: darkTheme ? color.white : color.black}]}>{text}</Text>
  )
}

const styles = StyleSheet.create({
  textDescription: {
    fontSize: 12,
    marginHorizontal: 8,
    textAlign: 'center',
    marginVertical: 8,
  },
});
