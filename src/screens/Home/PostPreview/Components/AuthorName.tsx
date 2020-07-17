import {Text, Thumbnail} from "native-base";
import {color} from "../../../../theme/styles";
import React from "react";
import {StyleSheet, View} from "react-native";

export default function AuthorName(props) {
  const {authorAvatarUrl, authorName, darkTheme} = props;
  return (
    <View style={styles.thumbnail}>
      <Thumbnail circular size={55} source={authorAvatarUrl} />
      <Text style={[styles.textUserName, {color: darkTheme ? color.white : color.black}]}>{authorName}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  thumbnail: {
    marginLeft: 4,
    marginTop: 4,
    flexDirection: 'row',
  },
  textUserName: {
    marginHorizontal: 15,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});
