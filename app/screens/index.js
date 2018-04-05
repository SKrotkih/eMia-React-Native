import {Navigation} from 'react-native-navigation';

import {iconsLoaded} from '../utils/iconsMap';
import {init} from '../modules/app';

import Launch from './Launch';
import Welcome from './Welcome';
import Home from './Home/Home';
import PostPreview from './Home/PostPreview';
import CompleteProfile from './Auth/CompleteProfile';
import ForgotPassword from './Auth/ForgotPassword';
import Login from './Auth/Login';
import LogOut from './Auth/LogOut';
import Register from './Auth/Register';

export default class Application {
  constructor(store, Provider) {
    this._store = store;
    this._provider = Provider;
    this._iconsLoaded = false;

    this._configureScreens(store, Provider);
  }

  _configureScreens(store, Provider) {
    const screens = {
      Launch,
      Welcome,
      Home,
      PostPreview,
      CompleteProfile,
      ForgotPassword,
      Login,
      LogOut,
      Register
    }

    Object.keys(screens).map(key => {
      Navigation.registerComponent(`gm.${key}`, () => screens[key], store, Provider);
    });
  }

  run() {
    this._store.dispatch(init());
  }

  startAppWithScreen(opts) {

    console.log('2.  startAppWithScreen(opts) ');

    if (this._iconsLoaded) {
      this.startApp(opts);
    } else {
      iconsLoaded
      .then(() => {
        this._iconsLoaded = true;
        this.startApp(opts);
      }).catch(error => {
        console.error(error);
      });
    }
  }

  startApp({screen, passProps, showDrawer = false}) {
    const app = {
      screen: {
        screen,
        passProps,
        navigatorStyle: {
          tabBarHidden: true,
          drawUnderTabBar: true,
          disabledBackGesture: true
        }
      }
    };

    Navigation.startSingleScreenApp(Object.assign(
      app,
      showDrawer ? {drawer: {left: {screen: 'gm.Home'}}} : {}
    ));
  }
}
