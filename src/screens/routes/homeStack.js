import {createStackNavigator} from 'react-navigation-stack';
import {color} from '../../theme/styles';
import EditProfile from '../Settings/EditProfile';
import Home from '../Home/Home';
import PostPreview from '../Home/PostPreview';
import AddNewPost from '../Home/AddNewPost';
import Options from '../Home/Options';
import {Icon} from 'native-base';
import * as React from 'react';

const screens = {
  HomeScreen: {
    screen: Home,
    navigationOptions: {
      title: 'eMia React Native',
    },
    options: {
      title: 'eMia-React Native',
      headerLeft: () => (
        <Icon
          style={{color: color.white, marginLeft: 8}}
          name={'ios-menu'}
          onPress={() => {
            //navigation.toggleDrawer();
          }}
        />
      ),
    },
  },
  EditProfile: {
    screen: EditProfile,
    navigationOptions: {
      title: 'My Profile',
    },
  },
  PostPreview: {
    screen: PostPreview,
    navigationOptions: {
      title: 'Post',
    },
  },
  AddNewPost: {
    screen: AddNewPost,
    navigationOptions: {
      title: 'New Post',
    },
  },
  Options: {
    screen: Options,
    navigationOptions: {
      title: 'Options',
    },
  },
};

const HomeStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: color.brand,
      height: 60,
    },
    headerTintColor: color.white,
    headerTitleStyle: {
      fontSize: 18,
      fontWeight: 'normal',
    },
    headerBackTitleVisible: false,
    headerTitleAlign: 'center',
  },
});

export default HomeStack;
