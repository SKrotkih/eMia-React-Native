import {Text} from "native-base";
import {color} from "../../../../theme/styles";
import {Time} from "../../../../components/Time";
import React from "react";
import {StyleSheet} from "react-native";

export default function DatePublished(props) {
  const {date, darkTheme} = props;
  return (
    <Text style={[styles.timeBackground, {color: darkTheme ? color.white : color.black}]}>
      <Time date={date} style={[styles.textPublishedAt, {color: darkTheme ? color.white : color.black}]}/>
    </Text>
  )
}

const styles = StyleSheet.create({
  timeBackground: {
    marginRight: 15,
    marginTop: 15,
  },
  textPublishedAt: {
    fontSize: 12,
    textAlign: 'right',
    color: color.black,
    marginTop: 15,
  },
});

