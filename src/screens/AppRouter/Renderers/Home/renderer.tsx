/**
 * Sample React Native App
 * https://github.com/SKrotkih/eMia-React-Native
 *
 * @format
 * @flow
 */

import {Root, StyleProvider} from 'native-base';
import {Provider} from 'react-redux';
import store from '../../../../redux/store';
import getTheme from '../../../../components';
import variables from '../../../../theme/variables/commonColor';
import React from 'react';
import NavigationStack from './navigationStack';
import {useTheme} from "@react-navigation/native";
import {StatusBar} from 'react-native';
import {color} from "../../../../theme/styles";

export default function homeScreenRenderer() {
  const theme = useTheme();
  return (
    <Root>
      <StatusBar
        barStyle={theme.dark ? "light-content" : "dark-content"}
        hidden = {false}
        backgroundColor ={color.brand}
        translucent = {true}/>
      <Provider store={store}>
        <StyleProvider style={getTheme(variables)}>
          <NavigationStack />
        </StyleProvider>
      </Provider>
    </Root>
  );
}
