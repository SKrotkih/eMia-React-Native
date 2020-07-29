// Must be on top of:
import {useEffect, useState} from 'react';
import 'react-native-gesture-handler';
import {YellowBox} from 'react-native';
import store from './src/redux/store';
import splashScreenRenderer from './src/screens/AppRouter/Renderers/Splash/renderer';
import homeScreenRenderer from './src/screens/AppRouter/Renderers/Home/renderer';
import authScreenRenderer from './src/screens/AppRouter/Renderers/Auth/renderer';
import {checkLoginStatus} from './src/model/firebase/auth/api';
import {LOGGED_IN, LOGGED_OUT, isAuthAction} from './src/redux/actionTypes';

export default function App() {
  const [viewState, setViewState] = useState({
    isReady: false,
    isLoggedIn: false,
  });

  useEffect(() => {
    setUpIgnoreYellowMessage();
    subscribeOnActionDispatch();
    checkLoginStatus((_isLoggedIn) => {
      // TODO: Make current user instead of null:
      if (_isLoggedIn) {
        store.dispatch({type: LOGGED_IN, payload: null});
      } else {
        store.dispatch({type: LOGGED_OUT});
      }
      setViewState((prevState) => {
        return {...prevState, isReady: true, isLoggedIn: _isLoggedIn};
      });
    });
  }, []);

  function subscribeOnActionDispatch() {
    store.subscribe(() => {
      if (isAuthAction(store.getState().lastAction)) {
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
