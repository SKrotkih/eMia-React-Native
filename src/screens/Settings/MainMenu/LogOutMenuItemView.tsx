import {Body, ListItem, Text} from 'native-base';
import {TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './styles';

export function renderLogOutMenuItem(didSelectMenuItem: () => void) {
  return (
    <ListItem height={63}>
      <TouchableOpacity
        style={styles.avatar}
        activeOpacity={0.5}
        onPress={() => {
          didSelectMenuItem();
        }}>
        <Body style={styles.menuItemBody}>
          <Text style={styles.description}>Log Out</Text>
        </Body>
      </TouchableOpacity>
    </ListItem>
  );
}
