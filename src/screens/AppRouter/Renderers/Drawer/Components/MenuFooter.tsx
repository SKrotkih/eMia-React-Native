/**
 * Sample React Native App
 * https://github.com/SKrotkih/eMia-React-Native
 *
 * @format
 * @flow
 */

import React, {useState} from 'react';
import {Switch, Text, TouchableRipple, useTheme} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import {AppContext} from '../../../../../components/other/context';
import {
  BackendTypeState,
  TypeBackend,
  useBackend,
} from '../../../../../model/network/backend.dispatch.hook';
import {warningToast} from "../../../../../components/Toast/WarningToast";
/**
 * Sample React Native App
 * https://github.com/SKrotkih/eMia-React-Native
 *
 * @format
 * @flow
 */

export default function MenuFooter() {
  const [backendValue, setBackendValue] = useState<TypeBackend>(null)
  const paperTheme = useTheme();
  const {toggleTheme} = React.useContext(AppContext);
  const {backend, ready, toggleBackend} = useBackend();
  /*
    Select Dark/Light theme
   */
  const toggleTypeTheme = () => {
    return (
      <TouchableRipple onPress={toggleTheme}>
        <View style={styles.preference}>
          <Text>{paperTheme.dark ? 'Light Theme' : 'Dark Theme'}</Text>
          <View pointerEvents="none">
            <Switch value={paperTheme.dark} />
          </View>
        </View>
      </TouchableRipple>
    )
  }

  /*
    Select Type of the Backend: Firebase or Node.js
   */
  const handleSwitchTypeOfBackend = () => {
    toggleBackend()
      .then(() => {
        BackendTypeState.getBackend()
          .then((_backend) => {
            // Update UI
            setBackendValue(_backend);
          });
      })
      .catch((error) => {
        warningToast(error);
      });
  }

  const toggleTypeBackend = () => {
    return (
      <TouchableRipple onPress={handleSwitchTypeOfBackend}>
        <View style={styles.preference}>
          <Text>{backend === TypeBackend.Firebase ? 'NodeJS' : 'Firebase'}</Text>
          <View pointerEvents="none">
            <Switch value={backendValue === backend} />
          </View>
        </View>
      </TouchableRipple>
    )
  }

  return (
    <View style={styles.container}>
      {toggleTypeTheme()}
      {toggleTypeBackend()}
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
