import {Header, Text} from "native-base";
import {color} from "../../../../theme/styles";
import React from "react";
import {StyleSheet} from "react-native";

export default function PostsHeader(props) {
  const {title, darkTheme} = props;
  return (
    <Header style={[{backgroundColor: darkTheme ? color.dark : color.white}]}>
      <Text
        style={[
          styles.textHeader,
          {color: darkTheme ? color.white : color.black},
        ]}>
        {title}
      </Text>
    </Header>
    )
}

const styles = StyleSheet.create({
  textHeader: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});


