// Must be on top of:
import React, {useEffect, useState} from 'react';
import 'react-native-gesture-handler';
import {YellowBox} from 'react-native';
import store from './src/redux/store';
import splashScreenRenderer from './src/screens/AppRouter/Renderers/Splash/renderer';
import homeScreenRenderer from './src/screens/AppRouter/Renderers/Home/renderer';
import authScreenRenderer from './src/screens/AppRouter/Renderers/Auth/renderer';
import {checkLoginStatus} from './src/model/firebase/auth/api';

export default function App() {
  const [viewState, setViewState] = useState<ViewState>(new ViewState(false, false));

  useEffect(() => {
    setUpIgnoreYellowMessage();
    checkLoginStatus((_isLoggedIn) => {
      setViewState(new ViewState(true, _isLoggedIn));
    });
    store.subscribe(() => {
      const reducer = store.getState().authReducer;
      setViewState(new ViewState(true, reducer.isLoggedIn));
    });
  }, []);

  return (
    (viewState.isNoLoggedIn && splashScreenRenderer()) ||
    (viewState.isLoggedIn && homeScreenRenderer()) ||
    authScreenRenderer()
  );
}

class ViewState {
  _isReady: boolean;
  _isLoggedIn: boolean;
  constructor(isReady: boolean, isLoggedIn: boolean) {
    this._isReady = isReady;
    this._isLoggedIn = isLoggedIn;
  }
  get isNoLoggedIn() {
    return !this._isReady;
  }
  get isLoggedIn() {
    return this._isLoggedIn;
  }
}

function setUpIgnoreYellowMessage() {
  console.disableYellowBox = true;
  YellowBox.ignoreWarnings(['Setting a timer', 'Warning:', 'Require cycle:', 'Warning: Async Storage']);
}
