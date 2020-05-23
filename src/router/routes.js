import React from 'react';
import {
  Scene,
  Router,
  ActionConst,
  Stack,
  Modal,
  Tabs,
} from 'react-native-router-flux';

// Start screen
import Welcome from '@screens/Network/Welcome';

// Authentication Scenes
import Register from '@screens/Auth/Register';
import CompleteProfile from '@screens/Auth/CompleteProfile';
import Login from '@screens/Auth/Login';
import ForgotPassword from '@screens/Auth/ForgotPassword';

// Main Scenes
import Home from '@screens/Home/Home';
import PostPreview from '@screens/Home/PostPreview';
import AddNewPost from '@screens/Home/AddNewPost';
import MainMenu from '@screens/Settings/MainMenu';
import EditProfile from '@screens/Settings/EditProfile';
import Options from '@screens/Home/Options';

// Import Store, actions
import store from '@redux/store';

import {color, navTitleStyle, navBarStyle} from '@theme/styles';

export default class extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    var isLoggedIn = this.props.isLoggedIn;
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
            <Scene key="Register" component={Register} title="Register" back />
            <Scene
              key="CompleteProfile"
              component={CompleteProfile}
              title="Select Username"
              back={false}
            />
            <Scene key="Login" component={Login} title="Login" />
            <Scene
              key="ForgotPassword"
              component={ForgotPassword}
              title="Forgot Password"
            />
          </Stack>

          <Stack key="Main" initial={isLoggedIn}>
            <Scene
              key="Home"
              component={Home}
              title="eMia"
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
