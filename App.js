// Must be on top of:
import 'react-native-gesture-handler';

import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {StyleProvider, Root} from 'native-base';
import {ImageBackground, StatusBar, YellowBox, StyleSheet} from 'react-native';

import getTheme from './src/components';
import variables from './src/theme/variables/commonColor';

import store from './src/redux/store';

import backgroundImage from './src/theme/BackgroundImage';

import {authNavigation, mainNavigation} from "./src/screens/routes/routes";
import {checkLoginStatus} from "./src/model/firebase/auth/api";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      isReady: false,
      isLoggedIn: false,
    };
  }

  async componentWillMount() {
    setUpIgnoreYellowMessage();
    store.dispatch(
      checkLoginStatus((isLoggedIn) => {
        this.setState({isReady: true, isLoggedIn: isLoggedIn});
      }),
    );
  }

  render() {
    if (!this.state.isReady) {
      return (
        // Splash Screen
        <Root>
          <NavigationContainer>
            <ImageBackground
              style={styles.background}
              source={require('./src/assets/images/splash.png')}>
              <StatusBar translucent barStyle="dark-content"/>
            </ImageBackground>
          </NavigationContainer>
        </Root>
      );
    } else {
      return (
        <Root>
          <Provider store={store}>
            <StyleProvider style={getTheme(variables)}>
              {(this.state.isLoggedIn && mainNavigation()) || authNavigation()}
            </StyleProvider>
          </Provider>
        </Root>
      );
    }
  }
}

function setUpIgnoreYellowMessage() {
  console.disableYellowBox = true;
  YellowBox.ignoreWarnings(['Setting a timer', 'Warning:', 'Require cycle:', 'Warning: Async Storage']);
}

App.navigatorStyle = {
  navBarHidden: true,
  statusBarBlur: true,
};

const styles = StyleSheet.create({
  background: {
    ...backgroundImage,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
