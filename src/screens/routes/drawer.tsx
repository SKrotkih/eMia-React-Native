import {createDrawerNavigator} from 'react-navigation-drawer';
import {createAppContainer} from 'react-navigation';

// stacks
import HomeStack from './homeStack';
import AuthStack from './authStack';
import {getCurrentUser} from '../../model/firebase/auth/api';

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

let drawer;

export function createNavigationContainer() {
  return new Promise(function (resolve, reject) {
    getCurrentUser((user) => {
      if (user === null) {
        drawer = createDrawerNavigator(AuthScreens);
      } else {
        drawer = createDrawerNavigator(HomeScreens);
      }
      resolve();
    });
  });
}

export default createAppContainer(drawer);
