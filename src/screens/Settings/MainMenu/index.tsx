import React from 'react';
import ReactNative from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Loader} from '../../../components/Loader';
import {logOut} from '../../../model/dbinteractor/login/dbinteractor';
import {downloadCurrentUserData} from '../../../model/dbinteractor/users/dbinteractor';
import styles from './styles';

import {
  Container,
  Content,
  Body,
  Text,
  Thumbnail,
  List,
  ListItem,
} from 'native-base';

const {View, Alert, TouchableOpacity} = ReactNative;
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
    downloadCurrentUserData((user) => {
      this.setState({
        user: user,
        avatarUrl: '',
        loaded: true,
      });
    });
  }

  render() {
    if (!this.state.loaded) {
      return renderLoadingView();
    }
    let _this = this;
    return (
      <Container
        style={{margin: 15, marginBottom: 15, backgroundColor: '#00000000'}}>
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

function renderLoadingView() {
  return (
    <View style={styles.loading}>
      <Loader loading={true} />
    </View>
  );
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
    return (
      <ListItem height={63}>
        <TouchableOpacity
          style={styles.avatar}
          activeOpacity={0.5}
          onPress={() => {}}>
          <Body style={{flexDirection: 'row'}}>
            <Thumbnail circular size={55} source={{uri: 'Icon-Profile'}} />
            <Text style={styles.description}>{'Undefined User'}</Text>
          </Body>
        </TouchableOpacity>
      </ListItem>
    );
  } else {
    user.getDownloadURL().then((url) => {
      _this.state.avatarUrl = url;
    });
    const avatarUrl = _this.state.avatarUrl;
    let avatarSource = {};
    if (avatarUrl === '') {
      avatarSource.uri = 'Icon-Profile';
    } else {
      avatarSource.uri = avatarUrl;
    }
    return (
      <ListItem height={63}>
        <TouchableOpacity
          style={styles.avatar}
          activeOpacity={0.5}
          onPress={() => {
            editProfile(user);
          }}>
          <Body style={{flexDirection: 'row'}}>
            <Thumbnail circular size={55} source={avatarSource} />
            <Text style={styles.description}>{user.username}</Text>
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
  return (
    <ListItem height={63}>
      <TouchableOpacity style={{flexDirection: 'row'}} activeOpacity={0.5} onPress={() => {
          onSignOut();
        }}>
        <Body style={{flexDirection: 'row'}}>
          <Text style={{alignSelf: 'center', fontWeight: 'bold'}}>Log Out</Text>
        </Body>
      </TouchableOpacity>
    </ListItem>
  );
}

function onSignOut() {
  logOut(
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