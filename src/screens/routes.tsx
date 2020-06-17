import React from 'react';
import {Scene, Router, ActionConst, Stack} from 'react-native-router-flux';

// Start screen
import SplashScreen from './SplashScreen';

// Authentication Scenes
import Register from './Auth/Register';
import Login from './Auth/Login';
import ForgotPassword from './Auth/ForgotPassword';

// Main Scenes
import Home from './Home/Home';
import PostPreview from './Home/PostPreview';
import AddNewPost from './Home/AddNewPost';
import {MainMenu} from './Settings/MainMenu';
import EditProfile from './Settings/EditProfile';
import Options from './Home/Options';

import {color, navTitleStyle, navBarStyle} from '../theme/styles';

export default class extends React.Component {
  render() {
    let isLoggedIn = this.props.isLoggedIn;
    return (
      <Router>
        <Scene
          key="root"
          hideNavBar
          navigationBarStyle={navBarStyle}
          titleStyle={navTitleStyle}
          backButtonTintColor={color.white}>
          <Stack key="Auth" initial={!isLoggedIn}>
            <Scene
              key="Welcome"
              component={SplashScreen}
              title=""
              initial={true}
              hideNavBar
            />
            <Scene key="Register" component={Register} title="Sign Up" back />
            <Scene
              key="EditProfile"
              component={EditProfile}
              title="My Profile"
              back
            />
            <Scene key="Login" component={Login} title="Sign In" back />
            <Scene
              key="ForgotPassword"
              component={ForgotPassword}
              title="Restore Password"
              back
            />
          </Stack>

          <Stack key="Main" initial={isLoggedIn}>
            <Scene
              key="Home"
              component={Home}
              title="eMia - React Native"
              initial={true}
              type={ActionConst.REPLACE}
            />
            <Scene key="PostPreview" component={PostPreview} title="" back />
            <Scene key="AddNewPost" component={AddNewPost} title="" back />
            <Scene key="MainMenu" component={MainMenu} title="" back />
            <Scene key="EditProfile" component={EditProfile} title="" back />
            <Scene key="Options" component={Options} title="" back />
          </Stack>
        </Scene>
      </Router>
    );
  }
}
