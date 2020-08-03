/**
 * Sample React Native App
 * https://github.com/SKrotkih/eMia-React-Native
 *
 * @format
 * @flow
 */

import React, {useState} from 'react';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
} from 'react-native-paper';
import {Appearance} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {color} from '../../../../theme/styles';
import WelkomeScreen from '../../../WelkomeScreen';
import Register from '../../../Auth/Register';
import EditProfile from '../../../EditProfile';
import Login from '../../../Auth/Login';
import ForgotPassword from '../../../Auth/ForgotPassword';
import HomeNavigator from '../../Renderers/Home/navigationStack';
import CategoryPicker from '../../../../components/CategoryPicker';
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

  const colorScheme = Appearance.getColorScheme();
  const [isDarkTheme, setIsDarkTheme] = useState(colorScheme === 'dark');
  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;
  Appearance.addChangeListener(() => {
    setIsDarkTheme(Appearance.getColorScheme() === 'dark');
  });

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
              component={WelkomeScreen}
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
            <Stack.Screen
              name="CategoryPicker"
              component={CategoryPicker}
              options={{title: ''}}
            />
            <Stack.Screen
              name="YearsPicker"
              component={CategoryPicker}
              options={{title: ''}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </AppContext.Provider>
    </PaperProvider>
  );
}
