import * as React from 'react';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from "@react-navigation/native";
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {Icon} from 'native-base';
import {color} from "../../../../theme/styles";

import {DrawerContent} from '../Drawer/contentRenderer';

import Home from '../../../Home/Home';
import PostPreview from '../../../Home/PostPreview';
import AddNewPost from '../../../Home/AddNewPost';
import Options from '../../../Home/Options';
import EditProfile from '../../../EditProfile';
import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme, useTheme
} from 'react-native-paper';
import {AppContext} from '../../../../components/context';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function toggleDrawer(props) {
  props.navigation.toggleDrawer();
}

function Root(props) {
  return (
    <Stack.Navigator
      initialRouteName="Home"
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
        name="Home"
        component={Home}
        options={{
          title: 'eMia-React Native',
          headerLeft: () => (
            <Icon
              style={{color: color.white, marginLeft: 8}}
              name={'ios-menu'}
              onPress={() => {
                toggleDrawer(props);
              }}
            />
          ),
        }}
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
      <Stack.Screen name="Options" component={Options} options={{title: 'Filter'}}/>
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{title: 'My Profile'}}
      />
    </Stack.Navigator>
  );
}

export function homeNavigationStack() {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="Root" component={Root}/>
    </Drawer.Navigator>
  );
}

export default function mainNavigation() {

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333'
    }
  }

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      text: '#ffffff'
    }
  }
  const paperTheme = useTheme();
  const [isDarkTheme, setIsDarkTheme] = React.useState(paperTheme.dark);
  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  const appContext = React.useMemo(
    () => ({
      toggleTheme: () => {
        setIsDarkTheme(isDarkTheme => !isDarkTheme);
      },
    }), []);

  return (
    <PaperProvider theme={theme}>
      <AppContext.Provider value={appContext}>
        <NavigationContainer theme={theme}>
          {homeNavigationStack()}
        </NavigationContainer>
      </AppContext.Provider>
    </PaperProvider>
  );
}
