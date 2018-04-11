import Expo from "expo";
import React, {Component} from 'react';
import { Provider } from 'react-redux';
import { StyleProvider } from "native-base";
import { ImageBackground, StatusBar, YellowBox } from 'react-native';

import getTheme from '@theme/components';
import variables from '@theme/variables/commonColor';

import Router from '@router/routes';
import store from '@redux/store';

import { checkLoginStatus } from './app/model/auth/actions';

import styles from './styles';

function setUpIgnoreYellowMessage () {
  YellowBox.ignoreWarnings(['Setting a timer']);
  const _console = _.clone(console);
  console.warn = message => {
    if (message.indexOf('Setting a timer') <= -1) {
      _console.warn(message);
    }
  };
}

export default class App extends Component {
  
  constructor () {
    super();
    this.state = {
      isReady: false,
      isLoggedIn: false      
    };
  }

  async componentWillMount() {
    setUpIgnoreYellowMessage();

    await Expo.Font.loadAsync({
      "Roboto": require('native-base/Fonts/Roboto.ttf'),
      "Roboto_medium": require("native-base/Fonts/Roboto_medium.ttf"),
      "RobotoExtraBold": require('@assets/fonts/Roboto-Black.ttf'),
      "RobotoBold": require('@assets/fonts/Roboto-Bold.ttf'),
      "RobotoMedium": require('@assets/fonts/Roboto-Medium.ttf'),
      "RobotoRegular": require('@assets/fonts/Roboto-Regular.ttf'),
      "RobotoLight": require('@assets/fonts/Roboto-Light.ttf'),
      "Ionicons": require("native-base/Fonts/Ionicons.ttf")
    });

    store.dispatch(checkLoginStatus((isLoggedIn) => {
      this.setState({isReady: true, isLoggedIn});
    }));
  }

  render() {
    if (!this.state.isReady) {
      return (
        <ImageBackground style={styles.background} source={require('@assets/images/splash.png')}>
          <StatusBar translucent barStyle="dark-content" />
        </ImageBackground> )
    } else {
      return (
        <Provider store={store}>
          <StyleProvider style={getTheme(variables)}>
            <Router isLoggedIn={this.state.isLoggedIn} />
          </StyleProvider>
        </Provider> )
    }
  }
}

App.navigatorStyle = {
  navBarHidden: true,
  statusBarBlur: true
}
