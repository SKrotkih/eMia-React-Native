import React from 'react';
import ReactNative from 'react-native';
import {Actions} from 'react-native-router-flux';
import Loader from '@components/Loader';
import {getCurrentUser, signOut} from '@model/auth/actions';
import styles from './styles';

import {windowWidth, windowHeight} from '@theme/styles';
import {config} from '../index';

import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Text,
  Thumbnail,
  List,
  ListItem,
} from 'native-base';

const {
  Dimensions,
  AppRegistry,
  Image,
  StyleSheet,
  View,
  Alert,
  TouchableOpacity,
} = ReactNative;

const {Component} = React;

const menuItems = [
  {
    id: 'profile',
    text: 'Profile',
  },
  {
    id: 'logout',
    text: 'Log Out',
  },
];

export class MainMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      user: null,
    };
  }

  setTitle(titleText) {
    const {setParams} = this.props.navigation;
    setParams({title: titleText});
  }

  componentWillMount() {
    this.setTitle('Settings');
  }

  componentDidMount() {
    this.fetchCurrentUserData();
  }

  fetchCurrentUserData() {
    getCurrentUser((user) => {
      this.setState({
        user: user,
        loaded: true,
      });
    });
  }

  render() {
    if (!this.state.loaded) {
      return renderLoadingView();
    }
    var _this = this;
    return (
      <Container style={{margin: 15, marginBottom: 15, backgroundColor: '#00000000'}}>
        <Content style={{backgroundColor: '#00000000'}}>
          <List
            dataArray={menuItems}
            renderRow={(menuItem) => renderMenuItem(menuItem, _this)}
          />
        </Content>
      </Container>
    );
  }
}

function renderLoadingView () {
  return (
    <View style={styles.loading}>
      <Loader loading={true} />
    </View>
  )
}

function renderMenuItem(menuItem, _this) {
  if (menuItem.id === 'logout') {
    return renderLogOutMenuItem(_this);
  } else if (menuItem.id === 'profile') {
    return renderProfileMenuItem(_this);
  } else {
    return null;
  }
}

// Profile

function renderProfileMenuItem(_this) {
  var user = _this.state.user;
  if (user === null) {
    return null;
  } else {
    const avatarUrl = user.avatarUrl;
    let avatarSource = {};
    if (avatarUrl === null) {
      avatarSource.uri = 'Icon-Profile';
    } else {
      avatarSource.uri = avatarUrl;
    }
    return (
      <ListItem height={63}>
        <TouchableOpacity
          style={{flexDirection:'row'}} activeOpacity={0.5} onPress={() => {
            editProfile(user);
          }}>
          <Body style={{flexDirection: 'row'}}>
            <Thumbnail circular size={55} source={avatarSource} />
            <Text
              style={{alignSelf: 'center', marginLeft: 16, fontWeight: 'bold'}}>
              {user.username}
            </Text>
          </Body>
        </TouchableOpacity>
      </ListItem>
    );
  }
}

function editProfile(user) {
  Actions.EditProfile({user});
}

// Log Out

function renderLogOutMenuItem(_this) {
  var user = _this.state.user;
  if (user === null) {
    return null;
  } else {
    return (
      <ListItem height={63}>
        <TouchableOpacity style={{flexDirection:'row'}} activeOpacity={0.5} onPress={() => {
            onSignOut();
          }}>
          <Body style={{flexDirection: 'row'}}>
            <Text style={{alignSelf: 'center', fontWeight: 'bold'}}>
              Log Out
            </Text>
          </Body>
        </TouchableOpacity>
      </ListItem>
    );
  }
}

function onSignOut() {
  signOut(
    () => {
      Actions.reset('Auth');
    },
    (error) => {
      Alert.alert('Oops!', error.message);
    },
  );
}

// - Log Out

export default MainMenu;
