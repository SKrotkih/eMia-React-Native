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
import Navigator, {
  createNavigationContainer,
} from './src/screens/routes/drawer';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      isReady: false,
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
      createNavigationContainer().then(() => {
        this.setState({isReady: true});
      }),
    );
  }

  render() {
    if (this.state.isReady) {
      return (
        <Root>
          <Provider store={store}>
            <StyleProvider style={getTheme(variables)}>
              <Navigator/>
            </StyleProvider>
          </Provider>
        </Root>
      );
    } else {
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
