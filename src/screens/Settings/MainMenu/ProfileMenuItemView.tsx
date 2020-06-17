import {Body, ListItem, Text, Thumbnail} from 'native-base';
import {TouchableOpacity} from 'react-native';
import React from 'react';
import {User} from '../../../model/entities/user';
import styles from './styles';

export function renderProfileMenuItem(
  user: User,
  avatarUrl: string,
  didAvatarUrlDownloaded: (string) => void,
  didSelectMenuItem: (User) => void,
) {
  if (user === null) {
    return (
      <ListItem height={63}>
        <TouchableOpacity
          style={styles.avatar}
          activeOpacity={0.5}
          onPress={() => {}}>
          <Body style={{flexDirection: 'row'}}>
            <Thumbnail circular size={55} source={{uri: 'Icon-Profile'}} />
            <Text style={styles.description}>{'Undefined User'}</Text>
          </Body>
        </TouchableOpacity>
      </ListItem>
    );
  } else {
    user.getDownloadURL().then((url) => {
      didAvatarUrlDownloaded(url);
    });
    let avatarSource = {};
    if (avatarUrl === '') {
      avatarSource.uri = 'Icon-Profile';
    } else {
      avatarSource.uri = avatarUrl;
    }
    return (
      <ListItem height={63}>
        <TouchableOpacity
          style={styles.avatar}
          activeOpacity={0.5}
          onPress={() => {
            didSelectMenuItem(user);
          }}>
          <Body style={styles.menuItemBody}>
            <Thumbnail circular size={55} source={avatarSource}/>
            <Text style={styles.description}>{user.username}</Text>
          </Body>
        </TouchableOpacity>
      </ListItem>
    );
  }
}
