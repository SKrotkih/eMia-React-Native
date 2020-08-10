/**
 * Sample React Native App
 * https://github.com/SKrotkih/eMia-React-Native
 *
 * @format
 * @flow
 */

import {useEffect, useState} from 'react';
import 'react-native-gesture-handler';
import {YellowBox} from 'react-native';
import store from './src/redux/store';
import splashScreenRenderer from './src/screens/AppRouter/Renderers/Splash/renderer';
import homeScreenRenderer from './src/screens/AppRouter/Renderers/Home/renderer';
import authScreenRenderer from './src/screens/AppRouter/Renderers/Auth/renderer';
import {checkLoginStatus} from './src/model/network/firebase/auth/api';
import ACTIONS from './src/redux/types';

export default function App() {
  const [viewState, setViewState] = useState({
    isReady: false,
    isLoggedIn: false,
  });

  useEffect(() => {
    setUpIgnoreYellowMessage();
    subscribeOnActionDispatch();
    checkLoginStatus().then((_isLoggedIn) => {
      if (_isLoggedIn) {
        store.dispatch(ACTIONS.loggedIn(null));
      } else {
        store.dispatch(ACTIONS.loggedOut());
      }
      setViewState((prevState) => {
        return {...prevState, isReady: true, isLoggedIn: _isLoggedIn};
      });
    });
  }, []);

  function subscribeOnActionDispatch() {
    store.subscribe(() => {
      if (ACTIONS.isAuthAction(store.getState().lastAction)) {
        const state = store.getState().auth;
        setViewState((prevState) => {
          return {...prevState, isReady: true, isLoggedIn: state.isLoggedIn};
        });
      }
    });
  }

  return (
    (!viewState.isReady && splashScreenRenderer()) ||
    (viewState.isLoggedIn && homeScreenRenderer()) ||
    authScreenRenderer()
  );
}

function setUpIgnoreYellowMessage() {
  console.disableYellowBox = true;
  YellowBox.ignoreWarnings([
    'Setting a timer',
    'Warning:',
    'Require cycle:',
    'Warning: Async Storage',
  ]);
}
