/**
 * Sample React Native App
 * https://github.com/SKrotkih/eMia-React-Native
 *
 * @format
 * @flow
 */

import React from 'react';
import ReactNative, {useWindowDimensions} from 'react-native';
import {StyleSheet} from 'react-native';
import {color} from '../../../../theme/styles';
import {Body, Text} from 'native-base';
import {isEmpty} from '../../../../utils/validate';

const {Image, TouchableOpacity, View} = ReactNative;

export default function PostGridItem(props) {
  const {item, navigation, darkTheme} = props;
  let title = item.post.title;
  let body = item.post.body;
  let key = item.id;
  let url = item.imageUrl;

  return (
    <View style={[styles.container, {backgroundColor: darkTheme ? color.dark : color.white}]} key={key}>
      <TouchableOpacity
        key={key}
        style={{flexDirection: 'row'}}
        activeOpacity={0.5}
        onPress={() => {
          selectPostItem(item, navigation);
        }}>
        <Body>
          <AttachedImage url={url} />
          <AttachedTitle title={title} darkTheme={darkTheme} />
          <AttachedBody body={body} darkTheme={darkTheme} />
        </Body>
      </TouchableOpacity>
    </View>
  );
}

// Components

function AttachedImage(props) {
  const screenWidth = useWindowDimensions().width;
  const {url} = props;
  return (
    ((!url || isEmpty(url)) && (
      <View
        style={[styles.image, {height: 160}, {width: (screenWidth - 8) / 2}]}
      />
    )) || (
      <Image
        style={[styles.image, {height: 160}, {width: (screenWidth - 8) / 2}]}
        source={{cache: 'force-cache', uri: url}}
      />
    )
  );
}

function AttachedTitle(props) {
  const {title, darkTheme} = props;
  return (
    <Text
      style={[styles.title, {color: darkTheme ? color.white : color.black}, {backgroundColor: 'transparent'}]}
      numberOfLines={1}>
      {title}
    </Text>
  );
}

function AttachedBody(props) {
  const {body, darkTheme} = props;
  return (
    <Text
      style={[styles.description, {color: darkTheme ? color.white : color.black}]}
      numberOfLines={3}>
      {body}
    </Text>
  );
}

// Actions

function selectPostItem(postItem: any, navigation) {
  navigation.navigate('PostPreview', postItem);
}

// Styles

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    height: 220,
    margin: 1,
  },
  containerDark: {
    flex: 1,
    backgroundColor: color.black,
    flexDirection: 'column',
    alignItems: 'center',
    height: 220,
    margin: 1,
  },
  image: {
    alignSelf: 'center', // 'stretch'􏰸 'contain'􏰸 'cover'􏰸 'repeat' 'center'
    resizeMode: 'cover',
    borderRadius: 15,
  },
  title: {
    fontSize: 12,
    marginBottom: 4,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  description: {
    fontSize: 10,
    marginBottom: 2,
    textAlign: 'center',
  },
});
