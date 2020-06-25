import {createDrawerNavigator} from 'react-navigation-drawer';
import {createAppContainer} from 'react-navigation';

// stacks
import HomeStack from './homeStack';
import AuthStack from './authStack';
import {checkLoginStatus} from '../../model/firebase/auth/api';

// drawer navigation options
const HomeScreens = {
  Home: {
    screen: HomeStack,
  },
};

// drawer navigation options
const AuthScreens = {
  Auth: {
    screen: AuthStack,
  },
};

let drawer = null;

export function createNavigationContainer() {
  return new Promise(function (resolve, reject) {
    checkLoginStatus((isLoggedIn) => {
      if (isLoggedIn) {
        drawer = createDrawerNavigator(HomeScreens);
      } else {
        drawer = createDrawerNavigator(AuthScreens);
      }
      resolve();
    });
  });
}

export default createAppContainer(createDrawerNavigator(HomeScreens));
