import * as React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {color} from "../../theme/styles";

import SplashScreen from "../SplashScreen";
import Register from "../Auth/Register";
import EditProfile from "../Settings/EditProfile";
import Login from "../Auth/Login";
import ForgotPassword from "../Auth/ForgotPassword";
import HomeNavigator from './homeStack';

const Stack = createStackNavigator();

export default function authNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
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
        <Stack.Screen
          name="Welcome"
          component={SplashScreen}
          options={{title: ''}}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{title: 'Sign Up'}}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{title: 'My Profile'}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{title: 'Sign In'}}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{title: 'Restore Password'}}
        />
        <Stack.Screen
          name="Home"
          component={HomeNavigator}
          options={{title: 'Home'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
