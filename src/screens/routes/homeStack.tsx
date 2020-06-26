import * as React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createDrawerNavigator, DrawerNavigationProp} from "@react-navigation/drawer";
import {Icon} from "native-base";
import {color} from "../../theme/styles";

import {DrawerContent} from "./DrawerContent";

import Home from "../Home/Home";
import EditProfile from "../Settings/EditProfile";
import PostPreview from "../Home/PostPreview";
import AddNewPost from "../Home/AddNewPost";
import Options from "../Home/Options";

type RootDrawerParamList = {
  Root: undefined;
  Another: undefined;
};

const Drawer = createDrawerNavigator();
const Stack = createDrawerNavigator();

export default function mainNavigation() {
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
}
