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
import {isUserAuthenticated} from './src/model/network/firebase/auth/api';
import ACTIONS from './src/redux/types';

export default function App() {
  const [isDownloading, setIsDownloading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setUpIgnoreYellowMessage();
    subscribeOnActionDispatch();
    checkIfUserAuthenticated().catch((error) => console.error(error));
  }, []);

  async function checkIfUserAuthenticated() {
    try {
      if (await isUserAuthenticated()) {
        handleUerIsAuthenticated();
      } else {
        handleUerIsNotAuthenticated();
      }
    } catch (error) {
      throw error;
    }
  }

  function handleUerIsAuthenticated() {
    store.dispatch(ACTIONS.loggedIn(null));
    setIsDownloading(false);
    setIsAuthenticated(true);
  }

  function handleUerIsNotAuthenticated() {
    store.dispatch(ACTIONS.loggedOut());
    setIsDownloading(false);
    setIsAuthenticated(false);
  }

  function subscribeOnActionDispatch() {
    store.subscribe(() => {
      if (ACTIONS.isAuthAction(store.getState().lastAction)) {
        const state = store.getState().auth;
        setIsDownloading(false);
        setIsAuthenticated(state.isLoggedIn);
      }
    });
  }

  return (
    (isDownloading && splashScreenRenderer()) ||
    (!isAuthenticated && authScreenRenderer()) ||
    homeScreenRenderer()
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
