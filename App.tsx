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
  const [isReady, setIsReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setUpIgnoreYellowMessage();
    checkLoginStatus((_isLoggedIn) => {
      setIsLoggedIn(_isLoggedIn);
      setIsReady(true);
    });
    store.subscribe(() => {
      const reducer = store.getState().authReducer;
      setIsLoggedIn(reducer.isLoggedIn);
      setIsReady(true);
    });
  }, []);

  return (
    (!isReady && splashScreenRenderer()) ||
    (isLoggedIn && homeScreenRenderer()) ||
    authScreenRenderer()
  );
}

function setUpIgnoreYellowMessage() {
  console.disableYellowBox = true;
  YellowBox.ignoreWarnings(['Setting a timer', 'Warning:', 'Require cycle:', 'Warning: Async Storage']);
}
