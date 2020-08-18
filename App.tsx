/**
 * Sample React Native App
 * https://github.com/SKrotkih/eMia-React-Native
 *
 * @format
 * @flow
 */

import React, {useEffect, useState} from 'react';
import 'react-native-gesture-handler';
import {YellowBox} from 'react-native';
import store from './src/redux/store';
import splashScreenRenderer from './src/screens/AppRouter/Renderers/Splash/renderer';
import homeScreenRenderer from './src/screens/AppRouter/Renderers/Home/renderer';
import authScreenRenderer from './src/screens/AppRouter/Renderers/Auth/renderer';
import {AuthApi} from './src/model/network/interfaces';
import ACTIONS from './src/redux/types';
import {useAuth} from './src/model/localStorage/auth.hook';
import {AuthContext} from './src/model/context/AuthContext';

export default function App() {
  const [isDownloading, setIsDownloading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const {token, login, logout, userId, ready} = useAuth();

  useEffect(() => {
    setUpIgnoreYellowMessage();
    subscribeOnActionDispatch();
    checkIfUserAuthenticated().catch((error) => console.error(error));
  }, []);

  async function checkIfUserAuthenticated() {
    try {
      const _isAuthenticated = await AuthApi().isUserAuthenticated();
      if (_isAuthenticated) {
        handleUserIsAuthenticated();
      } else {
        handleUserIsNotAuthenticated();
      }
    } catch (error) {
      throw error;
    }
  }

  function handleUserIsAuthenticated() {
    store.dispatch(ACTIONS.loggedIn(null));
    setIsDownloading(false);
    setIsAuthenticated(true);
  }

  function handleUserIsNotAuthenticated() {
    store.dispatch(ACTIONS.loggedOut());
    setIsDownloading(false);
    setIsAuthenticated(false);
  }

  function subscribeOnActionDispatch() {
    store.subscribe(() => {
      if (ACTIONS.isTypeAuthAction(store.getState().lastAction)) {
        const state = store.getState().auth;
        setIsDownloading(false);
        setIsAuthenticated(state.isLoggedIn);
      }
    });
  }

  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated
    }}>
      {
        (isDownloading && splashScreenRenderer()) ||
        (isAuthenticated && homeScreenRenderer()) ||
        authScreenRenderer()
      }
    </AuthContext.Provider>
  )
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
