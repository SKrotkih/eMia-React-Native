import Expo from "expo";
import React, {Component} from 'react';
import { ImageBackground, StatusBar } from 'react-native';
import { YellowBox } from 'react-native';

import { Provider } from 'react-redux';

import { StyleProvider } from "native-base";

import getTheme from './app/theme/components';
import variables from './app/theme/variables/commonColor';

import Router from './app/router/routes';
import store from './app/redux/store';

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

    console.log('LAUNCH!!!');

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
      "RobotoExtraBold": require('./app/assets/fonts/Roboto-Black.ttf'),
      "RobotoBold": require('./app/assets/fonts/Roboto-Bold.ttf'),
      "RobotoMedium": require('./app/assets/fonts/Roboto-Medium.ttf'),
      "RobotoRegular": require('./app/assets/fonts/Roboto-Regular.ttf'),
      "RobotoLight": require('./app/assets/fonts/Roboto-Light.ttf'),
      "Ionicons": require("native-base/Fonts/Ionicons.ttf")
    });

    // await Expo.Font.loadAsync({
    //   awesome: 'https://github.com/FortAwesome/Font-Awesome/raw/master/fonts/fontawesome-webfont.ttf'
    // });

    store.dispatch(checkLoginStatus((isLoggedIn) => {
      this.setState({isReady: true, isLoggedIn});
    }));
  }

  render() {
    if (!this.state.isReady) {
      return (
        <ImageBackground style={styles.background} source={require('./app/assets/images/splash.png')}>
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
