import Expo from "expo";
import React, { Component } from 'react';
import { Provider } from 'react-redux';

import { StyleProvider } from "native-base";
import getTheme from './app/theme/components';
import variables from './app/theme/variables/commonColor';

import Router from './app/router/routes';
import store from './app/redux/store';

import { YellowBox } from 'react-native';
import Loader from './app/components/Loader';

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
      isReady: false
    };
  }

  async componentWillMount() {
    setUpIgnoreYellowMessage();

    await Expo.Font.loadAsync({
      "Roboto": require("native-base/Fonts/Roboto.ttf"),
      "Roboto_medium": require("native-base/Fonts/Roboto_medium.ttf"),
      "RobotoExtraBold": require('./app/assets/fonts/Roboto-Black.ttf'),
      "RobotoBold": require('./app/assets/fonts/Roboto-Bold.ttf'),
      "RobotoMedium": require('./app/assets/fonts/Roboto-Medium.ttf'),
      "RobotoRegular": require('./app/assets/fonts/Roboto-Regular.ttf'),
      "RobotoLight": require('./app/assets/fonts/Roboto-Light.ttf'),
      "Ionicons": require("native-base/Fonts/Ionicons.ttf")
    });
    this.setState({ isReady: true });
  }

  render () {
    if (!this.state.isReady) {
      return (
        <Loader loading={true} />
      )
    } else {
      return (
        <Provider store={store}>
          <StyleProvider style={getTheme(variables)}>
            <Router/>
          </StyleProvider>
        </Provider>
      )
    }
  }
}
