import React from 'react';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from "@react-navigation/native";
import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme, useTheme
} from 'react-native-paper';
import {createStackNavigator} from "@react-navigation/stack";
import {color} from "../../../../theme/styles";
import SplashScreen from "../../../SplashScreen";
import Register from "../../../Auth/Register";
import EditProfile from "../../../EditProfile";
import Login from "../../../Auth/Login";
import ForgotPassword from "../../../Auth/ForgotPassword";
import HomeNavigator from '../../Renderers/Home/navigationStack';
import {AppContext} from '../../../../components/context';

const Stack = createStackNavigator();

export default function authNavigationStack() {
  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: color.dark,
    },
  };

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: color.dark,
      text: '#ffffff',
    },
  };

  const isDarkTheme = true;
  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  return (
    <PaperProvider theme={theme}>
      <AppContext.Provider>
        <NavigationContainer theme={theme}>
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
      </AppContext.Provider>
    </PaperProvider>
  );
}