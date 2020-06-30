import {Root, StyleProvider} from 'native-base';
import {Provider} from 'react-redux';
import store from '../../../../redux/store';
import getTheme from '../../../../components';
import variables from '../../../../theme/variables/commonColor';
import React from 'react';
import NavigationStack from './navigationStack';
import {useTheme} from "@react-navigation/native";
import {StatusBar} from 'react-native';

export default function homeScreenRenderer() {
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
