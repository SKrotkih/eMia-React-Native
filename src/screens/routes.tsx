import React from 'react';
import { NavigationContainer, RouteProp, ParamListBase } from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';

import {
  createDrawerNavigator,
  DrawerNavigationProp,
} from '@react-navigation/drawer';

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
import EditProfile from './Settings/EditProfile';
import Options from './Home/Options';
import {Icon} from "native-base";
import {MainMenu} from './Settings/MainMenu';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function stackNavigation(props) {
  let isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Main" screenOptions={{
          headerStyle: {
            backgroundColor: color.brand,
          },
          headerTintColor: color.white,
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: 'normal',
          },
          headerBackTitleVisible: false,
          headerTitleAlign: 'center',
        }}>
          <Stack.Screen name="Main" component={Home} options={{title: 'eMia-React Native', headerLeft: () => (
              <Icon
                style={{
                  color: color.white,
                  marginLeft: 8,
                }}
                name={'ios-menu'}
                onPress={() => {
                  navigation.toggleDrawer();
                }}
              />
            )}}/>
          <Stack.Screen name="PostPreview" component={PostPreview} options={{title: ''}}/>
          <Stack.Screen name="AddNewPost" component={AddNewPost} options={{title: 'New Post'}}/>
          <Stack.Screen name="Options" component={Options} options={{title: ''}}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome" screenOptions={{
          headerStyle: {
            backgroundColor: color.brand,
          },
          headerTintColor: color.white,
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: 'normal',
          },
          headerBackTitleVisible: false,
          headerTitleAlign: 'center',
        }}>
          <Stack.Screen name="Welcome" component={SplashScreen} options={{title: ''}}/>
          <Stack.Screen name="Register" component={Register} options={{title: 'Sign Up'}}/>
          <Stack.Screen name="EditProfile" component={EditProfile} options={{title: 'My Profile'}}/>
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
                  navigation.toggleDrawer();
                }}
              />
            )}}/>
          <Stack.Screen name="PostPreview" component={PostPreview} options={{title: ''}}/>
          <Stack.Screen name="AddNewPost" component={AddNewPost} options={{title: 'New Post'}}/>
          <Stack.Screen name="Options" component={Options} options={{title: ''}}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
