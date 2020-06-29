// Must be on top of:
import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {YellowBox} from 'react-native';
import store from './src/redux/store';
import splashScreenRenderer from './src/screens/AppRouter/Renderers/Splash/renderer';
import homeScreenRenderer from './src/screens/AppRouter/Renderers/Home/renderer';
import authScreenRenderer from './src/screens/AppRouter/Renderers/Auth/renderer';
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
      return splashScreenRenderer();
    } else if (this.state.isLoggedIn) {
      return homeScreenRenderer();
    } else {
      return authScreenRenderer();
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
