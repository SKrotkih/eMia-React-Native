/**
 * Sample React Native App
 * https://github.com/SKrotkih/eMia-React-Native
 *
 * @format
 * @flow
 */

import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Avatar, Caption, Paragraph, Title} from 'react-native-paper';
import {downloadCurrentUserData} from '../../../../../model/dbinteractor/users/dbinteractor';

export default function MenuHeader() {
  const [avatar, setAvatar] = useState<string>(null);
  const [name, setName] = useState<string>('');

  useEffect(() => {
    downloadCurrentUserData((_user) => {
      setName(_user.username);
      _user.getAvatarUrl().then((url) => {
        setAvatar(url);
      });
    });
  });

  const avatarUrl: string = avatar === null ? 'Icon-Profile' : avatar;

  return (
    <View style={{flexDirection: 'column', marginTop: 15, marginLeft: 30}}>
      <Title style={styles.title}>eMia React Native</Title>
      <Caption style={styles.caption}>ver. 1.0.1</Caption>
      <View style={{flexDirection: 'row', marginTop: 15, marginLeft: 0}}>
      <Avatar.Image source={{uri: avatarUrl}} size={35} />
        <View style={{marginLeft: 25, flexDirection: 'column'}}>
          <Paragraph style={[styles.paragraph, styles.caption]}>
            {name}
          </Paragraph>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    textAlign: 'center',
  },
});
