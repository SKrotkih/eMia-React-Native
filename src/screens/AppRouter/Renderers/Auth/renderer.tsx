/**
 * Sample React Native App
 * https://github.com/SKrotkih/eMia-React-Native
 *
 * @format
 * @flow
 */

import React from "react";
import {StatusBar} from "react-native";
import {Root, StyleProvider} from "native-base";
import store from "../../../../redux/store";
import getTheme from "../../../../components/other";
import variables from "../../../../theme/variables/commonColor";
import {Provider} from 'react-redux';
import NavigationStack from './navigationStack';
import {useTheme} from "@react-navigation/native";

export default function logInScreen() {
  const theme = useTheme();
  return (
    <Root>
      <StatusBar barStyle={theme.dark ? "light-content" : "dark-content"}/>
      <Provider store={store}>
        <StyleProvider style={getTheme(variables)}>
          <NavigationStack />
        </StyleProvider>
      </Provider>
    </Root>
  );
}
