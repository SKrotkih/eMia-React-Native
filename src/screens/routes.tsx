import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {color} from '../theme/styles';
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
import {Icon} from "native-base";

const Stack = createStackNavigator();

export default function stackNavigation(props) {
  let isLoggedIn = props.isLoggedIn;
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isLoggedIn ? "Main" : "Welcome"} screenOptions={{
        headerStyle: {
          backgroundColor: color.brand,
        },
        headerTintColor: color.white,
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: 'normal',
        },
      }}>
        <Stack.Screen name="Welcome" component={SplashScreen} options={{title: ''}}/>
        <Stack.Screen name="Register" component={Register} options={{title: 'Sign Up'}}/>
        <Stack.Screen name="EditProfile" component={EditProfile} options={{title: 'Sign Up'}}/>
        <Stack.Screen name="Login" component={Login} options={{title: 'Sign In'}}/>
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{title: 'Restore Password'}}/>
        <Stack.Screen name="Main" component={Home} options={{title: 'eMia-React Native', headerLeft: () => (
            <Icon
              style={{
                color: color.white,
                marginLeft: 8,
              }}
              name={'ios-menu'}
              onPress={() => {
                alert('This is a menu!');
              }}
            />
          )}}/>
        <Stack.Screen name="PostPreview" component={PostPreview} options={{title: ''}}/>
        <Stack.Screen name="AddNewPost" component={AddNewPost} options={{title: ''}}/>
        <Stack.Screen name="Options" component={Options} options={{title: ''}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
