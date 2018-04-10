import React from 'react';
import { Scene, Router, ActionConst, Stack, Modal, Tabs } from 'react-native-router-flux';

// Launch Component
import Launch from '../screens/Launch';

// Start screen
import Welcome from '../screens/Welcome';

// Authentication Scenes
import Register from '../screens/Auth/Register';
import CompleteProfile from '../screens/Auth/CompleteProfile';
import Login from '../screens/Auth/Login';
import ForgotPassword from '../screens/Auth/ForgotPassword';

// Main Scenes
import Home from '../screens/Home/Home';
import PostPreview from '../screens/Home/PostPreview';
import AddNewPost from '../screens/Home/AddNewPost';
import MainMenu from '../screens/Home/MainMenu';
import EditProfile from '../screens/Home/EditProfile';
import Options from '../screens/Home/Options';

// Import Store, actions
import store from '../redux/store';

import { checkLoginStatus } from '../model/auth/actions';
import { color, navTitleStyle, navBarStyle } from '../theme/styles';

export default class extends React.Component {
  constructor () {
    super();
    this.state = {
      isReady: false,
      isLoggedIn: false
    };
  }

  componentDidMount () {
    let _this = this;
    store.dispatch(checkLoginStatus((isLoggedIn) => {
      _this.setState({isReady: true, isLoggedIn});
    }));
  }

  render () {
    if (!this.state.isReady) {
      return <Launch/>;
    }
    return (
      <Router>
        <Scene key="root" 
          hideNavBar
          navigationBarStyle={navBarStyle}
          titleStyle={navTitleStyle}
          backButtonTintColor={color.white}>
          <Stack key="Auth" initial={!this.state.isLoggedIn}>
            <Scene key="Welcome" component={Welcome} title="" initial={true} hideNavBar/>
            <Scene key="Register" component={Register} title="Register" back/>
            <Scene key="CompleteProfile" component={CompleteProfile} title="Select Username" back={false}/>
            <Scene key="Login" component={Login} title="Login"/>
            <Scene key="ForgotPassword" component={ForgotPassword} title="Forgot Password"/>
          </Stack>

          <Stack key="Main" initial={this.state.isLoggedIn}>
            <Scene key="Home" component={Home} title="eMia" initial={true} type={ActionConst.REPLACE}/>
            <Scene key="PostPreview" component={PostPreview} title="" back={true}/>
            <Scene key="AddNewPost" component={AddNewPost} title="" back={true}/>
            <Scene key="MainMenu" component={MainMenu} title="" back={true}/>
            <Scene key="EditProfile" component={EditProfile} title="" back={true}/>
            <Scene key="Options" component={Options} title="" back={true}/>
          </Stack>
        </Scene>
      </Router>
    )
  }
}
