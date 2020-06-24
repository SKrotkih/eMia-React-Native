import * as React from 'react';
import {StatusBar, Platform} from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, HeaderStyleInterpolators} from '@react-navigation/stack';
import {createDrawerNavigator, DrawerNavigationProp} from '@react-navigation/drawer';
import {color} from '../theme/styles';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Icon} from 'native-base';

import {DrawerContent} from './DrawerContent';

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

const AUTH_SCREENS = {
  SplashScreen: {
    title: "",
    component: SplashScreen,
  },
  Register: {
    title: "Sign Up",
    component: Register,
  },
  EditProfile: {
    title: "My Profile",
    component: EditProfile,
  },
  Login: {
    title: "Login",
    component: Login,
  },
  ForgotPassword: {
    title: "Restore Password",
    component: ForgotPassword,
  },
}

const MAIN_SCREENS = {
  EditProfile: {
    title: "My Profile",
    component: EditProfile,
  },
  PostPreview: {
    title: "Post",
    component: PostPreview,
  },
  AddNewPost: {
    title: "AddNewPost",
    component: AddNewPost,
  },
  Options: {
    title: "Options",
    component: Options,
  },
}

type RootDrawerParamList = {
  Root: undefined;
  Another: undefined;
};

type RootStackParamList = {
  Home: undefined;
  NotFound: undefined;
} & {
  [P in keyof typeof MAIN_SCREENS]: undefined;
};

const Drawer = createDrawerNavigator();
const Stack = createDrawerNavigator();
const AuthStack = createStackNavigator();

export default function stackNavigation(props) {
  let isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return (
      <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen
            name="drawer"
            options={null}
          >
            {({navigation}: { navigation: DrawerNavigationProp<RootDrawerParamList>; }) => (
              <Stack.Navigator
                initialRouteName="Main"
                screenOptions={{
                  headerStyle: {backgroundColor: color.brand, height: 60},
                  headerTintColor: color.white,
                  headerTitleStyle: {
                    fontSize: 18,
                    fontWeight: 'normal',
                  },
                  headerBackTitleVisible: false,
                  headerTitleAlign: 'center',
                }}
                drawerContent={(_props) => <DrawerContent {..._props} />}
              >
                <Stack.Screen
                  name="Main"
                  component={Home}
                  screenOptions={{
                    headerStyle: {backgroundColor: color.brand, height: 60},
                    headerTintColor: color.white,
                    headerTitleStyle: {
                      fontSize: 18,
                      fontWeight: 'normal',
                    },
                    headerBackTitleVisible: false,
                    headerTitleAlign: 'center',
                  }}
                  options={{
                    title: 'eMia-React Native',
                    headerLeft: () => (
                      <Icon style={{
                        color: color.white,
                        marginLeft: 8,
                      }}
                            name={'ios-menu'}
                            onPress={() => {
                              navigation.toggleDrawer();
                            }}
                      />
                    )
                  }}
                />
                <Stack.Screen
                  name="EditProfile"
                  component={EditProfile}
                  options={{title: ''}}
                />
                <Stack.Screen
                  name="PostPreview"
                  component={PostPreview}
                  options={{title: ''}}
                />
                <Stack.Screen
                  name="AddNewPost"
                  component={AddNewPost}
                  options={{title: 'New Post'}}
                />
                <Stack.Screen
                  name="Options"
                  component={Options}
                  options={{title: ''}}
                />
              </Stack.Navigator>
            )}
          </Drawer.Screen>
        </Drawer.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <AuthStack.Navigator
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
          <AuthStack.Screen name="Welcome" component={SplashScreen} options={{title: ''}}/>
          <AuthStack.Screen name="Register" component={Register} options={{title: 'Sign Up'}}/>
          <AuthStack.Screen name="EditProfile" component={EditProfile} options={{title: 'My Profile'}}/>
          <AuthStack.Screen name="Login" component={Login} options={{title: 'Sign In'}}/>
          <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} options={{title: 'Restore Password'}}/>
          <AuthStack.Screen name="Main" component={Home} options={{
            title: 'eMia-React Native', headerLeft: () => (
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
            )
          }}/>
          <AuthStack.Screen name="PostPreview" component={PostPreview} options={{title: ''}}/>
          <AuthStack.Screen name="AddNewPost" component={AddNewPost} options={{title: 'New Post'}}/>
          <AuthStack.Screen name="Options" component={Options} options={{title: ''}}/>
        </AuthStack.Navigator>
      </NavigationContainer>
    );
  }
}
