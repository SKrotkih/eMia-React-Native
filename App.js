import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Font, AppLoading } from 'expo';

import Router from './app/router/routes';
import store from './app/redux/store';

import { YellowBox } from 'react-native';

function cacheFonts (fonts) {
  return fonts.map(font => Font.loadAsync(font));
}

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

  async _loadAssetsAsync () {
    const fontAssets = cacheFonts([
      {RobotoExtraBold: require('./app/assets/fonts/Roboto-Black.ttf')},
      {RobotoBold: require('./app/assets/fonts/Roboto-Bold.ttf')},
      {RobotoMedium: require('./app/assets/fonts/Roboto-Medium.ttf')},
      {RobotoRegular: require('./app/assets/fonts/Roboto-Regular.ttf')},
      {RobotoLight: require('./app/assets/fonts/Roboto-Light.ttf')}
    ]);

    await Promise.all([...fontAssets]);
  }

  render () {
    if (!this.state.isReady) {
      setUpIgnoreYellowMessage();      
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({isReady: true})}
          onError={console.warn}
        />
      )
    }

    return (
      <Provider store={store}>
        <Router/>
      </Provider>
    )
  }
}
