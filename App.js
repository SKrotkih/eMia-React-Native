import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {StyleProvider, Root} from 'native-base';
import {ImageBackground, StatusBar, YellowBox, StyleSheet} from 'react-native';

import getTheme from './src/components';
import variables from './src/theme/variables/commonColor';

import stackNavigation from './src/screens/routes';
import store from './src/redux/store';

import {checkLoginStatus} from './src/model/firebase/auth/api';

import backgroundImage from './src/theme/BackgroundImage';

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

    // clean next comment lines to use expo
    // await Expo.Font.loadAsync({
    //   "Roboto": require('native-base/Fonts/Roboto.ttf'),
    //   "Roboto_medium": require("native-base/Fonts/Roboto_medium.ttf"),
    //   "RobotoExtraBold": require('@assets/fonts/Roboto-Black.ttf'),
    //   "RobotoBold": require('@assets/fonts/Roboto-Bold.ttf'),
    //   "RobotoMedium": require('@assets/fonts/Roboto-Medium.ttf'),
    //   "RobotoRegular": require('@assets/fonts/Roboto-Regular.ttf'),
    //   "RobotoLight": require('@assets/fonts/Roboto-Light.ttf'),
    //   "Ionicons": require("native-base/Fonts/Ionicons.ttf")
    // });

    store.dispatch(
      checkLoginStatus((isLoggedIn) => {
        this.setState({isReady: true, isLoggedIn});
      }),
    );
  }

  render() {
    if (!this.state.isReady) {
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
    } else {
      return (
        <Root>
            <Provider store={store}>
              <StyleProvider style={getTheme(variables)}>
                {stackNavigation({isLoggedIn: this.state.isLoggedIn})}
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
