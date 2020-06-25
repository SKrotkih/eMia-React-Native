import { createStackNavigator } from 'react-navigation-stack';
import SplashScreen from "../SplashScreen";
import Register from "../Auth/Register";
import EditProfile from "../Settings/EditProfile";
import Login from "../Auth/Login";
import ForgotPassword from "../Auth/ForgotPassword";
import {color} from '../../theme/styles';

const screens = {
  SplashScreen: {
    screen: SplashScreen,
    navigationOptions: {
      title: ''
    },
  },
  Register: {
    screen: Register,
    navigationOptions: {
      title: 'Sign Up'
    },
  },
  EditProfile: {
    screen: EditProfile,
    navigationOptions: {
      title: 'My Profile'
    },
  },
  Login: {
    screen: Login,
    navigationOptions: {
      title: 'Login'
    },
  },
  ForgotPassword: {
    screen: ForgotPassword,
    navigationOptions: {
      title: 'Restore Password'
    },
  },
}

const AuthStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: color.brand,
      height: 60,
    },
    headerTintColor: color.white,
    headerTitleStyle: {
      fontSize: 18,
      fontWeight: 'normal',
    },
    headerBackTitleVisible: false,
    headerTitleAlign: 'center',
  }
});

export default AuthStack;
