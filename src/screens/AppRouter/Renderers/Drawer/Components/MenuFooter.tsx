/**
 * Sample React Native App
 * https://github.com/SKrotkih/eMia-React-Native
 *
 * @format
 * @flow
 */

import React from 'react';
import {Switch, Text, TouchableRipple, useTheme} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import {AppContext} from '../../../../../components/other/context';
import {
  TypeBackend,
  useBackend,
} from '../../../../../model/localStorage/backend.dispatch.hook';

export default function MenuFooter() {
  const paperTheme = useTheme();
  const {toggleTheme} = React.useContext(AppContext);
  const {backend, ready, toggleBackend} = useBackend();

  return (
    <View style={styles.container}>
      <TouchableRipple onPress={() => {
          toggleTheme();
        }}>
        <View style={styles.preference}>
          <Text>{paperTheme.dark ? 'Light Theme' : 'Dark Theme'}</Text>
          <View pointerEvents="none">
            <Switch value={paperTheme.dark} />
          </View>
        </View>
      </TouchableRipple>
      <TouchableRipple
        onPress={() => {
          toggleBackend();
        }}>
        <View style={styles.preference}>
          <Text>{backend === TypeBackend.Firebase ? 'Firebase' : 'NodeJS'}</Text>
          <View pointerEvents="none">
            <Switch value={backend === TypeBackend.Nodejs} />
          </View>
        </View>
      </TouchableRipple>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
