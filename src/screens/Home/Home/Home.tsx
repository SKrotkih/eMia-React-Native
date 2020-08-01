/**
 * Sample React Native App
 * https://github.com/SKrotkih/eMia-React-Native
 *
 * @format
 * @flow
 */

// Home.js
//
// How to add Firebase Auth with react native !!!
// https://github.com/g6ling/React-Native-Tips/tree/master/How_to_add_Firebase_Auth_with_react_native

// A well tested feature rich Firebase implementation for React Native,
// supporting both iOS & Android platforms for 12+ Firebase modules
// (including a feature rich Notifications implementation)
// https://github.com/invertase/react-native-firebase

// react native module for firebase cloud messaging and local notification
// https://github.com/evollu/react-native-fcm

// Camera
// https://github.com/react-native-community/react-native-camera
// https://github.com/wix/react-native-camera-kit
// https://www.npmjs.com/package/react-native-grid-component?activeTab=readme
// npm install react-native-grid-component --save

import React, {
  FunctionComponent,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import {color} from '../../../theme/styles';
import {PostsList} from './PostsList';
import {styles} from './styles';
import * as Permissions from 'expo-permissions';

import {
  Container,
  Button,
  Tabs,
  Tab,
  ScrollableTab,
  Fab,
  IconNB,
  Icon,
} from 'native-base';

import ModelView from './ModelView';
import {useTheme} from 'react-native-paper';
import {isSimulator} from "../../../utils/utils";

let _state = false;
let _modelView: ModelView;

export const Home: FunctionComponent = (props) => {
  const navigation: object = props.navigation;

  const [state, setState] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    setUpPermissions();
    didSelectTabItem(0);
  }, []);

  if (_modelView === undefined) {
    _modelView = new ModelView(() => {
      _state = !_state;
      setState(_state);
    });
  }

  async function setUpPermissions() {
    if (!isSimulator()) {
      await Permissions.askAsync(Permissions.CAMERA_ROLL);
      await Permissions.askAsync(Permissions.CAMERA);
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <RightBarButtonItem />,
    });
  }, [navigation]);

  function didSelectTabItem(index: number) {
    _modelView.didSelectTabItem(index);
  }

  const RightBarButtonItem = () => {
    return (
      <Icon
        style={{color: color.white, marginRight: 8}}
        name={'ios-options'}
        onPress={() => {
          optionsButtonPressed();
        }}
      />
    );
  };

  const ActionsButton = () => {
    return (
      <Fab
        active={active}
        direction="up"
        containerStyle={{}}
        style={{backgroundColor: color.brand}}
        position="bottomRight"
        onPress={() => setActive(active => !active)}>
        <IconNB name="ios-menu" />
        <Button
          style={styles.actionButton}
          onPress={() => {
            createNewPostButtonPressed();
          }}>
          <IconNB name="ios-create" />
        </Button>
      </Fab>
    );
  };

  function createNewPostButtonPressed() {
    navigation.navigate('AddNewPost');
  }

  function optionsButtonPressed() {
    navigation.navigate('Options');
  }

  const darkTheme = useTheme().dark;

  return (
    <Container>
      <Tabs
        tabBarBackgroundColor={'transparent'}
        tabBarUnderlineStyle={styles.tabUnderlined}
        renderTabBar={() => <ScrollableTab/>}
        onChangeTab={({i}) => didSelectTabItem(i)}>
        {_modelView.tabs.map((item, index) => (
          <Tab
            heading={item.title}
            tabStyle={styles.tab}
            textStyle={styles.tabText}
            activeTabStyle={darkTheme ? styles.activeTabDark : styles.activeTab}
            activeTextStyle={darkTheme ? styles.activeTextTabDark : styles.activeTextTab}>
            {PostsList(_modelView, navigation, darkTheme)}
          </Tab>
        ))}
      </Tabs>
      {ActionsButton()}
    </Container>
  );
};
