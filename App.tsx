// Must be on top of:
import {useEffect, useState} from 'react';
import 'react-native-gesture-handler';
import {YellowBox} from 'react-native';
import store from './src/redux/store';
import splashScreenRenderer from './src/screens/AppRouter/Renderers/Splash/renderer';
import homeScreenRenderer from './src/screens/AppRouter/Renderers/Home/renderer';
import authScreenRenderer from './src/screens/AppRouter/Renderers/Auth/renderer';
import {checkLoginStatus} from './src/model/firebase/auth/api';

export default function App() {
  const [viewState, setViewState] = useState({
    isReady: false,
    isLoggedIn: false,
  });

  useEffect(() => {
    setUpIgnoreYellowMessage();
    checkLoginStatus((_isLoggedIn) => {
      setViewState((prevState) => {
        return {...prevState, isReady: true, isLoggedIn: _isLoggedIn};
      });
    });
    store.subscribe(() => {
      const reducer = store.getState().auth;
      setViewState((prevState) => {
        return {...prevState, isReady: true, isLoggedIn: reducer.isLoggedIn};
      });
    });
  }, []);

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
