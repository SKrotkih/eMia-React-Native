import React from 'react';
import {Scene, Router, ActionConst, Stack} from 'react-native-router-flux';

// Start screen
import Welcome from '../screens/Network/Welcome';

// Authentication Scenes
import Register from '../screens/Auth/Register';
import Login from '../screens/Auth/Login';
import ForgotPassword from '../screens/Auth/ForgotPassword';

// Main Scenes
import Home from '../screens/Home/Home';
import PostPreview from '../screens/Home/PostPreview';
import AddNewPost from '../screens/Home/AddNewPost';
import MainMenu from '../screens/Settings/MainMenu';
import EditProfile from '../screens/Settings/EditProfile';
import Options from '../screens/Home/Options';

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
              component={Welcome}
              title=""
              initial={true}
              hideNavBar
            />
            <Scene
             key="Register"
             component={Register}
             title="Sign Up"
             back
            />
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
