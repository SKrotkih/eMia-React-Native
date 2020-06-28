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

import AuthNavigation from './src/screens/routes/logInStack.tsx';
import MainNavigation from './src/screens/routes/homeStack';
import {checkLoginStatus} from './src/model/firebase/auth/api';

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
    checkLoginStatus((isLoggedIn) => {
      this.setState({isReady: true, isLoggedIn: isLoggedIn});
    });
    store.subscribe(() => {
      const reducer = store.getState().authReducer;
      this.setState({isReady: true, isLoggedIn: reducer.isLoggedIn});
    });
  }

  render() {
    if (!this.state.isReady) {
      return splashScreen();
    } else if (this.state.isLoggedIn) {
      return homeScreen();
    } else {
      return logInScreen();
    }
  }
}

function splashScreen() {
  return (
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
}

function homeScreen() {
  return (
    <Root>
      <Provider store={store}>
        <StyleProvider style={getTheme(variables)}>
          <MainNavigation />
        </StyleProvider>
      </Provider>
    </Root>
  );
}

function logInScreen() {
  return (
    <Root>
      <Provider store={store}>
        <StyleProvider style={getTheme(variables)}>
          <AuthNavigation />
        </StyleProvider>
      </Provider>
    </Root>
  );
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
