import {StyleSheet, View} from "react-native";
import {Avatar, Caption, Paragraph, Title} from "react-native-paper";
import React from "react";

export default function MenuHeader() {
  return (
    <View style={{flexDirection: 'row', marginTop: 15, marginLeft: 30}}>
      <Avatar.Image source={{uri: 'Icon-Profile'}} size={35}/>
      <View style={{marginLeft: 25, flexDirection: 'column'}}>
        <Title style={styles.title}>eMia React Native</Title>
        <Paragraph style={[styles.paragraph, styles.caption]}>---</Paragraph>
        <Caption style={styles.caption}>ver. 1.0.1</Caption>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
});
